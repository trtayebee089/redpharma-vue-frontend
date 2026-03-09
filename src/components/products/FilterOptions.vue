<template>
    <div class="p-4 bg-white rounded-lg shadow w-full transform transition-transform duration-300">
        <h2 class="font-semibold mb-3 text-gray-700">Filter by</h2>

        <div class="mb-4">
            <label class="block mb-1 text-gray-600">Max Price</label>
            <input type="number" v-model.number="maxPrice" placeholder="0"
                class="w-full border border-gray-300 px-3 py-2 rounded" />
        </div>

        <div class="mb-4">
            <label class="block mb-1 text-gray-600">Brand</label>
            <select v-model="selectedBrand" class="w-full border border-gray-300 px-3 py-2 rounded">
                <option value="">All Brands</option>
                <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}
                </option>
            </select>
        </div>

        <div class="mb-4">
            <h3 class="block mb-1 text-gray-600">Availability</h3>
            <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="inStockOnly" class="form-checkbox" />
                <span>In Stock Only</span>
            </label>
        </div>

        <div class="mb-4">
            <h3 class="block mb-1 text-gray-600">Rating</h3>
            <div class="flex flex-col space-y-1">
                <label v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center space-x-2">
                    <input type="radio" v-model="minRating" :value="star" class="form-radio" />
                    <span>{{ star }} stars & up</span>
                </label>
            </div>
        </div>
        <button @click="resetFilters"
            class="mt-2 w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
            Reset Filters
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
        maxPrice: Number,
        selectedBrand: String,
        inStockOnly: Boolean,
        minRating: Number,
        brands: Array
    })

    const emit = defineEmits(['update:maxPrice', 'update:selectedBrand', 'update:inStockOnly', 'update:minRating',
        'resetFilters'
    ])

    const maxPrice = defineModel('maxPrice')
    const selectedBrand = defineModel('selectedBrand')
    const inStockOnly = defineModel('inStockOnly')
    const minRating = defineModel('minRating')

    function resetFilters() {
        emit('resetFilters')
    }
</script>
