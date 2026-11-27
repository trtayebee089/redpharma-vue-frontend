<template>
    <div class="customer-page tracking-page">
        <header class="customer-heading">
            <h1>{{ t('tracking.title') }}</h1>
            <p>{{ t('tracking.description') }}</p>
        </header>
        <form class="customer-panel tracking-form" @submit.prevent="trackOrder">
            <label for="tracking-number" class="customer-label">{{ t('tracking.number') }}</label>
            <div class="tracking-field">
                <input id="tracking-number" v-model.trim="trackingNumber" class="customer-input"
                    type="text" :placeholder="t('tracking.placeholder')" autocapitalize="characters"
                    autocomplete="off" spellcheck="false" required />
                <button type="submit" class="customer-button customer-button-primary" :disabled="loading">
                    <i class="pi pi-search" aria-hidden="true"></i>
                    {{ t('tracking.button') }}
                </button>
            </div>
        </form>

        <p v-if="loading" class="customer-panel customer-empty mt-4" role="status">{{ t('tracking.loading') }}</p>
        <p v-else-if="error" class="customer-panel tracking-error mt-4" role="alert">{{ t(`tracking.${error}`) }}</p>
        <template v-else-if="order.reference_no">
            <section class="customer-panel tracking-result">
                <div>
                    <p>{{ t('tracking.orderReference') }}</p>
                    <h2>{{ order.reference_no }}</h2>
                </div>
                <span class="customer-status" :data-status="orderStatusKey(currentStatus)">{{ statusLabel(currentStatus) }}</span>
            </section>

            <div class="tracking-results">
                <section class="customer-panel tracking-history">
                    <h2>{{ t('tracking.history') }}</h2>
                    <TimeLine :tracking="histories" :format-date="formatDate" />
                </section>
                <section class="customer-panel">
                    <h2>{{ t('cart.summary') }}</h2>
                    <dl class="tracking-facts">
                        <div><dt>{{ t('orders.date') }}</dt><dd>{{ formatDate(order.created_at) }}</dd></div>
                        <div><dt>{{ t('cart.subtotal') }}</dt><dd>{{ formatCurrency(order.total_price) }}</dd></div>
                        <div><dt>{{ t('cart.shipping') }}</dt><dd>{{ formatCurrency(order.shipping_cost) }}</dd></div>
                        <div><dt>{{ t('cart.grand') }}</dt><dd>{{ formatCurrency(order.grand_total) }}</dd></div>
                    </dl>
                </section>

                <section v-if="order.customer" class="customer-panel">
                    <h2>{{ t('tracking.customer') }}</h2>
                    <dl class="tracking-facts">
                        <div><dt>{{ t('auth.fullName') }}</dt><dd>{{ order.customer.name || '–' }}</dd></div>
                        <div><dt>{{ t('common.phone') }}</dt><dd>{{ order.customer.phone_number || '–' }}</dd></div>
                        <div><dt>{{ t('common.address') }}</dt><dd>{{ order.customer.address || '–' }}</dd></div>
                    </dl>
                </section>

                <section v-if="products.length" class="customer-panel tracking-products">
                    <h2>{{ t('orders.orderedProducts') }}</h2>
                    <ul>
                        <li v-for="(item, index) in products" :key="item.id ?? index">
                            <div>
                                <p>{{ item.name }}</p>
                                <p class="customer-muted text-sm">
                                    {{ [item.pivot?.qty, item.unit?.unit_name].filter(value => value != null).join(' ') }}
                                    <span v-if="item.pivot?.net_unit_price != null"> · {{ formatCurrency(item.pivot.net_unit_price) }}</span>
                                </p>
                            </div>
                            <p>{{ formatCurrency(item.pivot?.total) }}</p>
                        </li>
                    </ul>
                </section>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import { useI18n } from "vue-i18n";
import { useCheckout } from "@/composables/useCheckout";
import { orderStatusKey, useOrderStatus } from "@/composables/useOrderStatus";
import TimeLine from "@/components/common/TimeLine.vue";
import "@/assets/customer-pages.css";

const { t, n, locale } = useI18n();
const statusLabel = useOrderStatus();
const { order, tracking, getTrackingDetails, loading, error } = useCheckout();
const trackingNumber = ref("");
const histories = computed(() => Array.isArray(tracking.value.histories) ? tracking.value.histories : []);
const products = computed(() => Array.isArray(order.value.product_sales) ? order.value.product_sales.filter(Boolean) : []);
const currentStatus = computed(() => tracking.value.current_status);
const formatCurrency = value => value == null || !Number.isFinite(Number(value))
    ? "–" : n(Number(value), { style: "currency", currency: "BDT", maximumFractionDigits: 2 });
const formatDate = value => value && Number.isFinite(Date.parse(value))
    ? new Date(value).toLocaleString(`${locale.value}-BD`, { dateStyle: "medium", timeStyle: "short" }) : "–";

function trackOrder() {
    if (loading.value || !trackingNumber.value) return;
    return getTrackingDetails(trackingNumber.value);
}
</script>

<style scoped>
.tracking-page {
    max-width: 64rem;
}

.tracking-form {
    background: #f3f9f5;
}

.tracking-field {
    display: grid;
    gap: 9px;
}

.tracking-error {
    border-color: #ebc8cd;
    color: #912e3b;
}

.tracking-result {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
    margin-top: 16px;
    background: #f2f8f4;
}

.tracking-result p {
    color: #4d6557;
    font-size: .8125rem;
}

.tracking-results {
    display: grid;
    align-items: start;
    gap: 14px;
    margin-top: 14px;
}

.tracking-history h2 {
    margin-bottom: 14px;
}

.tracking-facts {
    display: grid;
    margin-top: 8px;
    font-size: .875rem;
}

.tracking-facts > div,
.tracking-products li {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #e4ece6;
}

.tracking-facts > div:last-child,
.tracking-products li:last-child {
    border: 0;
}

.tracking-facts dt {
    flex: none;
    color: #4d6557;
}

.tracking-facts dd {
    text-align: end;
    font-weight: 650;
}

.tracking-products ul {
    margin-top: 8px;
    font-size: .875rem;
}

.tracking-products li > p {
    flex: none;
    font-weight: 700;
}

@media (min-width: 540px) {
    .tracking-field {
        grid-template-columns: minmax(0, 1fr) auto;
    }
}

@media (min-width: 820px) {
    .tracking-results {
        grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    }
}
</style>
