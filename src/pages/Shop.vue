<template>
  <section class="container mx-auto px-4 md:px-6 py-8">
    <div class="flex flex-col md:flex-row gap-6">
      
      <!-- Left Sidebar: Categories -->
      <aside class="w-full md:w-1/4 bg-white rounded-lg shadow p-4">
        <h2 class="text-xl font-semibold mb-4">Categories</h2>
        <ul>
          <li v-for="category in categories" :key="category.id" class="border-b last:border-b-0">
            <router-link
              :to="`/category/${category.slug}`"
              class="flex items-center px-4 py-3 text-gray-700 hover:bg-red-100 transition-colors"
              :class="route.params.slug === category.slug ? 'bg-red-100 font-semibold text-red-700' : ''"
            >
              <img :src="category.image" alt="" class="w-6 h-6 mr-3" />
              <span>{{ category.name }}</span>
            </router-link>
          </li>
        </ul>
      </aside>

      <!-- Right: Products and Sort -->
      <div class="flex-1 flex flex-col gap-4">
        <!-- Sort By -->
        <div class="flex justify-end mb-4">
          <label class="mr-2 text-gray-700 font-medium" for="sort">Sort by:</label>
          <select id="sort" v-model="sortOption"
                  class="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductGridItem
            v-for="product in sortedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Optional: Pagination -->
        <div class="mt-6 flex justify-center space-x-2">
          <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&lt;</button>
          <button class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">1</button>
          <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">2</button>
          <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">3</button>
          <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&gt;</button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductGridItem from '@/components/ProductGridItem.vue'
import { categories } from '../data/categories'
import { products } from '../data/products'

const route = useRoute()
const sortOption = ref('default')

// Filter products by category if route is /category/:slug
const filteredProducts = computed(() => {
  const slug = route.params.slug
  if (!slug) return allProducts
  const category = categories.find(c => c.slug === slug)
  if (!category) return []
  return allProducts.filter(p => p.categoryId === category.id)
})

// Sort products based on sortOption
const sortedProducts = computed(() => {
  let sorted = [...filteredProducts.value]
  switch (sortOption.value) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name))
      break
  }
  return sorted
})
</script>
