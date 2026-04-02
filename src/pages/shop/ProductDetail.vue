<template>
    <section v-if="productDetail" class="bg-gray-50 text-gray-800 space-y-12 px-0 md:px-8 lg:px-16 pt-6">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 rounded-lg shadow border border-gray-200 lg:p-6">
            
            <div class="relative w-full max-w-md aspect-[16/9] rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 md:from-gray-200 md:via-gray-300 md:to-gray-200">
                <img :src="defaultImagePlaceHolder.url" :alt="productDetail.name" loading="lazy" :class="[
                    'object-contain',
                    defaultImagePlaceHolder.type === 'category'
                        ? 'w-20 h-20 md:w-20 md:h-20'
                        : 'w-full h-auto md:w-full md:h-full'
                ]" />
            </div>

            <div class="flex flex-col justify-between space-y-6">
                <div>
                    <h1
                        class="text-xl md:text-xl lg:text-2xl xl:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        {{ productDetail.name }}
                    </h1>

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

                    <div class="flex items-center flex-wrap gap-3 mt-5">
                        <p class="text-2xl font-bold text-green-600" v-if="product.promotion_price < product.price && product.promotion_price !== null">
                            {{ product.promotion_price.toFixed(2) }} Tk
                        </p>

                        <p v-if="product.promotion_price < product.price" class="text-black-800 text-3xl font-bold" :class="product.promotion_price !== null ? 'line-through' : ''">
                            {{ product.price.toFixed(2) }} Tk
                        </p>

                        <span v-if="product.promotion_price < product.price && product.promotion_price !== null"
                            class="bg-green-50 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm border border-green-200">
                            -{{ product.discountPercentage }}%
                        </span>
                    </div>

                    <div class="flex flex-wrap items-center gap-4 mt-6">
                        <div
                            class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-sm">
                            
                            <button @click="decreaseQty" :disabled="quantity <= 1 || isStockOut"
                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                <i class="pi pi-minus"></i>
                            </button>

                            <input type="text" v-model.number="quantity" min="1"
                                class="w-16 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-none" />

                            <button @click="increaseQty" :disabled="isStockOut"
                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                <i class="pi pi-plus"></i>
                            </button>
                        </div>

                        <button @click="addToCart(productDetail)" :disabled="isStockOut"
                            class="flex-1 md:flex-none flex items-center justify-center whitespace-nowrap px-6 py-2 font-semibold text-white shadow-md transition-all duration-200 focus:ring-2 focus:ring-offset-1 rounded-full bg-green-600 hover:bg-green-700 focus:ring-green-400 disabled:bg-red-600 disabled:cursor-not-allowed disabled:hover:bg-red-700">
                            <span v-if="!isStockOut">Add to Cart</span>
                            <span v-else>❌ Unavailable</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Price Information Card -->
        <div v-if="productDetail && (productDetail.box_qty || productDetail.stripe_qty || productDetail.piece_qty)" class="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                    ৳
                </div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-800">{{ productDetail.name }} Price Information</h2>
            </div>
        
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <!-- Per Piece -->
                <div class="bg-[#eefcf2] border border-[#d1f4df] rounded-xl p-5 flex flex-col items-center justify-center text-center">
                    <div class="w-10 h-10 rounded-full bg-[#d1f4df] flex items-center justify-center mb-3">
                        <i class="pi pi-circle-fill text-green-600 text-sm"></i>
                    </div>
                    <span class="text-sm font-bold text-gray-800 mb-2">Per Piece</span>
                    <div class="text-2xl font-bold text-green-600 flex items-baseline justify-center">
                        ৳{{ formatPrice(piecePrice) }}<span class="text-sm font-medium text-green-700 ml-1">/unit</span>
                    </div>
                </div>
        
                <!-- Per Strip -->
                <div class="bg-[#f0f7ff] border border-[#dbeafe] rounded-xl p-5 flex flex-col items-center justify-center text-center">
                    <div class="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center mb-3">
                        <i class="pi pi-table text-blue-500 text-sm"></i>
                    </div>
                    <span class="text-sm font-bold text-gray-800 mb-2">Per Strip</span>
                    <div class="text-2xl font-bold text-blue-500">
                        ৳{{ formatPrice(stripPrice) }}
                    </div>
                </div>
        
                <!-- Per Pack -->
                <div class="bg-[#fdf4ff] border border-[#fae8ff] rounded-xl p-5 flex flex-col items-center justify-center text-center">
                    <div class="w-10 h-10 rounded-full bg-[#fae8ff] flex items-center justify-center mb-3">
                        <i class="pi pi-box text-purple-600 text-sm"></i>
                    </div>
                    <span class="text-sm font-bold text-gray-800 mb-2">Per Pack</span>
                    <div class="text-2xl font-bold text-purple-600">
                        ৳{{ formatPrice(packPrice) }}
                    </div>
                </div>
        
                <!-- Pack Size -->
                <div class="bg-[#fff7ed] border border-[#ffedd5] rounded-xl p-5 flex flex-col items-center justify-center text-center">
                    <div class="w-10 h-10 rounded-full bg-[#ffedd5] flex items-center justify-center mb-3">
                        <i class="pi pi-server text-orange-500 text-sm"></i>
                    </div>
                    <span class="text-sm font-bold text-gray-800 mb-2">Pack Size</span>
                    <div class="text-lg font-bold text-orange-600 leading-tight">
                        {{ productDetail.stripe_qty || 1 }} x {{ productDetail.piece_qty || 1 }}
                        <span class="block text-sm font-normal text-orange-800 mt-1">units/tablets</span>
                    </div>
                </div>
            </div>
        
            <!-- Note -->
            <div class="mt-6 bg-[#fffbeb] border border-[#fef3c7] rounded-lg p-3 flex items-start sm:items-center flex-col sm:flex-row gap-3 text-yellow-800 text-sm">
                <i class="pi pi-exclamation-triangle text-yellow-600 mt-1 sm:mt-0"></i>
                <span><strong>Note:</strong> Prices may vary. Contact pharmacy for latest prices.</span>
            </div>
        </div>

        <div v-if="product.description || product.doses" class="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 class="text-xl font-semibold mb-4">Product Description</h2>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>

            <h3 class="text-lg font-semibold mb-2">Dose Details</h3>
            <ul class="list-disc list-inside text-gray-700">
                <li v-for="(dose, index) in product.doses" :key="index">{{ dose }}</li>
            </ul>
        </div>

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

const formatPrice = (price) => {
    return Number(price) % 1 === 0 ? Number(price).toFixed(0) : Number(price).toFixed(2);
};

// Assuming the base price (product.price) is for the Box/Pack.
// If the base price is for a Piece instead, multiply instead of dividing.
const basePrice = computed(() => {
    if (!productDetail.value) return 0;
    return Number(productDetail.value.promotion_price ?? productDetail.value.price) || 0;
});

const packPrice = computed(() => basePrice.value);

const stripPrice = computed(() => {
    const sQty = Number(productDetail.value?.stripe_qty) || 1;
    return packPrice.value / sQty; 
});

const piecePrice = computed(() => {
    const pQty = Number(productDetail.value?.piece_qty) || 1;
    return stripPrice.value / pQty;
});

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

    // ✅ Meta Pixel AddToCart event
    if (typeof window.fbq === 'function') {
        window.fbq('track', 'AddToCart', {
            content_name: prod.name,
            content_ids: [String(prod.id)],
            content_type: 'product',
            value: Number(prod.promotion_price ?? prod.price) || 0
        });
    }

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
    console.log(productDetail.value);
    // Filter out the current product from related products
    alternativeProducts.value = related.filter(p => p.id !== productDetail.value.id);
}

onMounted(loadProduct);

// Refetch if route slug changes
watch(() => route.params.slug, loadProduct);
</script>
