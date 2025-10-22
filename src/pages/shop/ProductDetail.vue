<template>
    <section v-if="productDetail" class="bg-gray-50 text-gray-800 space-y-12 px-0 md:px-8 lg:px-16 pt-6">

        <!-- Section 1: Product Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 rounded-lg shadow border border-gray-200 lg:p-6">
            <!-- Left: Product Image -->
            <div class="relative w-full max-w-md aspect-[16/9] rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 md:from-gray-200 md:via-gray-300 md:to-gray-200">
                <img :src="defaultImagePlaceHolder.url" :alt="productDetail.name" loading="lazy" :class="[
                    'object-contain',
                    defaultImagePlaceHolder.type === 'category'
                        ? 'w-20 h-20 md:w-20 md:h-20'
                        : 'w-full h-auto md:w-full md:h-full'
                ]" />
            </div>

            <!-- Right: Product Details -->
            <div class="flex flex-col justify-between space-y-6">
                <!-- Product Info -->
                <div>
                    <!-- Name -->
                    <h1
                        class="text-xl md:text-xl lg:text-2xl xl:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        {{ productDetail.name }}
                    </h1>

                    <!-- Brand & Category -->
                    <div class="mt-2 space-y-1">
                        <p v-if="productDetail.brand" class="text-sm text-gray-600">
                            <span class="font-medium text-gray-800">Brand:</span>
                            {{ productDetail.brand.title }}
                        </p>
                        <p v-if="productDetail.category" class="text-sm text-gray-600">
                            <span class="font-medium text-gray-800">Category:</span>
                            {{ fullCategoryName }}
                        </p>
                    </div>

                    <!-- Price Section -->
                    <div class="flex items-center flex-wrap gap-3 mt-5">
                        <p class="text-2xl font-bold text-green-600" v-if="product.offerPrice">
                            ${{ product.offerPrice.toFixed(2) }}
                        </p>

                        <p v-if="product.offerPrice < product.regularPrice" class="text-gray-400 line-through text-lg">
                            ${{ product.regularPrice.toFixed(2) }}
                        </p>

                        <span v-if="product.offerPrice < product.regularPrice"
                            class="bg-green-50 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm border border-green-200">
                            -{{ product.discountPercentage }}%
                        </span>
                    </div>

                    <div class="flex flex-wrap items-center gap-4 mt-6">
                        <!-- Quantity Controls -->
                        <div
                            class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-sm">
                            <!-- Decrease -->
                            <button @click="decreaseQty" :disabled="quantity <= 1 || isStockOut"
                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                <i class="pi pi-minus"></i>
                            </button>

                            <!-- Quantity Input -->
                            <input type="number" v-model.number="quantity" min="1"
                                class="w-16 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-none" />

                            <!-- Increase -->
                            <button @click="increaseQty" :disabled="isStockOut"
                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                <i class="pi pi-plus"></i>
                            </button>
                        </div>

                        <!-- Add to Cart -->
                        <button @click="addToCart(productDetail)" :disabled="isStockOut"
                            class="flex-1 md:flex-none flex items-center justify-center whitespace-nowrap px-6 py-2 font-semibold text-white shadow-md transition-all duration-200 focus:ring-2 focus:ring-offset-1 rounded-full bg-green-600 hover:bg-green-700 focus:ring-green-400 disabled:bg-red-600 disabled:cursor-not-allowed disabled:hover:bg-red-700">
                            <span v-if="!isStockOut">Add to Cart</span>
                            <span v-else>❌ Unavailable</span>
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
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

const BASE_URL = "http://127.0.0.1:8000";
const route = useRoute();
const { product, fetchProductDetails } = useProducts();
const productDetail = ref(null);

const cartStore = useCartStore();
const push = usePush();
const alternativeProducts = ref([]);
const quantity = ref(1);

const defaultImagePlaceHolder = computed(() => {
    const prodImage = product.value.image?.trim();
    const catImage = product.value.category?.image?.trim();

    const normalizeUrl = (url) => {
        if (url.startsWith('http')) return url;
        return BASE_URL + url;
    }

    if (prodImage && !prodImage.includes("https://placehold.co") && !prodImage.includes("no-image.png")) {
        return { url: prodImage, type: 'product' };
    }
    else if (catImage && !catImage.includes("https://placehold.co") && !catImage.includes("no-image.png")) {
        return { url: catImage, type: 'category' };
    }
    else {
        return { url: "https://placehold.co/1920x1080", type: 'placeholder' };
    }
});

const isStockOut = computed(() => {
    if (!productDetail.value) return false;
    return !productDetail.value.qty || productDetail.value.qty <= 0 || productDetail.value.price <= 0;
});

const increaseQty = () => { quantity.value += 1; };

const decreaseQty = () => { if (quantity.value > 1) quantity.value -= 1; };

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
