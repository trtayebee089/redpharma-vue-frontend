<template>
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>
            <transition appear enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95">
                <div :class="[
                    'relative z-10 w-11/12 overflow-hidden bg-white',
                    panelClass || 'max-w-4xl rounded-lg shadow-lg',
                ]">
                    <button @click="$emit('close');" :aria-label="$t('common.modalClose')"
                        class="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-gray-400 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500">
                        &times;
                    </button>

                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean,
    panelClass: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["close"]);

function close() {
    emit("close");
}
</script>
