<template>
    <div
        class="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-2 sm:bottom-6 sm:right-6 bottom-20 right-4">
        <transition name="fade">
            <div v-if="openOptions" class="flex flex-col items-end space-y-2 mb-2">
                <a href="https://wa.me/+8801997202010" target="_blank"
                    class="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform"
                    title="WhatsApp">
                    <i class="pi pi-whatsapp text-xl sm:text-xl text-lg"></i>
                </a>

                <a href="https://m.me/redpharmabd" target="_blank"
                    class="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition-transform"
                    title="Messenger">
                    <i class="pi pi-facebook text-xl sm:text-xl text-lg"></i>
                </a>
            </div>
        </transition>

        <button @click="openOptions = !openOptions"
            class="relative flex items-center justify-center w-14 h-14 sm:w-14 sm:h-14 w-12 h-12 rounded-full bg-green-500 text-white shadow-2xl hover:scale-110 transition-transform group">
            <i class="pi pi-comment text-2xl sm:text-2xl text-xl"></i>

            <span v-if="unreadCount > 0"
                class="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>

            <span
                class="absolute right-full mr-3 px-3 py-1 rounded-lg bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                Chat With Us
            </span>
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";

const openOptions = ref(false);
const unreadCount = ref(0);
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

@media (max-width: 640px) {
    .fixed {
        bottom: 80px !important;
        right: 1rem !important;
    }
}
</style>
