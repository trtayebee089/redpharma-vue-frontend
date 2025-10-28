<template>
    <transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/50" @click="close"></div>
            <div class="relative bg-white rounded-lg shadow-lg w-11/12 max-w-4xl overflow-hidden z-10">
                <button @click="$emit('close');"
                    class="absolute top-3 right-3 z-20 text-gray-500 hover:text-gray-800 text-xl font-bold">
                    &times;
                </button>
                
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script setup>
    const props = defineProps({
        isOpen: Boolean
    })
    const emit = defineEmits(["close"])

    function close() {
        emit("close")
    }
</script>


<style scoped>
    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.35s ease;
    }

    .modal-enter-from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }

    .modal-enter-to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    .modal-leave-from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    .modal-leave-to {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }
</style>
