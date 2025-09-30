<template>
    <!-- Offcanvas Drawer -->
    <div class="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-51 transform transition-transform duration-300 flex flex-col"
        :class="cartStore.isCartOpen ? 'translate-x-0' : 'translate-x-full'">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b border-gray-200 bg-green-50 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800">
                Cart ({{ cartStore.items.length }} items)
            </h3>
            <div class="flex flex-1 justify-end space-x-2">
                <!-- Clear Cart -->
                <button @click="cartStore.clearCart()"
                    class="text-red-500 hover:text-red-700 px-3 py-1 rounded-full transition">
                    Clear Cart
                </button>

                <!-- Close Offcanvas -->
                <button @click="cartStore.toggleCart(false)"
                    class="text-gray-500 hover:text-gray-700 p-1 rounded-full transition">
                    <i class="pi pi-times text-xl"></i>
                </button>
            </div>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div v-if="!cartStore.items.length" class="text-gray-500 text-center mt-10">
                Your cart is empty
            </div>

            <template v-for="item in cartStore.items" :key="item.id">
                <div
                    class="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition gap-4">

                    <!-- Left: Image + Details -->
                    <div class="flex items-center gap-3 flex-1 min-w-0">
                        <img v-if="item.image" :src="item.image" alt="product"
                            class="w-16 h-16 object-cover rounded-lg border border-gray-200" />

                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-800 text-sm truncate">
                                {{ item.name }}
                            </p>
                            <p class="text-sm text-gray-500 truncate" v-if="item.brand">{{ item.brand.title }}</p>

                            <!-- Quantity Controls -->
                            <div class="flex items-center space-x-2 mt-2">
                                <button @click="decreaseQty(item)" :disabled="item.quantity <= 1" class="w-6 h-6 flex items-center justify-center border rounded-sm
                  disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-700
                  text-green-700 bg-green-200 hover:bg-green-400 hover:text-white border-green-400 transition">
                                    <i class="pi pi-minus"></i>
                                </button>

                                <span
                                    class="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-800 rounded text-sm">
                                    {{ item.quantity }}
                                </span>

                                <button @click="increaseQty(item)"
                                    class="w-6 h-6 flex items-center justify-center bg-green-200 border border-green-400 rounded-sm text-green-600 text-sm hover:bg-green-400 hover:text-white transition">
                                    <i class="pi pi-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Price -->
                    <div class="flex flex-col items-end justify-between text-right min-w-[80px]">
                        <p v-if="item.offerPrice" class="text-gray-400 text-sm line-through">
                            {{ (item.price * item.quantity).toFixed(2) }} Tk
                        </p>

                        <p class="text-green-700 font-semibold text-lg whitespace-nowrap">
                            {{ ((Number(item.offerPrice ?? item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)
                            }} Tk
                        </p>

                        <!-- Remove Button -->
                        <button @click="cartStore.removeFromCart(item.id)"
                            class="text-red-500 hover:text-red-700 mt-2 transition font-medium">
                            <i class="pi pi-times"></i>
                        </button>
                    </div>

                </div>
            </template>

        </div>

        <!-- Footer Summary (Fixed) -->
        <div class="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0 space-y-3 shadow-inner rounded-t-lg">
            <div class="flex justify-between text-gray-600 font-semibold">
                <span>Total MRP:</span>
                <span class="font-medium">{{ totalMRP.toFixed(2) }} Tk</span>
            </div>
            <div class="flex justify-between text-red-600 font-semibold">
                <span>Discount:</span>
                <span>{{ totalDiscount.toFixed(2) }} Tk</span>
            </div>
            <div class="flex justify-between text-green-700 font-semibold">
                <span>Total Payment:</span>
                <span>{{ totalPayment.toFixed(2) }} Tk</span>
            </div>

            <router-link to="/cart"
                class="block w-full bg-green-500 text-white py-3 rounded-lg text-center font-semibold hover:bg-green-600 transition shadow-md"
                :class="{ 'opacity-50 cursor-not-allowed': !cartStore.items.length }" @click.prevent="goToCart">
                Checkout
            </router-link>
        </div>
    </div>

    <div v-if="cartStore.isCartOpen" @click="cartStore.toggleCart(false)"
        class="fixed inset-0 bg-black/60 z-50 transition-opacity">
    </div>

</template>

<script setup>
import {
    useCartStore
} from '@/stores/cart'
import {
    useRouter
} from 'vue-router'
import {
    computed
} from 'vue'

const cartStore = useCartStore()
const router = useRouter()

const increaseQty = (item) => cartStore.updateQuantity(item.id, item.quantity + 1)
const decreaseQty = (item) => {
    if (item.quantity > 1) cartStore.updateQuantity(item.id, item.quantity - 1)
}

const totalMRP = computed(() =>
    cartStore.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
)

const totalPayment = computed(() =>
    cartStore.items.reduce((acc, i) => acc + (i.offerPrice || i.price) * i.quantity, 0)
)

const totalDiscount = computed(() => totalMRP.value - totalPayment.value)


const goToCart = () => {
    if (!cartStore.items.length) return
    cartStore.toggleCart(false)
    router.push('/cart')
}
</script>

<style scoped>
.flex-1 {
    min-height: 0;
}
</style>
