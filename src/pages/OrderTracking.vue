<template>
    <div>
        <div class="relative fade-up max-w-4xl mx-auto">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-extrabold text-gray-800 mb-2">Track Your Consignment</h1>
                <p class="text-gray-500 text-lg">Now you can easily track your consignment</p>
            </div>

            <div class="flex justify-center mb-12">
                <input type="text" v-model="trackingCodeInput" placeholder="Enter Mobile Order Number"
                    class="w-full max-w-md px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button @click="trackOrder"
                    class="px-6 py-3 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition">
                    Track
                </button>
            </div>

            <div v-if="order" class="mb-8 shadow-sm bg-white">
                <div class="space-y-6">
                    <div class="bg-white shadow-md rounded-lg p-6 border border-green-200">
                        <h2 class="text-xl font-semibold mb-4 text-gray-800 border-b border-green-300 pb-2">Order Info
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><span class="font-medium text-gray-700">Date:</span> {{ order . date }}</p>
                            <p><span class="font-medium text-gray-700">Id:</span> {{ order . id }}</p>
                            <p><span class="font-medium text-gray-700">Invoice:</span> {{ order . invoice }}</p>
                            <p><span class="font-medium text-gray-700">Tracking Code:</span> {{ order . trackingCode }}
                            </p>
                            <p><span class="font-medium text-gray-700">Approved:</span> {{ order . approved }}</p>
                            <p><span class="font-medium text-gray-700">Weight:</span> {{ order . weight }} KG</p>
                            <p><span class="font-medium text-gray-700">COD:</span> ৳ {{ order . cod }}</p>
                            <p><span class="font-medium text-gray-700">Status:</span> {{ order . status }}</p>
                        </div>
                    </div>

                    <div class="bg-white shadow-md rounded-lg p-6 border border-green-200">
                        <h2 class="text-xl font-semibold mb-4 text-gray-800 border-b border-green-300 pb-2">Customer
                            Info
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><span class="font-medium text-gray-700">Name:</span> {{ order . customer . name }}</p>
                            <p><span class="font-medium text-gray-700">Phone:</span> {{ order . customer . phone }}</p>
                            <p class="md:col-span-2"><span class="font-medium text-gray-700">Address:</span>
                                {{ order . customer . address }}</p>
                        </div>
                    </div>

                    <div class="bg-white shadow-md rounded-lg p-6 border border-green-200">
                        <h2 class="text-xl font-semibold mb-4 text-gray-800 border-b border-green-300 pb-2">Rider /
                            Assigned
                            To</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><span class="font-medium text-gray-700">Name:</span> {{ order . assigned . name }}</p>
                            <p><span class="font-medium text-gray-700">Phone:</span> {{ order . assigned . phone }}</p>
                            <p><span class="font-medium text-gray-700">Sender:</span> {{ order . sender . name }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Timeline -->
            <div v-if="order && order.updates.length">
                <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center pb-9">Tracking Updates</h2>
                <Timeline :value="order.updates" align="alternate">
                    <template #opposite="slotProps" class="text-sm text-gray-500 m-5">
                        <small
                            class="text-gray-500">{{ slotProps . item . date }}<br>{{ slotProps . item . time }}</small>
                    </template>
                    <template #marker="slotProps">
                        <span :class="['inline-flex items-center justify-center w-8 h-8 rounded-full text-white']"
                            :style="{ backgroundColor: slotProps.item.color }">
                            <i :class="slotProps.item.icon"></i>
                        </span>
                    </template>
                    <template #content="slotProps">
                        <div class="p-3 bg-gray-50 rounded shadow-sm">
                            {{ slotProps . item . message }}
                        </div>
                    </template>
                </Timeline>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        ref
    } from "vue";
    import Timeline from "primevue/timeline";
    import 'primevue/resources/themes/saga-green/theme.css' // choose any theme
    import 'primevue/resources/primevue.min.css'
    import 'primeicons/primeicons.css'
    import PageTemplate from "../components/layout/PageTemplate.vue";
    // import 'primeflex/primeflex.css'

    // Tracking number input
    const trackingNumber = ref("");

    // Dummy order data
    const order = ref({
        date: 'Sep 03, 2025 12:58 pm',
        id: '170264800',
        invoice: 'INV-20250903',
        trackingCode: 'SFR250903PD84F2BDFBD',
        approved: 'N/A',
        weight: 2,
        cod: 1380,
        status: 'Delivered',
        customer: {
            name: 'Fahim',
            address: 'Rajshahi hi tech park, Rajshahi court',
            phone: '01765649100'
        },
        sender: {
            name: 'RedPharma BD'
        },
        assigned: {
            name: 'Mostafijur (Sojib)',
            phone: '01735916052'
        },
        updates: [{
                date: 'Sep 04, 2025',
                time: '06:05 pm',
                message: 'Consignment has been marked as delivered by rider.',
                icon: 'pi pi-check',
                color: '#4ade80'
            },
            {
                date: 'Sep 04, 2025',
                time: '05:25 pm',
                message: 'Assigned to rider.',
                icon: 'pi pi-user',
                color: '#facc15'
            },
            {
                date: 'Sep 04, 2025',
                time: '05:07 pm',
                message: 'Consignment has been received at RAJPARA (RAJSHAHI).',
                icon: 'pi pi-inbox',
                color: '#3b82f6'
            },
            {
                date: 'Sep 04, 2025',
                time: '02:38 pm',
                message: 'Consignment sent to RAJPARA (RAJSHAHI). Dispatch ID: 7687167',
                icon: 'pi pi-send',
                color: '#f87171'
            },
            {
                date: 'Sep 04, 2025',
                time: '02:13 pm',
                message: 'Consignment has been received at RAJSHAHI SUB WAREHOUSE.',
                icon: 'pi pi-inbox',
                color: '#3b82f6'
            },
            {
                date: 'Sep 04, 2025',
                time: '02:20 am',
                message: 'Consignment sent to RAJSHAHI SUB WAREHOUSE. Dispatch ID: 7675570',
                icon: 'pi pi-send',
                color: '#f87171'
            },
            {
                date: 'Sep 04, 2025',
                time: '02:02 am',
                message: 'Consignment has been received at FULFILLMENT WAREHOUSE.',
                icon: 'pi pi-inbox',
                color: '#3b82f6'
            },
            {
                date: 'Sep 04, 2025',
                time: '12:00 am',
                message: 'Consignment sent to SAVAR WAREHOUSE. Dispatch ID: 7677724',
                icon: 'pi pi-send',
                color: '#f87171'
            },
            {
                date: 'Sep 03, 2025',
                time: '10:21 pm',
                message: 'Consignment status has been updated as Pending',
                icon: 'pi pi-info-circle',
                color: '#9ca3af'
            },
        ]
    });

    function trackOrder() {
        console.log("Tracking:", trackingNumber.value);
    }
</script>
