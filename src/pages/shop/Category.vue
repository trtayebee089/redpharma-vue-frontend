<template>
  <div>
    <!-- Breadcrumb & Header -->
    <section class="relative fade-up">
      <div
        class="rounded-xl overflow-hidden border border-green-100 shadow-sm p-5"
      >
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
          <ol class="list-reset flex space-x-2">
            <li>
              <router-link to="/" class="hover:text-green-600"
                >Home</router-link
              >
              <span class="mx-2">/</span>
            </li>
            <li>
              <span class="hover:text-green-600">Category</span>
              <span class="mx-2">/</span>
            </li>
            <li class="text-gray-800 font-semibold">
              {{ category?.name || "Category" }}
            </li>
          </ol>
        </nav>

        <!-- Title and Description -->
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center"
        >
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
            {{ category?.name || "Category" }}
          </h1>
          <p class="text-gray-600 text-sm md:text-base">
            Showing {{ filteredProducts.length }} products in "{{
              category?.name || "this category"
            }}"
          </p>
        </div>

        <p
          v-if="category?.description"
          class="mt-3 text-gray-700 text-sm md:text-base max-w-3xl"
        >
          {{ category.description }}
        </p>
      </div>
    </section>

    <!-- Layout -->
    <section class="relative fade-up flex flex-col md:flex-row gap-6 mt-10">
      <!-- Sidebar (Desktop only) -->
      <aside class="hidden md:block w-64 p-4 bg-white rounded-lg shadow">
        <FilterOptions
          :max-price="maxPrice"
          :selected-brand="selectedBrand"
          :in-stock-only="inStockOnly"
          :min-rating="minRating"
          @reset="resetFilters"
        />
      </aside>

      <!-- Main Content -->
      <div class="flex-1">
        <!-- Mobile -->
        <div class="flex md:hidden justify-between items-center mb-4 space-x-2">
          <!-- Filter button -->
          <button
            @click="showFilters = true"
            class="flex-1 px-4 py-2 bg-green-700 text-white rounded"
          >
            Filter
          </button>

          <!-- Sort dropdown -->
          <select v-model="sortOption" class="flex-1 border px-3 py-2 rounded">
            <option value="default">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductGridItem
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- No products -->
        <p v-if="filteredProducts.length === 0" class="mt-4 text-gray-600">
          No products found in this category.
        </p>
      </div>
    </section>

    <!-- Mobile Filter Modal -->
    <transition name="slide-fade">
    <div
      v-if="showFilters"
      class="fixed inset-0 z-50 bg-black/60 bg-opacity-50 flex justify-start"
      @click="showFilters = false"
    >
      <div class="bg-white w-3/4 max-w-xs p-6 shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Filters</h2>
          <button
            @click="showFilters = false"
            class="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <FilterOptions
          :max-price="maxPrice"
          :selected-brand="selectedBrand"
          :in-stock-only="inStockOnly"
          :min-rating="minRating"
          @reset="resetFilters"
        />
        <button
          @click="showFilters = false"
          class="mt-4 w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { products } from "@/data/products.js";
import { categories } from "@/data/categories.js";
import ProductGridItem from "@/components/products/ProductGridItem.vue";

// Extract filter sidebar into reusable component
import FilterOptions from "@/components/products/FilterOptions.vue";

const route = useRoute();

// Reactive states
const slug = ref(route.params.slug);
const category = ref(categories.find((cat) => cat.slug === slug.value));

// Filters
const maxPrice = ref(null);
const selectedBrand = ref("");
const inStockOnly = ref(false);
const minRating = ref(null);
const sortOption = ref("default");

// Mobile filter modal
const showFilters = ref(false);

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
    category.value = categories.find((cat) => cat.slug === newSlug);
    resetFilters();
  }
);

// Filtered products
const filteredProducts = computed(() => {
  let filtered = products.value.filter(
    (p) => p.categoryId === category.value?.id
  );

  if (maxPrice.value != null && maxPrice.value > 0) {
    filtered = filtered.filter(
      (p) => (p.offerPrice ?? p.regularPrice) <= maxPrice.value
    );
  }

  if (selectedBrand.value) {
    filtered = filtered.filter((p) => p.brand === selectedBrand.value);
  }

  if (inStockOnly.value) {
    filtered = filtered.filter((p) => p.inStock === true);
  }

  if (minRating.value != null) {
    filtered = filtered.filter((p) => (p.rating ?? 0) >= minRating.value);
  }

  if (sortOption.value === "priceAsc") {
    filtered.sort(
      (a, b) =>
        (a.offerPrice ?? a.regularPrice) - (b.offerPrice ?? b.regularPrice)
    );
  } else if (sortOption.value === "priceDesc") {
    filtered.sort(
      (a, b) =>
        (b.offerPrice ?? b.regularPrice) - (a.offerPrice ?? a.regularPrice)
    );
  } else if (sortOption.value === "nameAsc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption.value === "nameDesc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return filtered;
});
</script>
