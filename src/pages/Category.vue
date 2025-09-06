<template>
    <div class="container mx-auto px-4 md:px-6 mt-8 pt-30">
        <!-- Page Title -->
        <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            Category: {{ category?.name || "Category" }}
        </h1>

        <div class="flex flex-col md:flex-row gap-6">
            <!-- Sidebar -->
            <aside class="w-full md:w-64 p-4 bg-white rounded-lg shadow">
                <h2 class="font-semibold mb-3 text-gray-700">Filter by</h2>

                <!-- Price Filter -->
                <div class="mb-4">
                    <label class="block mb-1 text-gray-600">Max Price</label>
                    <input type="number" v-model.number="maxPrice" placeholder="0"
                        class="w-full border px-3 py-2 rounded" />
                </div>

                <!-- Brand Filter -->
                <div class="mb-4">
                    <label class="block mb-1 text-gray-600">Brand</label>
                    <select v-model="selectedBrand" class="w-full border px-3 py-2 rounded">
                        <option value="">All Brands</option>
                        <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                    </select>
                </div>

                <!-- Availability Filter -->
                <div class="mb-4">
                    <h3 class="block mb-1 text-gray-600">Availability</h3>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" v-model="inStockOnly" class="form-checkbox" />
                        <span>In Stock Only</span>
                    </label>
                </div>

                <!-- Rating Filter -->
                <div class="mb-4">
                    <h3 class="block mb-1 text-gray-600">Rating</h3>
                    <div class="flex flex-col space-y-1">
                        <label v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center space-x-2">
                            <input type="radio" v-model="minRating" :value="star" class="form-radio" />
                            <span>{{ star }} stars & up</span>
                        </label>
                    </div>
                </div>

                <!-- Reset Filters -->
                <button @click="resetFilters"
                    class="mt-2 w-full px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition">
                    Reset Filters
                </button>
            </aside>


            <!-- Main Content -->
            <div class="flex-1">
                <!-- Sort By -->
                <div class="flex justify-end mb-4">
                    <select v-model="sortOption" class="border px-3 py-2 rounded">
                        <option value="default">Sort By</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                        <option value="nameAsc">Name: A to Z</option>
                        <option value="nameDesc">Name: Z to A</option>
                    </select>
                </div>

                <!-- Products Grid -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <ProductGridItem v-for="product in filteredProducts" :key="product.id" :product="product" />
                </div>

                <!-- No products -->
                <p v-if="filteredProducts.length === 0" class="mt-4 text-gray-600">
                    No products found in this category.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
import ProductGridItem from "../components/ProductGridItem.vue";

const route = useRoute();
const slug = route.params.slug;

// Find the category
const category = categories.find(cat => cat.slug === slug);

// Filter and sort
const maxPrice = ref(null);
const selectedBrand = ref("");
const inStockOnly = ref(false);
const minRating = ref(null);

// Example brand list (you can generate from products dynamically)
const brands = ["Pfizer", "GSK", "Novartis", "Roche", "Sanofi"];

// Reset filters function
function resetFilters() {
  maxPrice.value = null;
  selectedBrand.value = "";
  inStockOnly.value = false;
  minRating.value = null;
}
const sortOption = ref("default");

const filteredProducts = computed(() => {
    let filtered = products.filter(p => p.categoryId === category?.id);

    // Apply max price filter
    if (maxPrice.value != null && maxPrice.value > 0) {
        filtered = filtered.filter(p => p.price <= maxPrice.value);
    }

    // Apply sorting
    if (sortOption.value === "priceAsc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption.value === "priceDesc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption.value === "nameAsc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption.value === "nameDesc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
});

console.log("slug:", slug);
console.log("category:", category);
console.log("filtered products:", filteredProducts.value);
</script>

<style scoped>
/* Add any extra styling if needed */
</style>
