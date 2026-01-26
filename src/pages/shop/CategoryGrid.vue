<template>
    <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Browse Categories
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.slug}`" class="group relative block h-48 sm:h-56 md:h-64
                       rounded-xl overflow-hidden shadow-md
                       hover:shadow-xl transition-all duration-300">
                <!-- Image -->
                <img :src="category.image" :alt="category.name" class="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-500
                           group-hover:scale-110" />

                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-br
                           from-green-900/70 via-green-800/40 to-transparent"></div>

                <!-- Product Count Badge -->
                <div v-if="category.total_products > 0" class="absolute top-3 left-3
                           bg-white/90 backdrop-blur
                           text-gray-900 text-xs font-semibold
                           px-3 py-1 rounded-full shadow">
                    {{ category.total_products }} Products
                </div>

                <!-- Arrow Button -->
                <div class="absolute top-3 right-3
                           w-10 h-10 bg-white rounded-lg
                           flex items-center justify-center
                           shadow transition
                           group-hover:bg-green-600 group-hover:text-white">
                    <i class="pi pi-arrow-right text-lg"></i>
                </div>

                <!-- Optional Category Name (hover only) -->
                <div class="absolute bottom-0 inset-x-0
                           bg-black/40 text-white text-sm
                           text-center py-2 opacity-0
                           transition-opacity duration-300
                           group-hover:opacity-100">
                    {{ category.name }}
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { useCategories } from "@/composables/useCategories";
import { useRoute } from "vue-router";


const route = useRoute();
const { categories } = useCategories();
</script>

<style scoped>
/* Optional hover animation */
</style>
