<template>
    <div
        class="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full relative border border-gray-200">
        <!-- Offer Badge -->
        <div v-if="product.offers"
            class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
            {{ product . offers }}
        </div>

        <!-- Product Image -->
        <img :src="product.image" :alt="product.name"
            class="w-full h-32 sm:h-36 md:h-40 object-contain rounded-t-lg bg-gray-50" />

        <!-- Card Content -->
        <div class="p-3 flex flex-col flex-1">
            <!-- Name -->
            <router-link :to="`/products/${product.id}`" class="hover:underline">
                <h3 class="font-medium text-gray-800 text-sm sm:text-base md:text-lg truncate">
                    {{ product . name }}
                </h3>
            </router-link>

            <!-- Brand + Category -->
            <p class="text-xs sm:text-sm text-gray-500 mt-1">
                Brand: <span class="font-medium">{{ product . brand }}</span>
                <span v-if="categoryName"> | {{ categoryName }}</span>
            </p>

            <!-- Strength + Pack -->
            <p class="text-xs sm:text-sm text-gray-600 mt-1">
                {{ product . strength }} | Pack: {{ product . packSize }}
            </p>

            <!-- Price -->
            <div class="mt-2">
                <span v-if="product.offerPrice" class="text-green-700 font-semibold text-lg">
                    ${{ product . offerPrice . toFixed(2) }}
                </span>
                <span v-if="product.offerPrice" class="text-red-500 line-through ml-2">
                    ${{ product . regularPrice . toFixed(2) }}
                </span>
                <span v-else class="text-gray-800 font-semibold text-lg">
                    ${{ product . price . toFixed(2) }}
                </span>
            </div>

            <!-- Add to Cart -->
            <button @click="addToCart(product)"
                class="btn-add-to-cart w-full sm:w-auto mt-4 flex items-center justify-center">
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

    const quantity = ref(1);
    const cartStore = useCartStore();
    const push = usePush()

    const addToCart = () => {
        cartStore.addToCart({
            ...props.product,
            quantity: quantity.value
        });
        quantity.value = 1;

        // cartStore.toggleCart(true);
        push.success(`${props.product.name} added to cart!`)
    };

    const categoryName = computed(() => {
        const cat = categories.find(c => c.id === props.product.categoryId);
        return cat ? cat.name : "Unknown";
    });

    const categoryImage = computed(() => {
        const cat = categories.find(c => c.id === props.product.categoryId);
        return cat && cat.image ? cat.image : props.product.image;
    });
</script>


<style scoped>

</style>
