<template>
    <div class="relative w-full" :class="customClass">
        <input type="text" v-model="searchQuery" :placeholder="placeholderText" class="w-full search-input" />

        <div v-if="searchQuery && filteredProducts.length"
            class="absolute top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-[60vh] overflow-y-auto w-full">
            <ul>
                <li v-for="product in filteredProducts" :key="product.id"
                    class="px-4 py-3 hover:bg-gray-50 flex justify-between items-center gap-3">
                    <div class="flex-1">
                        <p class="font-medium text-gray-800">{{ product . name }}</p>
                        <p class="text-sm text-gray-600">
                            Brand: {{ product . brand }} | Category: {{ getCategoryName(product . categoryId) }}
                        </p>
                        <p class="text-sm font-semibold text-green-600 mt-1">
                            ${{ product . regularPrice . toFixed(2) }}
                        </p>
                    </div>

                    <button @click="$emit('add-to-cart', product)"
                        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Add to Cart
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        computed
    } from 'vue'
    import {
        products
    } from '@/data/products.js'
    import {
        categories
    } from '@/data/categories.js'

    const props = defineProps({
        placeholderText: {
            type: String,
            default: 'Search products...'
        },
        customClass: {
            type: String,
            default: ''
        }
    })

    const searchQuery = ref('x')

    const filteredProducts = computed(() => {
        if (!searchQuery.value || !products.value) return []
        const q = searchQuery.value.toLowerCase()
        return products.value.filter(
            p => p.name.toLowerCase().includes(q) || (p.brand && p.brand.toLowerCase().includes(q))
        )
    })

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId)
        return category ? category.name : 'Unknown'
    }
</script>

<style scoped>
    .search-input {
        border: 1px solid #22c55e;
        border-radius: 0.45rem;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        font-weight: 600;
        outline: none;
    }

    .search-input:focus {
        border-color: #16a34a;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
    }
</style>
