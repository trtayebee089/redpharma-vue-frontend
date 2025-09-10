<template>
    <div class="bg-white rounded-lg hover:shadow-lg transition flex flex-col h-full relative border border-gray-300">
        <!-- Offer Badge (if available) -->
        <div v-if="product.offers"
            class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
            {{ product . offers }}
        </div>

        <!-- Product Image (Category Image) -->
        <img :src="categoryImage" alt=""
            class="w-full h-32 sm:h-36 md:h-40 object-contain rounded-t-lg bg-gray-200" />

        <!-- Content Below Image -->
        <div class="p-3 flex flex-col flex-1">
            <!-- Product Name -->
            <h3 class="font-medium text-gray-800 text-sm sm:text-base md:text-lg truncate">
                {{ product . name }}
            </h3>

            <!-- Brand Name -->
            <p class="text-xs sm:text-sm text-gray-500 mt-1">
                {{ product . brand }} | {{ categoryName }}
            </p>

            <!-- Strength & Pack Size -->
            <p class="text-xs sm:text-sm text-gray-600 mt-1">
                {{ product . strength }} | Pack: {{ product . packSize }}
            </p>

            <!-- Quantity & Add to Cart -->
            <button @click="addToCart" class="btn-add-to-cart w-full sm:w-auto mt-6">
                Add to Cart
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

    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    });

    const quantity = ref(1);
    const cartStore = useCartStore();

    const decreaseQty = () => {
        if (quantity.value > 1) quantity.value--;
    };
    const increaseQty = () => {
        quantity.value++;
    };
    const addToCart = () => {
        cartStore.addToCart({
            ...props.product,
            quantity: quantity.value
        });
        quantity.value = 1;
    };

    // Category name from categoryId
    const categoryName = computed(() => {
        const cat = categories.find(c => c.id === props.product.categoryId);
        return cat ? cat.name : "Unknown";
    });

    // Category image from categoryId
    const categoryImage = computed(() => {
        const cat = categories.find(c => c.id === props.product.categoryId);
        return cat && cat.image ? cat.image : props.product.image;
    });
</script>

<style scoped>
    .btn-add-to-cart {
        border-radius: 30px;
        font-family: Inter, sans-serif;
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: -0.2px;
        line-height: 1.5rem;
        padding: 8px 20px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        background-color: #22c55e;
        /* Tailwind green-500 */
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .btn-add-to-cart:hover {
        background-color: #16a34a;
        /* Tailwind green-600 */
        transform: translateY(-2px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }

    .btn-add-to-cart::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.4s ease, height 0.4s ease;
        z-index: 0;
    }

    .btn-add-to-cart:hover::after {
        width: 200%;
        height: 500%;
    }

    .btn-add-to-cart>* {
        position: relative;
        z-index: 1;
    }
</style>
