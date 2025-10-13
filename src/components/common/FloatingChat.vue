<template>
    <!-- Floating Chat Bubble -->
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-2">
        <!-- Expanded Options -->
        <transition name="fade">
            <div v-if="openOptions" class="flex flex-col items-end space-y-2 mb-2">
                <a href="https://wa.me/+8801997202010" target="_blank"
                    class="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform"
                    title="WhatsApp">
                    <i class="pi pi-whatsapp text-xl"></i>
                </a>

                <a href="https://m.me/redpharmabd" target="_blank"
                    class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition-transform"
                    title="Messenger">
                    <i class="pi pi-facebook text-xl"></i>
                </a>
            </div>
        </transition>

        <button @click="openOptions = !openOptions"
            class="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-2xl hover:scale-110 transition-transform group">
            <i class="pi pi-comment text-2xl"></i>

            <!-- Notification Dot -->
            <span v-if="unreadCount > 0"
                class="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>

            <!-- Tooltip -->
            <span
                class="absolute right-full mr-3 px-3 py-1 rounded-lg bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat With Us
            </span>
        </button>

    </div>
</template>

<script setup>
import { ref } from "vue";

const openOptions = ref(false);
const unreadCount = ref(0); // Optional, can be dynamic from chat API
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
