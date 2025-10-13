<template>
    <div class="p-6 font-sans text-gray-800 pt-6">
        <BreadCrumb :crumbs="crumbs" :title="title" subtitle="Manage your orders and track their status" />

        <!-- Tabs -->
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

        <!-- Orders Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead class="bg-gray-50 text-gray-700 font-medium">
                    <tr>
                        <th class="px-4 py-3 text-left">Order ID</th>
                        <th class="px-4 py-3 text-left">Date</th>
                        <th class="px-4 py-3 text-left">Status</th>
                        <th class="px-4 py-3 text-left">Items</th>
                        <th class="px-4 py-3 text-right">Total</th>
                        <th class="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Loading State -->
                    <tr v-if="loading">
                        <td colspan="6" class="text-center py-6">Loading orders...</td>
                    </tr>

                    <!-- Orders List -->
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
                                View
                            </router-link>
                        </td>
                    </tr>

                    <!-- No Orders -->
                    <tr v-else>
                        <td colspan="6" class="text-center py-6 text-gray-500">
                            No orders found for this tab.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import BreadCrumb from "@/components/common/BreadCrumb.vue";

const authStore = useAuthStore();

const crumbs = [
    { label: "Home", to: "/" },
    { label: "My Orders" },
];

const title = "My Orders";
const tabs = [
    { label: "All", value: "all" },
    { label: "Delivered", value: "delivered" },
    { label: "Canceled", value: "canceled" },
    { label: "Processing", value: "processing" },
];

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
