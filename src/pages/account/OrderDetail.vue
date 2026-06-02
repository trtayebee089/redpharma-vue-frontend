<template>
    <div class="max-w-4xl mx-auto p-6 font-sans text-gray-800 space-y-6">
        <nav class="text-sm mb-6" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3 text-gray-500">
                <li>
                    <router-link to="/" class="hover:text-gray-700">Home</router-link>
                </li>
                <li>
                    <span class="mx-2 text-gray-400">/</span>
                    <router-link to="/orders" class="hover:text-gray-700">My Orders</router-link>
                </li>
                <li>
                    <span class="mx-2 text-gray-400">/</span>
                    <span class="text-gray-900 font-semibold">Order #{{ order?.id }}</span>
                </li>
            </ol>
        </nav>

        <div v-if="loading" class="flex justify-center items-center min-h-[300px] ">
            <svg class="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                </path>
            </svg>
        </div>
        <div v-else-if="error" class="text-center py-6 text-red-600">{{ error }}</div>
        <div v-else-if="order">
            <div
                class="bg-white shadow rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border border-green-200">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Order #{{ order.id }}</h2>
                    <p class="text-gray-600">Placed on: <span class="font-medium">{{ order.date }}</span></p>
                    <p class="text-gray-600 mt-1">
                        Status:
                        <span :class="[
                            'px-3 py-1 rounded-full text-sm font-semibold',
                            order.tracking.current_status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                order.tracking.current_status === 'Canceled' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                        ]">
                            {{ order.tracking.current_status.toString().toUpperCase() }}
                        </span>
                    </p>
                    <p class="text-gray-600">Tracking Code: <span class="font-medium">{{ order.tracking.tracking_number }}</span></p>
                </div>
                <div class="text-right">
                    <p class="text-gray-600">Total Amount:</p>
                    <p class="text-2xl font-bold text-gray-900">৳ {{ order.grand_total }}</p>
                </div>
            </div>

            <div class="bg-white shadow rounded-lg p-6 mb-6 border border-green-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b border-green-200 pb-2">Medicines Ordered
                </h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full border border-gray-200 rounded-lg text-left">
                        <thead class="bg-green-50 text-gray-700 font-medium">
                            <tr>
                                <th class="px-4 py-3">Medicine</th>
                                <th class="px-4 py-3">Quantity</th>
                                <th class="px-4 py-3">Price</th>
                                <th class="px-4 py-3 text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.items" :key="item.id"
                                class="border-b border-gray-200 hover:bg-green-50 transition">
                                <td class="px-4 py-3 font-medium">{{ item.name }}</td>
                                <td class="px-4 py-3">{{ item.quantity }}</td>
                                <td class="px-4 py-3">৳ {{ item.price }}</td>
                                <td class="px-4 py-3 text-right font-semibold">৳ {{ item.subtotal }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="px-4 py-3 text-right font-bold text-gray-900">Total</td>
                                <td class="px-4 py-3 text-right font-bold text-gray-900">৳ {{ order.total_price }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="px-4 py-3 text-right font-bold text-gray-900">Shipping Fee</td>
                                <td class="px-4 py-3 text-right font-bold text-gray-900">৳ {{ cartStore.shippingRate }}</td>
                            </tr>
                            <tr v-if="order.discount && order.discount.amount > 0">
                                <td colspan="3" class="px-4 py-3 text-right font-bold text-gray-900">Discount</td>
                                <td class="px-4 py-3 text-right font-bold text-gray-900">৳ {{ order.discount.amount }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="px-4 py-3 text-right font-bold text-gray-900">Grand Total</td>
                                <td class="px-4 py-3 text-right font-bold text-gray-900">৳ {{ order.grand_total }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div class="bg-white shadow rounded-lg p-6 border border-green-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-green-200 pb-2">Tracking History</h3>
                <TimeLine :tracking="order.tracking.histories" :formatDate="formatDate" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import TimeLine from "@/components/common/TimeLine.vue";

const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();

const order = ref(null);
const loading = ref(true);
const error = ref(null);
const formatDate = (value) => (value ? new Date(value).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" }) : "-");

onMounted(async () => {
    const orderId = route.params.orderId;
    if (authStore.isAuthenticated) {
        try {
            order.value = await authStore.fetchOrderDetail(orderId);
        } catch (err) {
            error.value = "Failed to fetch order details.";
        } finally {
            loading.value = false;
        }
    } else {
        error.value = "You must be logged in to view this order.";
        loading.value = false;
    }
});
</script>

<style scoped>
table tbody tr:hover {
    background-color: #f0fdf4;
}
</style>
