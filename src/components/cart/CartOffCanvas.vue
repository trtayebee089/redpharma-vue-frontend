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
                <div
                    class="flex flex-col sm:flex-row justify-between bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 gap-3 sm:gap-4">
                    <!-- Left: Image -->
                    <div class="sm:w-15 flex-shrink-0">
                        <img v-if="getImageUrl(item)" :src="getImageUrl(item).url" alt="product"
                            class="hidden sm:block w-20 h-20 object-cover rounded-xl border border-gray-300 shadow-sm" />
                    </div>

                    <!-- Right: Details -->
                    <div class="flex-1 flex flex-col justify-between relative">
                        <!-- Row 1: Name, brand, unit price + remove button -->
                        <div class="flex justify-between items-start relative">
                            <div class="flex flex-col pr-10">
                                <p class="font-medium text-gray-800 text-sm truncate">{{ item.name }}</p>
                                <p class="text-sm text-gray-500 truncate" v-if="item.brand">{{ item.brand.title }}</p>
                                <p class="text-gray-600 text-sm mt-1">
                                    <span class="font-semibold text-gray-800">{{ (item.offerPrice ??
                                        item.price).toFixed(2) }} Tk</span>
                                    <span v-if="item.offerPrice" class="text-gray-400 line-through ml-1 text-xs">{{
                                        item.price.toFixed(2) }} Tk</span>
                                </p>
                            </div>

                            <!-- Remove Button -->
                            <button @click="cartStore.removeFromCart(item.id)"
                                class="absolute top-0 right-0 text-red-500 hover:text-red-700 transition font-medium">
                                <i class="pi pi-times"></i>
                            </button>
                        </div>

                        <!-- Row 2: Quantity controls + total price -->
                        <div
                            class="flex justify-between items-center mt-3 ">
                            <!-- Quantity Controls -->
                            <div class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-inner">
                                <button @click="decreaseQty(item)" :disabled="item.quantity <= 1 || item.isStockOut"
                                    class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all rounded-l-full disabled:text-gray-400 disabled:bg-gray-200">
                                    <i class="pi pi-minus text-xs"></i>
                                </button>

                                <input type="number" v-model.number="item.quantity" min="1"
                                    class="w-12 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all rounded-none text-xs sm:text-sm" />

                                <button @click="increaseQty(item)" :disabled="item.isStockOut"
                                    class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all rounded-r-full disabled:text-gray-400 disabled:bg-gray-200">
                                    <i class="pi pi-plus text-xs"></i>
                                </button>
                            </div>

                            <!-- Total Price -->
                            <p class="text-green-700 font-semibold text-sm px-3">
                                {{ ((Number(item.offerPrice ?? item.price) || 0) * (Number(item.quantity) ||
                                1)).toFixed(2) }} Tk
                            </p>
                        </div>
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
