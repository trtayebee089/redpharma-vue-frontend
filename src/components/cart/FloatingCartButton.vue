<template>
    <div class="fixed bottom-4 right-4 z-100 xl:hidden">
        <button @click="cartStore.toggleCart(true)"
            class="w-16 h-16 bg-green-600 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 transition">
            <i class="pi pi-shopping-cart text-2xl"></i>
            <span v-if="cartStore.totalQty"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {{ cartStore . totalQty }}
            </span>
        </button>
    </div>
</template>

<script setup>
import {
        useCartStore
    } from "@/stores/cart"
    const cartStore = useCartStore();
</script>

<style>

</style>
