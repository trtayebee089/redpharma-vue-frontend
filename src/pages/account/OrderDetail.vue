<template>
    <div class="max-w-4xl mx-auto p-6 font-sans text-gray-800 space-y-6">
        <!-- Breadcrumb -->
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
                    <span class="text-gray-900 font-semibold">Order #{{ order . id }}</span>
                </li>
            </ol>
        </nav>

        <!-- Header / Order Info -->
        <div class="bg-white shadow rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border border-green-200">
            <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Order #{{ order . id }}</h2>
                <p class="text-gray-600">Placed on: <span class="font-medium">{{ order . date }}</span></p>
                <p class="text-gray-600 mt-1">
                    Status:
                    <span
                        :class="[
                            'px-3 py-1 rounded-full text-sm font-semibold',
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Canceled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        ]">
                        {{ order . status }}
                    </span>
                </p>
            </div>
            <div class="text-right">
                <p class="text-gray-600">Total Amount:</p>
                <p class="text-2xl font-bold text-gray-900">৳ {{ order . total }}</p>
            </div>
        </div>

        <!-- Payment Method -->
        <div class="bg-white shadow rounded-lg p-6 mb-6 border border-green-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-3 border-b border-green-200 pb-2">Payment Method</h3>
            <p class="text-gray-700 font-medium">{{ order . paymentMethod }}</p>
        </div>

        <!-- Medicines List -->
        <div class="bg-white shadow rounded-lg p-6 border border-green-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b border-green-200 pb-2">Medicines Ordered</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full border border-gray-200 rounded-lg text-left">
                    <thead class="bg-green-50 text-gray-700 font-medium">
                        <tr>
                            <th class="px-4 py-3">Medicine</th>
                            <th class="px-4 py-3">Dosage</th>
                            <th class="px-4 py-3">Quantity</th>
                            <th class="px-4 py-3">Price</th>
                            <th class="px-4 py-3 text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.items" :key="item.id"
                            class="border-b border-gray-200 hover:bg-green-50 transition">
                            <td class="px-4 py-3 font-medium">{{ item . name }}</td>
                            <td class="px-4 py-3">{{ item . dosage }}</td>
                            <td class="px-4 py-3">{{ item . quantity }}</td>
                            <td class="px-4 py-3">৳ {{ item . price }}</td>
                            <td class="px-4 py-3 text-right font-semibold">৳ {{ item . price * item . quantity }}</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="px-4 py-3 text-right font-bold text-gray-900">Total</td>
                            <td class="px-4 py-3 text-right font-bold text-gray-900">৳ {{ order . total }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        ref
    } from "vue";
    import {
        useRoute
    } from "vue-router";

    const route = useRoute();
    const orderId = route.params.id;

    // Fake order data
    const order = ref({
        id: orderId || "ORD-1001",
        date: "2025-09-01",
        status: "Delivered",
        total: 1200,
        paymentMethod: "Credit Card",
        items: [{
                id: 1,
                name: "Paracetamol",
                dosage: "500mg",
                quantity: 2,
                price: 200
            },
            {
                id: 2,
                name: "Vitamin C",
                dosage: "1000mg",
                quantity: 1,
                price: 300
            },
            {
                id: 3,
                name: "Cough Syrup",
                dosage: "10ml",
                quantity: 1,
                price: 500
            },
        ],
    });
</script>

<style scoped>
    table tbody tr:hover {
        background-color: #f0fdf4;
        /* soft green hover for theme */
    }
</style>
