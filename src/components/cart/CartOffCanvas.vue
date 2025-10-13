<template>
    <!-- Offcanvas Drawer -->
    <div class="fixed top-0 right-0 h-full bg-white shadow-2xl z-[101] transform transition-transform duration-300 flex flex-col
           w-[90vw] sm:w-[400px] md:w-[450px] lg:w-[480px] xl:w-[400px] rounded-l-2xl overflow-hidden"
        :class="cartStore.isCartOpen ? 'translate-x-0' : 'translate-x-full'">
        <!-- Header -->
        <div
            class="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 tracking-wide">
                Cart ({{ cartStore.items.length }} items)
            </h3>
            <div class="flex flex-1 justify-end space-x-2">
                <!-- Clear Cart -->
                <button @click="cartStore.clearCart()"
                    class="text-red-500 hover:text-red-700 px-3 py-1 rounded-full transition-all hover:shadow-sm">
                    Clear Cart
                </button>

                <!-- Close Offcanvas -->
                <button @click="cartStore.toggleCart(false)"
                    class="text-gray-500 hover:text-gray-700 p-1 rounded-full transition-all hover:shadow-sm">
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
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 gap-4">
                    <div class="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto relative">
                        <img v-if="getImageUrl(item)" :src="getImageUrl(item).url" alt="product"
                            class="w-16 h-16 object-cover rounded-xl border border-gray-300 shadow-sm" />

                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-800 text-sm truncate">{{ item.name }}</p>
                            <p class="text-sm text-gray-500 truncate" v-if="item.brand">{{ item.brand.title }}</p>

                            <p class="text-green-700 font-semibold text-base mt-1 sm:hidden">
                                {{ ((Number(item.offerPrice ?? item.price) || 0) * (Number(item.quantity) ||
                                    1)).toFixed(2) }} Tk
                            </p>

                            <button @click="cartStore.removeFromCart(item.id)"
                                class="absolute top-2 right-2 text-red-500 hover:text-red-700 sm:hidden transition font-medium">
                                <i class="pi pi-times"></i>
                            </button>

                            <div
                                class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-inner mt-2">
                                <button @click="decreaseQty(item)" :disabled="item.quantity <= 1 || item.isStockOut"
                                    class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all rounded-l-full disabled:text-gray-400 disabled:bg-gray-200">
                                    <i class="pi pi-minus"></i>
                                </button>

                                <input type="number" v-model.number="item.quantity" min="1"
                                    class="w-12 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all rounded-none" />

                                <button @click="increaseQty(item)" :disabled="item.isStockOut"
                                    class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all rounded-r-full disabled:text-gray-400 disabled:bg-gray-200">
                                    <i class="pi pi-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="hidden sm:flex flex-col items-end justify-between text-right min-w-[80px]">
                        <p v-if="item.offerPrice" class="text-gray-400 text-sm line-through">
                            {{ (item.price * item.quantity).toFixed(2) }} Tk
                        </p>

                        <p class="text-green-700 font-semibold text-lg whitespace-nowrap">
                            {{ ((Number(item.offerPrice ?? item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)
                            }} Tk
                        </p>

                        <button @click="cartStore.removeFromCart(item.id)"
                            class="text-red-500 hover:text-red-700 mt-2 transition font-medium">
                            <i class="pi pi-times"></i>
                        </button>
                    </div>
                </div>
            </template>
        </div>

        <!-- Footer Summary -->
        <div class="p-4 border-t border-gray-200 bg-white rounded-t-xl shadow-inner space-y-3">
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
                class="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl text-center font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                :class="{ 'opacity-50 cursor-not-allowed': !cartStore.items.length }" @click.prevent="goToCart">
                Checkout
            </router-link>
        </div>
    </div>

    <!-- Backdrop -->
    <div v-if="cartStore.isCartOpen" @click="cartStore.toggleCart(false)"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"></div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

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

const getImageUrl = (product) => {
    const prodImage = product.image?.trim();
    const catImage = product.category?.image?.trim();

    if (prodImage && !prodImage.includes("https://placehold.co") && !prodImage.includes("no-image.png")) {
        return { url: prodImage, type: 'product' };
    }
    else if (catImage && !catImage.includes("https://placehold.co") && !catImage.includes("no-image.png")) {
        return { url: catImage, type: 'category' };
    }
    else {
        return { url: "https://placehold.co/1920x1080", type: 'placeholder' };
    }
};
</script>

<style scoped>
.flex-1 {
    min-height: 0;
}
</style>
