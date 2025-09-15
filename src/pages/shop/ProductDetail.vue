<template>
    <section class="bg-gray-50 text-gray-800 space-y-12 px-4 md:px-8 lg:px-16 py-8">

        <!-- Section 1: Product Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
            <!-- Left: Product Image -->
            <div class="flex justify-center items-center">
                <img :src="product.image" :alt="product.name"
                    class="w-full max-w-md rounded-lg border border-gray-200" />
            </div>

            <!-- Right: Product Details -->
            <div class="flex flex-col justify-between space-y-4">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ product.name }}</h1>
                    <p class="text-sm text-gray-500 mt-1">Brand: <span class="font-medium">{{ product.brand }}</span></p>
                    <p class="text-sm text-gray-500">Category: <span class="font-medium">{{ product.category }}</span></p>

                    <!-- Price -->
                    <div class="flex items-center space-x-4 mt-3">
                        <p class="text-xl font-bold text-green-600">${{ product.offerPrice.toFixed(2) }}</p>
                        <p v-if="product.offerPrice < product.regularPrice" class="line-through text-gray-400">
                            ${{ product.regularPrice.toFixed(2) }}
                        </p>
                        <span v-if="product.offerPrice < product.regularPrice"
                              class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                            -{{ product.discountPercentage }}%
                        </span>
                    </div>

                    <div class="flex items-center justify-start gap-4">
                        <!-- Quantity Controls -->
                        <div class="flex items-center space-x-3 mt-4">
                            <button @click="decreaseQty"
                                class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-green-400 hover:text-white transition">-</button>
                            <span class="px-3 py-1 border border-gray-300 rounded">{{ quantity }}</span>
                            <button @click="increaseQty"
                                class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-green-400 hover:text-white transition">+</button>
                        </div>

                        <!-- Add to Cart -->
                        <button @click="addToCart"
                            class="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 2: Product Description & Dose -->
        <div class="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 class="text-xl font-semibold mb-4">Product Description</h2>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>

            <h3 class="text-lg font-semibold mb-2">Dose Details</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li v-for="(dose, index) in product.doses" :key="index">{{ dose }}</li>
            </ul>
        </div>

        <!-- Section 3: Alternative Products -->
        <div>
            <h2 v-if="alternativeProducts.length" class="text-xl font-semibold mb-4">
                Alternative Medicines ({{ alternativeProducts.length }})
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                 v-if="alternativeProducts.length > 0">
                <div v-for="alt in alternativeProducts" :key="alt.id" class="overflow-visible">
                    <ProductGridItem :product="alt" />
                </div>
            </div>
            <div v-else class="text-gray-500">No alternative products available.</div>
        </div>

    </section>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { useCartStore } from "@/stores/cart"
import { products } from "@/data/products"
import { usePush } from "notivue"

const route = useRoute()
const cartStore = useCartStore()
const push = usePush()

// Get current product by route param
const productId = Number(route.params.productId) || 1
const product = computed(() =>
    products.value.find((p) => p.id === productId)
)

// Alternative products (same generic but not the same product)
const alternativeProducts = computed(() => {
    if (!product.value) return []
    return products.value.filter(
        (p) => p.genericName === product.value.genericName && p.id !== product.value.id
    )
})

const quantity = ref(1)

const increaseQty = () => quantity.value++
const decreaseQty = () => {
    if (quantity.value > 1) quantity.value--
}

const addToCart = () => {
    if (!product.value) return
    cartStore.addToCart({
        ...product.value,
        quantity: quantity.value
    })
    quantity.value = 1
    // cartStore.toggleCart(true)
    push.success(`✅ ${product.value.name} added to cart!`)
}
</script>

<style scoped>
/* optional hover effects for alternative products */
</style>
