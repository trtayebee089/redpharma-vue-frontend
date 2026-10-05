export const RETRY_INTERVAL_MS = 15_000;
export const PROBE_TIMEOUT_MS = 8_000;

export async function isApiReachable(baseURL, fetcher = fetch) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    try {
        // The API root can return 404 without CORS headers. An opaque HTTP
        // response still proves connectivity; never inspect status or JSON.
        await fetcher(baseURL, {
            method: 'HEAD',
            mode: 'no-cors',
            credentials: 'omit',
            cache: 'no-store',
            signal: controller.signal,
        });
        return true;
    } catch {
        return false;
    } finally {
        clearTimeout(timeout);
    }
}
