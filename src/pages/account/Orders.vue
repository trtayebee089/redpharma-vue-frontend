<template>
    <div class="p-6 font-sans text-gray-800 pt-0">
        <nav class="text-sm mb-6" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                    <router-link to="/" class="text-gray-500 hover:text-gray-700">Home</router-link>
                </li>
                <li>
                    <span class="mx-2 text-gray-400">/</span>
                    <span class="text-gray-700 font-medium">My Orders</span>
                </li>
            </ol>
        </nav>

        <!-- Page Header -->
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

        <!-- Tabs -->
        <div class="flex space-x-4 border-b border-gray-200 mb-4">
            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                :class="['py-2 px-4 font-medium transition', activeTab === tab.value ?
                    'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-green-600'
                ]">
                {{ tab . label }}
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
                    <tr v-for="order in filteredOrders" :key="order.id"
                        class="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td class="px-4 py-3 text-gray-700">{{ order . id }}</td>
                        <td class="px-4 py-3 text-gray-700">{{ order . date }}</td>
                        <td class="px-4 py-3">
                            <span
                                :class="[
                                    'px-2 py-1 rounded text-sm font-semibold',
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                    order.status === 'Canceled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                ]">
                                {{ order . status }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-gray-700">{{ order . items . join(', ') }}</td>
                        <td class="px-4 py-3 text-right font-semibold text-gray-800">৳ {{ order . total }}</td>
                        <td class="px-4 py-3 text-center">
                            <router-link :to="`/orders/${order.id}`"
                                class="text-green-600 hover:underline">View</router-link>
                        </td>
                    </tr>
                    <tr v-if="filteredOrders.length === 0">
                        <td colspan="6" class="text-center py-6 text-gray-500">No orders found for this tab.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        computed
    } from "vue";

    const tabs = [{
            label: "All",
            value: "all"
        },
        {
            label: "Delivered",
            value: "delivered"
        },
        {
            label: "Canceled",
            value: "canceled"
        },
        {
            label: "Processing",
            value: "processing"
        },
    ];

    const activeTab = ref("all");

    // Fake orders data
    const orders = ref([{
            id: "ORD-1001",
            date: "2025-09-01",
            status: "Delivered",
            items: ["Paracetamol", "Vitamin C"],
            total: 1200
        },
        {
            id: "ORD-1002",
            date: "2025-09-02",
            status: "Processing",
            items: ["Cough Syrup"],
            total: 350
        },
        {
            id: "ORD-1003",
            date: "2025-09-03",
            status: "Canceled",
            items: ["Face Mask", "Sanitizer"],
            total: 500
        },
        {
            id: "ORD-1004",
            date: "2025-09-05",
            status: "Delivered",
            items: ["Vitamin D"],
            total: 200
        },        
    ]);

    const filteredOrders = computed(() => {
        if (activeTab.value === "all") return orders.value;
        return orders.value.filter(order => order.status.toLowerCase() === activeTab.value);
    });
</script>

<style scoped>
    /* Optional hover effect for rows */
    table tbody tr:hover {
        background-color: #f9fafb;
    }
</style>
