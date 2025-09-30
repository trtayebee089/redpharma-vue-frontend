<template>
    <div class="relative border-l-0 pl-6">
        <div v-for="(history, index) in tracking" :key="history.id ?? index"
            class="relative flex justify-center items-center">
            <!-- Left content -->
            <div class="bg-gray-50 p-4 w-[45%] text-right ">
                <p class="text-sm text-gray-500">
                    {{ formatDate(history . changed_at) }}
                </p>
            </div>

            <!-- Marker with line -->
            <div class="relative flex items-center justify-center w-[10%]">
                <div class="w-8 h-8 rounded-full text-white flex items-center justify-center z-10" :style="{ backgroundColor: getStatusColor(history.status) }">
                    <i class="pi text-xs" :class="getStatusIcon(history.status)"></i>
                </div>
                <!-- vertical line -->
                <div v-if="index < tracking.length - 1"
                    class="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-400"></div>
            </div>

            <!-- Right content -->
            <div class="bg-gray-50 p-4 w-[45%] ">
                <p class="font-semibold capitalize">
                    {{ history . status }}
                </p>
                <p v-if="history.notes" class="text-gray-600 text-sm mt-1">
                    {{ history . notes }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        tracking: {
            type: Array,
            required: true,
        },
        formatDate: {
            type: Function,
            required: true,
        },
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "#f59e0b"; // amber
            case "processing":
                return "#3b82f6"; // blue
            case "in_transit":
                return "#6366f1"; // indigo
            case "delivered":
                return "#10b981"; // green
            case "cancelled":
                return "#ef4444"; // red
            default:
                return "#6b7280"; // gray
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return "pi pi-clock";
            case "processing":
                return "pi pi-cog";
            case "in_transit":
                return "pi pi-truck";
            case "delivered":
                return "pi pi-check";
            case "cancelled":
                return "pi pi-times";
            default:
                return "pi pi-info-circle";
        }
    };
</script>
