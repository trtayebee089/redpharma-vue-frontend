<template>
    <section v-if="productDetail" class="bg-gray-50 text-gray-800 space-y-12 px-4 md:px-8 lg:px-16 pt-6">

        <!-- Section 1: Product Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow border border-gray-200">
            <!-- Left: Product Image -->
            <div class="flex justify-center items-center">
                <img :src="product.image" :alt="product.name"
                    class="w-full max-w-md rounded-lg border border-gray-200" />
            </div>

            <!-- Right: Product Details -->
            <div class="flex flex-col justify-between space-y-4">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ productDetail.name }}</h1>
                    <p class="text-sm text-gray-500 mt-1" v-if="productDetail.brand">Brand: <span class="font-medium">{{
                        productDetail.brand.title }}</span></p>
                    <p class="text-sm text-gray-500" v-if="productDetail.category">
                        Category: <span class="font-medium">{{ fullCategoryName }}</span>
                    </p>

                    <!-- Price -->
                    <div class="flex items-center space-x-4 mt-3">
                        <p class="text-xl font-bold text-green-600" v-if="product.offerPrice">${{
                            product.offerPrice.toFixed(2) }}</p>
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
                        <div class="inline-flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                            <button @click="decreaseQty" :disabled="quantity <= 1 || isStockOut"
                                class="w-10 h-10 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-red-600 hover:text-white rounded border border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition">
                                -
                            </button>

                            <span class="w-10 h-10 flex items-center justify-center text-gray-800 font-medium">
                                {{ quantity }}
                            </span>

                            <button @click="increaseQty" :disabled="isStockOut"
                                class="w-10 h-10 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-green-600 hover:text-white rounded border border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition">
                                +
                            </button>
                        </div>

                        <!-- Add to Cart -->
                        <button @click="addToCart(productDetail)" :disabled="isStockOut"
                            :class="[
                                'px-6 py-2 font-semibold rounded transition text-white',
                                isStockOut ? 'bg-red-600 cursor-not-allowed hover:bg-red-700 ' : 'bg-green-600 hover:bg-green-700 '
                            ]"
                        >
                            <span v-if="!isStockOut">Add to Cart</span>
                            <span v-else>Unavailable</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 2: Product Description & Dose -->
        <div v-if="product.description || product.doses" class="bg-white p-6 rounded-lg shadow border border-gray-200">
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
                Related Medicines ({{ alternativeProducts.length }})
            </h2>

            <div v-if="alternativeProducts.length"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="alt in alternativeProducts" :key="alt.id" class="overflow-visible">
                    <ProductGridItem :product="alt" />
                </div>
            </div>

            <div v-else class="text-gray-500">No alternative products available.</div>
        </div>

    </section>

    <div v-else class="flex justify-center items-center min-h-[300px]">
        <svg class="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
            </path>
        </svg>
    </div>
</template>


<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { usePush } from "notivue";
import { useProducts } from "@/composables/useProducts";
import ProductGridItem from "../../components/products/ProductGridItem.vue";

const route = useRoute();
const { product, fetchProductDetails } = useProducts();
const productDetail = ref(null);

const defaultImagePlaceHolder = 'https://placehold.co/1920x1080';
const cartStore = useCartStore();
const push = usePush();
const alternativeProducts = ref([]);
const quantity = ref(1);

const isStockOut = computed(() => {
    if (!productDetail.value) return false;
    return !productDetail.value.qty || productDetail.value.qty <= 0 || productDetail.value.price <= 0;
});

const increaseQty = () => {
    quantity.value += 1;
    console.log("QTY+ : " + quantity.value);
};

const decreaseQty = () => {
    if (quantity.value > 1) quantity.value -= 1;
    console.log("QTY- : " + quantity.value);
};

const addToCart = (prod) => {
    cartStore.addToCart({
        ...prod,
        quantity: quantity.value
    });
    push.success(`${prod.name} added to cart!`);
    quantity.value = 1;
};

const fullCategoryName = computed(() => {
    if (!productDetail.value?.category) return "";
    const cat = productDetail.value.category;
    return cat.parent ? `${cat.parent.name} > ${cat.name}` : cat.name;
});

// Fetch product based on slug in URL
async function loadProduct() {
    const slug = route.params.slug;
    const related = await fetchProductDetails(slug);
    productDetail.value = product.value;

    // Filter out the current product from related products
    alternativeProducts.value = related.filter(p => p.id !== productDetail.value.id);
}

onMounted(loadProduct);

// Refetch if route slug changes
watch(() => route.params.slug, loadProduct);
</script>
