<template>
    <div class="p-6 font-sans text-gray-800 pt-6">
        <BreadCrumb :crumbs="crumbs" :title="title" :subtitle="t('orders.subtitle')" />

        <div class="flex space-x-4 border-b border-gray-200 mb-4 mt-10">
            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value" :class="[
                'py-2 px-4 font-medium transition',
                activeTab === tab.value
                    ? 'border-b-2 border-green-500 text-green-600'
                    : 'text-gray-500 hover:text-green-600'
            ]">
                {{ tab.label }}
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead class="bg-gray-50 text-gray-700 font-medium">
                    <tr>
                        <th class="px-4 py-3 text-left">{{ t('orders.orderId') }}</th>
                        <th class="px-4 py-3 text-left">{{ t('orders.date') }}</th>
                        <th class="px-4 py-3 text-left">{{ t('orders.status') }}</th>
                        <th class="px-4 py-3 text-left">{{ t('orders.items') }}</th>
                        <th class="px-4 py-3 text-right">{{ t('orders.total') }}</th>
                        <th class="px-4 py-3 text-center">{{ t('orders.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="6" class="text-center py-6">{{ t('orders.loading') }}</td>
                    </tr>

                    <tr v-else-if="filteredOrders.length > 0" v-for="order in filteredOrders" :key="order.id"
                        class="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td class="px-4 py-3 text-gray-700">{{ order.id }}</td>
                        <td class="px-4 py-3 text-gray-700">{{ order.date }}</td>
                        <td class="px-4 py-3">
                            <span :class="[
                                'px-2 py-1 rounded text-sm font-semibold',
                                order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-700'
                                    : order.status === 'Canceled'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-yellow-100 text-yellow-700'
                            ]">
                                {{ order.status }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-gray-700">{{ order.items.join(', ') }}</td>
                        <td class="px-4 py-3 text-right font-semibold text-gray-800">৳ {{ order.total }}</td>
                        <td class="px-4 py-3 text-center">
                            <router-link :to="{ name: 'order-detail', params: { orderId: order.id }, state: { order } }"
                                class="text-green-600 hover:underline">
                                {{ t('common.view') }}
                            </router-link>
                        </td>
                    </tr>

                    <tr v-else>
                        <td colspan="6" class="text-center py-6 text-gray-500">
                            {{ t('orders.noOrdersForTab') }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import BreadCrumb from "@/components/common/BreadCrumb.vue";

const authStore = useAuthStore();
const { t } = useI18n();

const crumbs = computed(() => [
    { label: t("common.home"), to: "/" },
    { label: t("orders.title") },
]);

const title = computed(() => t("orders.title"));
const tabs = computed(() => [
    { label: t("orders.filters.all"), value: "all" },
    { label: t("orders.filters.delivered"), value: "delivered" },
    { label: t("orders.filters.canceled"), value: "canceled" },
    { label: t("orders.filters.processing"), value: "processing" },
]);

const activeTab = ref("all");
const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
    if (authStore.isAuthenticated) {
        loading.value = true;
        orders.value = await authStore.fetchOrders();
        loading.value = false;
    } else {
        orders.value = [];
        loading.value = false;
    }
});

const filteredOrders = computed(() => {
    if (!orders.value || orders.value.length === 0) return [];
    if (activeTab.value === "all") return orders.value;
    return orders.value.filter(order => order.status.toLowerCase() === activeTab.value);
});
</script>

<style scoped>
table tbody tr:hover {
    background-color: #f9fafb;
}
</style>
