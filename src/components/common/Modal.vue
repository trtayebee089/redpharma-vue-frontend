<!-- src/common/Modal.vue -->
<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl overflow-hidden relative">
                <button @click="$emit('close')"
                    class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold">
                    &times;
                </button>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup>
    defineProps({
        isOpen: Boolean
    });
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
