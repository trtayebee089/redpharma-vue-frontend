<template>
    <div class="order-confirmation max-w-4xl mx-auto pt-6 p-6 bg-white">
        <!-- Hero Section -->
        <div
            class="max-w-5xl mx-auto space-y-4 text-center leading-relaxed bg-green-50 rounded-lg p-6 relative overflow-hidden mb-6">
            <div class="absolute inset-0 opacity-10 pointer-events-none">
                <svg class="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M20 0 L0 0 0 20" fill="none" stroke="#FF0B55" stroke-width="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)"></rect>
                </svg>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-green-600 leading-relaxed mb-0" :class="langStore.langClass">
                {{ t("orderConfirmation.title") }}
            </h1>
            <p class="text-gray-700 text-lg md:text-xl leading-relaxed" :class="langStore.langClass">
                {{ t("orderConfirmation.description") }}
            </p>
        </div>

        <section class="mb-8 bg-white shadow-sm rounded-lg p-6 border border-green-200" v-if="isNewCustomer">
            <h2 class="text-2xl font-bold mb-6 flex items-center justify-center space-x-3 relative">
                <i class="pi pi-shopping-cart text-green-500 text-xl"></i>
                <span class="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-700">
                    Credentials
                </span>
            </h2>
            <p class="mb-4">Use this login credentials to sign in to your account and enjoy discount and rewards.</p>

            <div class="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm  ">
                <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Username: (Your Contact Number)</span>
                    <span class="text-gray-900">{{ order.customer.phone_number || "-" }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="font-medium text-gray-700">Password:</span>
                    <span class="text-gray-900">{{ temporaryPassword }}</span>
                </div>
            </div>
        </section>

        <section class="mb-8 bg-white shadow-sm rounded-lg p-6 border border-green-200">
            <h2 class="text-2xl font-bold mb-6 flex items-center justify-center space-x-3 relative">
                <i class="pi pi-shopping-cart text-green-500 text-xl"></i>
                <span class="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-700">
                    Order Summary
                </span>
            </h2>


            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm  ">
                <!-- Left Column -->
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-700">Order #:</span>
                        <span class="text-gray-900">{{ order.reference_no || "-" }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-700">Date:</span>
                        <span class="text-gray-900">{{ formatDate(order.created_at) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-700">Subtotal:</span>
                        <span class="text-gray-900">{{ formatCurrency(order.total_price) }}</span>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-700">Shipping:</span>
                        <span class="text-gray-900">{{ formatCurrency(order.shipping_cost) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-medium text-gray-700">Grand Total:</span>
                        <span class="text-gray-900">{{ formatCurrency(order.grand_total) }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-medium text-gray-700">Status:</span>
                        <span class="px-3 py-1 text-xs font-semibold rounded-full uppercase" :class="{
                            'bg-yellow-100 text-yellow-800': tracking.current_status === 'pending',
                            'bg-blue-100 text-blue-800': tracking.current_status === 'processing',
                            'bg-indigo-100 text-indigo-800': tracking.current_status === 'in_transit',
                            'bg-green-100 text-green-800': tracking.current_status === 'completed',
                            'bg-red-100 text-red-800': tracking.current_status === 'cancelled',
                            'bg-gray-100 text-gray-800': !tracking.current_status
                        }">
                            {{ tracking.current_status || "Pending" }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="mb-8 bg-white shadow rounded-lg p-6 transition-all duration-500 hover:shadow-lg border border-green-200">

            <h2 class="text-2xl font-bold mb-6 flex items-center justify-center space-x-3 text-gray-800 relative">
                <i class="pi pi-user text-green-500 text-xl"></i>
                <span class="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-700">
                    Customer Information
                </span>
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <!-- Name -->
                <div class="flex items-center space-x-2 group transition-colors duration-300">
                    <i class="pi pi-id-card text-gray-400 group-hover:text-blue-500"></i>
                    <div>
                        <p class="text-gray-500 font-medium">Name</p>
                        <p class="text-gray-900 font-semibold">{{ order.customer?.name || "-" }}</p>
                    </div>
                </div>

                <!-- Phone -->
                <div class="flex items-center space-x-2 group transition-colors duration-300">
                    <i class="pi pi-phone text-gray-400 group-hover:text-green-500"></i>
                    <div>
                        <p class="text-gray-500 font-medium">Phone</p>
                        <p class="text-gray-900 font-semibold">{{ order.customer?.phone_number || "-" }}</p>
                    </div>
                </div>

                <!-- Address -->
                <div class="col-span-1 md:col-span-2 flex items-start space-x-2 group transition-colors duration-300">
                    <i class="pi pi-map-marker text-gray-400 mt-1 group-hover:text-red-500"></i>
                    <div>
                        <p class="text-gray-500 font-medium">Address</p>
                        <p class="text-gray-900 font-semibold">{{ order.customer?.address || "-" }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-8 bg-white shadow rounded-lg p-6 transition-all duration-500 hover:shadow-lg border border-green-200">
            <h2 class="text-2xl font-bold mb-6 flex items-center justify-center space-x-3 text-gray-800 relative">
                <i class="pi pi-box text-green-500 text-xl"></i>
                <span class="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-700">
                    Ordered Medicines
                </span>
            </h2>
            <div class="overflow-x-auto">
                <table class="min-w-full border-collapse text-sm">
                    <thead class="bg-green-100 rounded">
                        <tr>
                            <th class="p-3 border-b border-green-300 rounded text-left text-gray-800 font-medium">Medicine</th>
                            <th class="p-3 border-b border-green-300  text-left text-gray-800 font-medium">Qty</th>
                            <th class="p-3 border-b border-green-300  text-left text-gray-800 font-medium">Unit Price</th>
                            <th class="p-3 border-b border-green-300 rounded text-left text-gray-800 font-medium">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in order.product_sales || []" :key="index"
                            class="hover:bg-gray-50 transition-colors duration-300">
                            <td class="p-3 border-b border-green-300 text-gray-900 font-medium">{{ item.name }}</td>
                            <td class="p-3 border-b border-green-300 text-gray-800">{{ item.pivot.qty + ' ' + item.unit.unit_name }}</td>
                            <td class="p-3 border-b border-green-300 text-gray-800">{{ formatCurrency(item.pivot.net_unit_price) }}</td>
                            <td class="p-3 border-b border-green-300 text-gray-900 font-semibold">{{ formatCurrency(item.pivot.total) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section v-if="tracking && tracking.histories?.length" class="mb-8 bg-white shadow rounded-lg p-6 transition-all duration-500 hover:shadow-lg border border-green-200">
            <h2 class="text-2xl font-bold mb-6 flex items-center justify-center space-x-3 text-gray-800 relative">
                <i class="pi pi-truck text-green-500 text-xl"></i>
                <span class="bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-700">
                    Tracking Updates
                </span>
            </h2>
            <TimeLine :tracking="tracking.histories" :formatDate="formatDate" />
        </section>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/language";
import { useCheckout } from "@/composables/useCheckout";
import TimeLine from "@/components/common/TimeLine.vue";

const route = useRoute();
const { t } = useI18n();
const langStore = useLanguageStore();
const { getOrderDetails, order, tracking } = useCheckout();

const order_id = route.params?.order_id;

const formatCurrency = (value) => (value != null ? "৳" + parseFloat(value).toFixed(2) : "-");
const formatDate = (value) => (value ? new Date(value).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" }) : "-");

const orderx = history.state?.order
const trackingx = history.state?.tracking
const isNewCustomer = history.state?.isNewCustomer
const temporaryPassword = history.state?.temporaryPassword

// Fetch order details
onMounted(async () => {
    if (order_id) {
        await getOrderDetails(order_id);
    }
});
</script>

<style scoped>
.order-confirmation {
    font-family: system-ui, sans-serif;
}
</style>
