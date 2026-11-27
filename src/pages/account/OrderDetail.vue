<template>
    <div class="customer-page">
        <router-link to="/orders" class="customer-button mb-3">
            <i class="pi pi-arrow-left text-xs" aria-hidden="true"></i>
            {{ t('orders.backToOrders') }}
        </router-link>

        <p v-if="loading" class="customer-panel customer-empty" role="status">{{ t('orders.loading') }}</p>
        <div v-else-if="!order" class="customer-panel customer-empty" role="status">
            <p>{{ t('orders.detailFailed') }}</p>
            <button type="button" class="customer-button mt-3" @click="loadOrder">{{ t('orders.retry') }}</button>
        </div>

        <template v-else>
            <header class="customer-heading order-detail-heading">
                <div>
                    <h1>{{ t('orders.reference', { id: order.id ?? route.params.orderId }) }}</h1>
                    <p v-if="order.date">{{ order.date }}</p>
                </div>
                <span class="customer-status" :data-status="orderStatusKey(currentStatus)">{{ statusLabel(currentStatus) }}</span>
            </header>

            <p v-if="order.tracking?.tracking_number" class="order-tracking-code">
                <span class="customer-muted">{{ t('tracking.number') }}</span>
                <strong>{{ order.tracking.tracking_number }}</strong>
            </p>

            <div class="order-detail-grid">
                <section class="customer-panel">
                    <h2>{{ t('orders.orderedProducts') }}</h2>
                    <ul v-if="items.length" class="order-detail-items">
                        <li v-for="(item, index) in items" :key="item.id ?? index">
                            <div>
                                <p>{{ item.name }}</p>
                                <p class="customer-muted text-sm">
                                    {{ t('orders.quantityPrice', { quantity: item.quantity ?? '–', price: formatCurrency(item.price) }) }}
                                </p>
                            </div>
                            <strong>{{ formatCurrency(item.subtotal) }}</strong>
                        </li>
                    </ul>
                    <p v-else class="customer-muted mt-2 text-sm">{{ t('orders.noItems') }}</p>
                    <dl class="order-detail-summary">
                        <div><dt>{{ t('cart.subtotal') }}</dt><dd>{{ formatCurrency(order.total_price) }}</dd></div>
                        <div v-if="shippingCost != null"><dt>{{ t('cart.shipping') }}</dt><dd>{{ formatCurrency(shippingCost) }}</dd></div>
                        <div v-if="Number(order.discount?.amount) > 0">
                            <dt>{{ t('cart.discount') }}</dt><dd>{{ formatCurrency(order.discount.amount) }}</dd>
                        </div>
                        <div class="order-grand-total"><dt>{{ t('cart.grand') }}</dt><dd>{{ formatCurrency(order.grand_total) }}</dd></div>
                    </dl>
                </section>

                <section class="customer-panel">
                    <h2 class="mb-3">{{ t('tracking.history') }}</h2>
                    <TimeLine :tracking="histories" :format-date="formatDate" />
                </section>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { orderStatusKey, useOrderStatus } from "@/composables/useOrderStatus";
import TimeLine from "@/components/common/TimeLine.vue";
import "@/assets/customer-pages.css";

const { t, n, locale } = useI18n();
const route = useRoute();
const authStore = useAuthStore();
const statusLabel = useOrderStatus();
const order = ref(null);
const loading = ref(true);
const items = computed(() => Array.isArray(order.value?.items) ? order.value.items.filter(Boolean) : []);
const histories = computed(() => Array.isArray(order.value?.tracking?.histories) ? order.value.tracking.histories : []);
const currentStatus = computed(() => order.value?.tracking?.current_status || order.value?.status);
const shippingCost = computed(() => order.value?.shipping_cost ?? order.value?.shipping_fee);
const formatCurrency = value => value == null || !Number.isFinite(Number(value))
    ? "–" : n(Number(value), { style: "currency", currency: "BDT", maximumFractionDigits: 2 });
const formatDate = value => value && Number.isFinite(Date.parse(value))
    ? new Date(value).toLocaleString(`${locale.value}-BD`, { dateStyle: "medium", timeStyle: "short" }) : "–";

async function loadOrder() {
    const orderId = route.params.orderId;
    if (!orderId) return;
    loading.value = true;
    order.value = null;
    try {
        const result = await authStore.fetchOrderDetail(orderId);
        if (route.params.orderId === orderId) order.value = result;
    } finally {
        if (route.params.orderId === orderId) loading.value = false;
    }
}

watch(() => route.params.orderId, loadOrder, { immediate: true });
</script>

<style scoped>
.order-detail-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
}

.order-tracking-code {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 8px;
    margin-bottom: 12px;
    font-size: .875rem;
}

.order-detail-grid {
    display: grid;
    align-items: start;
    gap: 14px;
}

.order-detail-items,
.order-detail-summary {
    margin-top: 10px;
    font-size: .875rem;
}

.order-detail-items li,
.order-detail-summary > div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 0;
    border-top: 1px solid #e4ece6;
}

.order-detail-items strong {
    flex: none;
}

.order-detail-summary dd {
    font-weight: 650;
}

.order-grand-total {
    font-weight: 750;
}

@media (min-width: 820px) {
    .order-detail-grid {
        grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    }
}
</style>
