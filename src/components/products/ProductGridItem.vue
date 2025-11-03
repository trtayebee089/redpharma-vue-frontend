<template>
    <div
        class="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full relative border border-gray-200">
        <div v-if="product.offers && !isStockOut"
            class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
            {{ product.promotion_price }}
        </div>

        <div v-if="isStockOut"
            class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold z-10"
            style="top: 0; border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
            Stock Out
        </div>

        <router-link :to="`/products/${product.slug}`" class="block relative bg-[#f9f9f9] rounded-t-lg overflow-hidden">
            <div class="h-40 sm:h-44 md:h-48 flex items-center justify-center relative">
                <div v-if="loading" class="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <img :src="defaultImagePlaceHolder.url" :alt="product.name" loading="lazy" @load="onLoad"
                    class="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105" />
            </div>
        </router-link>

        <div class="p-3 flex flex-col flex-1">
            <router-link :to="`/products/${product.slug}`" class="hover:underline">
                <h5 class="font-medium text-gray-800 text-sm sm:text-base md:text-md truncate">
                    {{ product.name }}
                </h5>
            </router-link>

            <p class="text-xs sm:text-sm text-gray-500 mt-1 truncate w-full">
                <span class="font-medium whitespace-nowrap">
                    {{ capitalizeWords(product?.brand?.title) }}
                </span>
            </p>

            <p class="text-xs sm:text-sm text-gray-600 mt-1" v-if="product.strength && product.packSize">
                {{ product.strength }} | Pack: {{ product.packSize }}
            </p>

            <div class="mt-2 flex items-center justify-between">
                <div>
                    <span v-if="product.promotion_price" class="text-green-700 font-semibold text-lg">
                        {{ product.promotion_price.toFixed(2) }} Tk
                        <span v-if="product.unit" class="text-gray-500 text-[13px] font-normal align-baseline">/ {{
                            product.unit.unit_code }}</span>
                    </span>
                    <span v-if="product.promotion_price" class="text-red-500 line-through ml-2 text-sm">
                        {{ product.price.toFixed(2) }} Tk
                    </span>
                    <p v-else class="text-gray-800 font-semibold text-lg m-0">
                        {{ product.price.toFixed(2) }} Tk
                        <span v-if="product.unit" class="text-gray-500 text-[13px] font-normal align-baseline">/ {{
                            product.unit.unit_code }}</span>
                    </p>
                </div>

                <div class="ml-2">
                    <button v-if="!showQuantityControls" @click="handleAddToCart" :disabled="isStockOut" :class="[
                        'flex items-center justify-center w-9 h-9 rounded-full transition text-white shadow-md',
                        isStockOut
                            ? 'bg-gray-400 cursor-not-allowed opacity-60'
                            : 'bg-green-600 hover:bg-green-700'
                    ]">
                        <i class="pi pi-cart-plus"></i>
                    </button>

                    <div v-else
                        class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-sm">
                        <button @click="decreaseQty" :disabled="quantity <= 1 || isStockOut"
                            class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                            <i class="pi pi-minus"></i>
                        </button>

                        <div
                            class="w-10 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300">
                            {{ quantity }}
                        </div>

                        <button @click="increaseQty" :disabled="isStockOut"
                            class="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                            <i class="pi pi-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useCartStore } from "@/stores/cart";
import { usePush } from "notivue";

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const loading = ref(true)

const cartStore = useCartStore();
const push = usePush();

const quantity = ref(1);
const showQuantityControls = ref(false);

watch(
    () => props.product.image,
    () => {
        loading.value = true
    }
)

const defaultImagePlaceHolder = computed(() => {
    const prodImage = props.product.image?.trim()
    const catImage = props.product.category?.image?.trim()

    if (prodImage && !prodImage.includes("https://placehold.co") && !prodImage.includes("no-image.png")) {
        return { url: prodImage, type: "product" }
    } else if (catImage && !catImage.includes("https://placehold.co") && !catImage.includes("no-image.png")) {
        return { url: catImage, type: "category" }
    } else {
        return { url: "https://placehold.co/1920x1080", type: "placeholder" }
    }
})

function onLoad() {
    loading.value = false
}

const isStockOut = computed(() => {
    return !props.product?.qty || props.product.qty <= 0 || props.product.price <= 0;
});

const handleAddToCart = () => {
    cartStore.addToCart({ ...props.product, quantity: quantity.value });
    showQuantityControls.value = true;
    push.success(`${props.product.name} added to cart!`);
};

const increaseQty = () => {
    quantity.value++;
    cartStore.updateQuantity(props.product.id, quantity.value);
};

const decreaseQty = () => {
    if (quantity.value > 1) {
        quantity.value--;
        cartStore.updateQuantity(props.product.id, quantity.value);
    } else {
        showQuantityControls.value = false;
        cartStore.removeFromCart(props.product.id);
        push.info(`${props.product.name} removed from cart.`);
    }
};

function capitalizeWords(string) {
    if (!string) return "Unknown";
    return string
        .split(" ")
        .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""))
        .join(" ");
}
</script>

<style scoped>
.shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
</style>