<template>
    <div class="customer-page">
        <header class="customer-heading">
            <h1>{{ t('orders.title') }}</h1>
            <p>{{ t('orders.subtitle') }}</p>
        </header>

        <div class="order-filters" :aria-label="t('orders.filterLabel')" role="group">
            <button v-for="filter in filters" :key="filter" type="button" class="customer-button"
                :aria-pressed="activeFilter === filter" @click="activeFilter = filter">
                {{ t(`orders.filters.${filter}`) }}
            </button>
        </div>

        <p v-if="loading" class="customer-panel customer-empty" role="status">{{ t('orders.loading') }}</p>
        <div v-else-if="failed" class="customer-panel customer-empty" role="status">
            <p>{{ t('orders.loadFailed') }}</p>
            <button type="button" class="customer-button mt-3" @click="loadOrders">{{ t('orders.retry') }}</button>
        </div>
        <p v-else-if="!filteredOrders.length" class="customer-panel customer-empty" role="status">
            {{ t('orders.noOrdersForTab') }}
        </p>
        <ul v-else class="grid gap-3">
            <li v-for="order in filteredOrders" :key="order.id" class="customer-panel order-row">
                <div class="order-product">
                    <h2>{{ t('orders.reference', { id: order.id }) }}</h2>
                    <p v-if="order.itemNames.length" class="customer-muted mt-1 text-sm">
                        {{ order.itemNames.slice(0, 2).join(', ') }}
                        <span v-if="order.itemNames.length > 2">
                            {{ t('orders.moreItems', { count: n(order.itemNames.length - 2) }) }}
                        </span>
                    </p>
                </div>
                <dl class="order-facts">
                    <div>
                        <dt>{{ t('orders.date') }}</dt>
                        <dd>{{ order.date || '–' }}</dd>
                    </div>
                    <div>
                        <dt>{{ t('orders.status') }}</dt>
                        <dd><span class="customer-status" :data-status="order.statusKey">{{ statusLabel(order.status) }}</span></dd>
                    </div>
                    <div>
                        <dt>{{ t('orders.total') }}</dt>
                        <dd>{{ order.total == null ? '–' : `৳ ${order.total}` }}</dd>
                    </div>
                </dl>
                <router-link class="customer-button order-details-link"
                    :to="{ name: 'order-detail', params: { orderId: order.id } }">
                    {{ t('orders.viewDetails') }}
                    <i class="pi pi-arrow-right text-xs" aria-hidden="true"></i>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { orderStatusKey, useOrderStatus } from "@/composables/useOrderStatus";
import "@/assets/customer-pages.css";

const authStore = useAuthStore();
const { t, n } = useI18n();
const statusLabel = useOrderStatus();
const filters = ["all", "delivered", "processing", "canceled"];
const activeFilter = ref("all");
const orders = ref([]);
const loading = ref(true);
const failed = ref(false);

async function loadOrders() {
    loading.value = true;
    failed.value = false;
    try {
        const result = await authStore.fetchOrders();
        orders.value = Array.isArray(result) ? result : [];
        failed.value = Boolean(authStore.error);
    } catch {
        failed.value = true;
    } finally {
        loading.value = false;
    }
}

const orderRows = computed(() => orders.value.filter(order => order?.id != null).map(order => ({
    ...order,
    statusKey: orderStatusKey(order.status),
    itemNames: Array.isArray(order.items)
        ? order.items.map(item => typeof item === "string" ? item : item?.name).filter(Boolean)
        : [],
})));

const inProgress = new Set(["pending", "confirmed", "processing", "packed", "picked_up", "in_transit", "out_for_delivery", "on_hold"]);
const filteredOrders = computed(() => {
    switch (activeFilter.value) {
        case "delivered":
            return orderRows.value.filter(order => ["completed", "delivered"].includes(order.statusKey));
        case "processing":
            return orderRows.value.filter(order => inProgress.has(order.statusKey));
        case "canceled":
            return orderRows.value.filter(order => order.statusKey === "cancelled");
        default:
            return orderRows.value;
    }
});

onMounted(loadOrders);
</script>

<style scoped>
.order-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-bottom: 14px;
}

.order-filters [aria-pressed="true"] {
    background: #e5f4e9;
    border-color: #9ec9ae;
    color: #145334;
}

.order-row {
    display: grid;
    align-items: center;
    gap: 14px;
}

.order-product {
    min-width: 0;
}

.order-facts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 7rem), 1fr));
    gap: 10px 12px;
    font-size: .875rem;
}

.order-facts dt {
    color: #4d6557;
    font-size: .75rem;
}

.order-facts dd {
    font-weight: 650;
}

.order-details-link {
    justify-self: start;
}

@media (min-width: 768px) {
    .order-row {
        grid-template-columns: minmax(0, 1fr) auto;
    }

    .order-facts {
        grid-area: 2 / 1 / 3 / -1;
    }

    .order-details-link {
        justify-self: end;
    }
}

@media (min-width: 1280px) {
    .order-row {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr) auto;
    }

    .order-facts {
        grid-area: auto;
        grid-template-columns: 1.15fr 1fr .8fr;
    }
}
</style>
