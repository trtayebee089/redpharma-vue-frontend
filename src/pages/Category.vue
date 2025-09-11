<template>
    <div class="my-16 relative leading-relaxed">
        <!-- Category Header Section -->
        <section class="bg-gray-50 py-6 md:px-8 rounded-lg shadow-sm mb-8 border border-gray-200">
            <div class="mx-auto">
                <!-- Breadcrumb -->
                <nav class="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
                    <ol class="list-reset flex space-x-2">
                        <li>
                            <router-link to="/" class="hover:text-green-600">Home</router-link>
                            <span class="mx-2">/</span>
                        </li>
                        <li>
                            <router-link to="/shop" class="hover:text-green-600">Shop</router-link>
                            <span class="mx-2">/</span>
                        </li>
                        <li>
                            <router-link to="/shop" class="hover:text-green-600">Category</router-link>
                            <span class="mx-2">/</span>
                        </li>
                        <li class="text-gray-800 font-semibold">{{ category?.name || "Category" }}</li>
                    </ol>
                </nav>

                <!-- Title and Description -->
                <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                        {{ category?.name || "Category" }}
                    </h1>
                    
                    <!-- Optional: Product count or category tagline -->
                    <p class="text-gray-600 text-sm md:text-base">
                        Showing {{ filteredProducts.length }} products in "{{ category?.name || 'this category' }}"
                    </p>
                </div>

                <!-- Optional: Category description -->
                <p v-if="category?.description" class="mt-3 text-gray-700 text-sm md:text-base max-w-3xl">
                    {{ category.description }}
                </p>
            </div>
        </section>


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
                    class="mt-2 w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
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
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
import ProductGridItem from "../components/products/ProductGridItem.vue";

const route = useRoute();

// Reactive states
const slug = ref(route.params.slug);
const category = ref(categories.find(cat => cat.slug === slug.value));

// Filters
const maxPrice = ref(null);
const selectedBrand = ref("");
const inStockOnly = ref(false);
const minRating = ref(null);
const sortOption = ref("default");

// Brand list
const brands = ["Pfizer", "GSK", "Novartis", "Roche", "Sanofi"];

// Reset filters
function resetFilters() {
  maxPrice.value = null;
  selectedBrand.value = "";
  inStockOnly.value = false;
  minRating.value = null;
}

// Watch route changes
watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = newSlug;
    category.value = categories.find(cat => cat.slug === newSlug);

    // Optional: reset filters when switching categories
    resetFilters();
  }
);

// Filtered products
const filteredProducts = computed(() => {
  let filtered = products.filter(p => p.categoryId === category.value?.id);

  if (maxPrice.value != null && maxPrice.value > 0) {
    filtered = filtered.filter(p => p.price <= maxPrice.value);
  }

  // Add brand filter
  if (selectedBrand.value) {
    filtered = filtered.filter(p => p.brand === selectedBrand.value);
  }

  // In stock filter
  if (inStockOnly.value) {
    filtered = filtered.filter(p => p.inStock === true);
  }

  // Min rating filter
  if (minRating.value != null) {
    filtered = filtered.filter(p => p.rating >= minRating.value);
  }

  // Sorting
  if (sortOption.value === "priceAsc") filtered.sort((a, b) => a.price - b.price);
  else if (sortOption.value === "priceDesc") filtered.sort((a, b) => b.price - a.price);
  else if (sortOption.value === "nameAsc") filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortOption.value === "nameDesc") filtered.sort((a, b) => b.name.localeCompare(a.name));

  return filtered;
});
</script>

<style scoped>
/* Add any extra styling if needed */
</style>
