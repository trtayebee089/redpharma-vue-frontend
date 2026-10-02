import { readonly, ref } from 'vue';
import axios from 'axios';

export const HEALTH_TIMEOUT = 5000;
export const RETRY_INTERVAL = 15000;

// Only transport failures qualify; cancellations and HTTP errors do not.
export function isConnectivityError(error) {
    return !error.response && !axios.isCancel(error) &&
        ['ERR_NETWORK', 'ECONNABORTED', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN',
            'ECONNREFUSED', 'ECONNRESET', 'EHOSTUNREACH', 'ENETUNREACH'].includes(error.code);
}

export function createApiAvailability(api) {
    const status = ref('checking');
    const checking = ref(false);
    let pending;
    let timer;
    let stopped = false;
    let lastCheck = 0;

    function scheduleRetry() {
        clearTimeout(timer);
        if (!stopped && status.value === 'unavailable') {
            timer = setTimeout(check, RETRY_INTERVAL);
        }
    }

    function check() {
        if (pending) return pending;
        checking.value = true;
        lastCheck = Date.now();
        clearTimeout(timer);
        // HEAD at the configured API root avoids downloading catalog data.
        // Even 404/405 confirms connectivity. Use the existing client and adapter.
        pending = Promise.resolve().then(() => api.request({
            method: 'head', url: '', timeout: HEALTH_TIMEOUT,
            availabilityProbe: true, validateStatus: () => true,
            headers: { 'Content-Type': undefined, Authorization: undefined },
        })).then(() => {
            status.value = 'available';
        }).catch((error) => {
            if (error.response) status.value = 'available';
            // A probe without an HTTP response cannot establish connectivity.
            // Configuration/setup failures also resolve to a visible page.
            else status.value = 'unavailable';
        }).finally(() => {
            pending = undefined;
            checking.value = false;
            scheduleRetry();
        });
        return pending;
    }

    const interceptor = api.interceptors.response.use(
        (response) => response,
        (error) => {
            // Confirm against the API root so a failed endpoint alone cannot
            // take the entire storefront offline. Concurrent failures share a probe.
            if (!error.config?.availabilityProbe && isConnectivityError(error) &&
                status.value !== 'unavailable' && Date.now() - lastCheck >= RETRY_INTERVAL) void check();
            return Promise.reject(error);
        },
    );

    return {
        status: readonly(status), checking: readonly(checking), check,
        stop() {
            stopped = true;
            clearTimeout(timer);
            api.interceptors.response.eject(interceptor);
        },
    };
}
