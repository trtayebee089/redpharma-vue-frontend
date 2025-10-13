<template>
    <div class="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full relative border border-gray-200">
        <!-- Offer Badge -->
        <div v-if="product.offers && !isStockOut"
            class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
            {{ product.promotion_price }}
        </div>

        <!-- Stock Out Badge -->
        <div v-if="isStockOut"
            class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold z-10"
            style="top: 0; border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
            Stock Out
        </div>

        <!-- Product Image -->
        <router-link :to="`/products/${product.slug}`" :class="[
            'hover:underline block',
            defaultImagePlaceHolder.type === 'category'
                ? 'min-h-[142px] overflow-hidden bg-[#f1f1f1] rounded-t-lg flex items-center justify-center text-center'
                : ''
        ]">
            <img :src="defaultImagePlaceHolder.url" :alt="product.name" loading="lazy" :class="[
                'w-full rounded-t-lg',
                defaultImagePlaceHolder.type === 'category'
                    ? 'h-20 object-contain'
                    : 'h-32 sm:h-36 md:h-40 object-contain'
            ]" />
        </router-link>



        <!-- Card Content -->
        <div class="p-3 flex flex-col flex-1">
            <!-- Name -->
            <router-link :to="`/products/${product.slug}`" class="hover:underline">
                <h5 class="font-medium text-gray-800 text-sm sm:text-base md:text-md truncate">
                    {{ product.name }}
                </h5>
            </router-link>

            <!-- Brand + Category -->
            <p class="text-xs sm:text-sm text-gray-500 mt-1">
                <span class="font-medium">{{ capitalizeWords(product?.brand?.title) }}</span>
            </p>

            <!-- Strength + Pack -->
            <p class="text-xs sm:text-sm text-gray-600 mt-1" v-if="product.strength && product.packSize">
                {{ product.strength }} | Pack: {{ product.packSize }}
            </p>

            <!-- Price -->
            <div class="mt-2">
                <span v-if="product.offerPrice" class="text-green-700 font-semibold text-lg">
                    {{ product.offerPrice.toFixed(2) }} Tk
                </span>
                <span v-if="product.offerPrice" class="text-red-500 line-through ml-2">
                    {{ product.price.toFixed(2) }} Tk
                </span>
                <span v-else class="text-gray-800 font-semibold text-lg">
                    {{ product.price.toFixed(2) }} Tk
                </span>
            </div>

            <!-- Add to Cart -->
            <button @click="addToCart(product)" :disabled="isStockOut" :class="[
                'btn-add-to-cart w-full sm:w-auto mt-4 flex items-center justify-center ',
                isStockOut ? 'opacity-50 cursor-not-allowed stock-out' : ''
            ]">
                <span class="hidden md:inline">Add to Cart</span> <!-- visible ≥768px -->
                <span class="inline md:hidden">Add</span> <!-- visible <768px -->
            </button>

        </div>
    </div>
</template>


<script setup>
import {
    ref,
    computed
} from "vue";
import {
    useCartStore
} from "@/stores/cart";
import {
    categories
} from "@/data/categories.js";
import {
    usePush
} from "notivue"

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const defaultImagePlaceHolder = computed(() => {
    const prodImage = props.product.image?.trim();
    const catImage = props.product.category?.image?.trim();

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

const quantity = ref(1);
const cartStore = useCartStore();
const push = usePush()

const isStockOut = computed(() => {
    return !props.product?.qty || props.product.qty <= 0 || props.product.price <= 0;
});

const addToCart = () => {
    cartStore.addToCart({
        ...props.product,
        quantity: quantity.value
    });
    quantity.value = 1;
    push.success(`${props.product.name} added to cart!`)
};

function capitalizeWords(string) {
    if (!string) return "Unknown";
    return string.split(' ').map(word => {
        if (!word) return ""; // Handle potential empty strings from multiple spaces
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}
</script>


<style scoped></style>
