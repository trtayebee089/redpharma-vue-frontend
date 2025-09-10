<template >
    <!-- Floating Cart Button -->
    <button @click="isCartOpen = true"
        class="z-101 fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600">
        <i class="pi pi-shopping-cart text-2xl"></i>
        <span v-if="cartItems.length"
            class="absolute top-0 right-0 w-5 h-5 bg-red-600 rounded-full text-xs text-white flex items-center justify-center">{{ totalQty }}</span>
    </button>

    <!-- Offcanvas -->
    <div class="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300"
        :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'">
        <div class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-semibold">My Cart</h3>
            <button @click="isCartOpen = false" class="text-gray-500 hover:text-gray-700">
                <i class="pi pi-times text-xl"></i>
            </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
            <div v-if="cartItems.length === 0" class="text-gray-500 text-center mt-10">
                Your cart is empty
            </div>

            <template v-for="item in cartItems" :key="item.id">
                <div class="flex justify-between items-center mb-4 border border-gray-300 rounded p-3">

                    <!-- Product Info -->
                    <div class="flex items-center space-x-3">
                        <!-- <img :src="item.image" class="w-12 h-12 object-contain rounded" /> -->
                        <div>
                            <p class="text-gray-800 font-medium">{{ item . name }}</p>
                            <p class="text-gray-500 text-sm">${{ item . price . toFixed(2) }}</p>
                        </div>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="flex items-center space-x-2">
                        <!-- Decrease Quantity -->
                        <button @click="decreaseQty(item)" :disabled="item.quantity <= 1"
                            class="w-6 h-6 flex items-center justify-center border rounded-sm
                    disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-700
                    text-red-700 bg-red-200 hover:bg-red-400 hover:text-white border-red-400">
                            <i class="pi pi-minus"></i>
                        </button>

                        <!-- Quantity -->
                        <span
                            class="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-800 rounded text-sm">
                            {{ item . quantity }}
                        </span>

                        <!-- Increase Quantity -->
                        <button @click="increaseQty(item)"
                            class="w-6 h-6 flex items-center justify-center bg-green-200 border border-green-400 rounded-sm text-green-600 text-sm hover:bg-green-400 hover:text-white">
                            <i class="pi pi-plus"></i>
                        </button>
                    </div>

                    <!-- Remove Button -->
                    <button @click="removeItem(item)" class="ml-4 text-red-500 hover:text-red-700 font-semibold">
                        ✕
                    </button>
                </div>
            </template>
        </div>

        <!-- Checkout + Clear Cart Buttons -->
        <div class="p-4 border-t space-y-2">
            <router-link to="/cart"
                class="block w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition text-center"
                :class="{ 'opacity-50 cursor-not-allowed': cartItems.length === 0 }" @click.prevent="goToCart"
                :disabled="cartItems.length === 0">
                Checkout
            </router-link>

            <button
                class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="cartItems.length === 0" @click="clearCart">
                Clear Cart
            </button>
        </div>
    </div>

    <!-- Overlay -->
    <div v-if="isCartOpen" @click="isCartOpen = false" class="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
</template>

<script setup>
    import {
        ref,
        computed
    } from "vue"
    import {
        useCartStore
    } from "@/stores/cart"

    const cartStore = useCartStore()
    const isCartOpen = ref(false)

    const cartItems = computed(() => cartStore.items)
    const totalQty = computed(() => cartStore.items.reduce((acc, i) => acc + i.quantity, 0))

    const increaseQty = (item) => cartStore.updateQuantity(item.id, item.quantity + 1)
    const decreaseQty = (item) => {
        if (item.quantity > 1) cartStore.updateQuantity(item.id, item.quantity - 1)
    }

    const goToCart = () => {
        if (cartItems.length === 0) return
        isCartOpen.value = false // close the drawer
        router.push('/cart') // navigate
    }
</script>
