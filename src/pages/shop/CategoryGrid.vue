<template>
    <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Browse Categories
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.slug}`" class="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <!-- Image Area -->
                <div class="relative h-48 sm:h-56 md:h-64 bg-gray-200 overflow-hidden">
                    <img :src="category.image" :alt="category.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                    <!-- Overlay gradient -->
                    <div class="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/40 to-transparent"></div>

                    <!-- Arrow Button -->
                    <div class="absolute top-3 right-3 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow transition group-hover:bg-green-600 group-hover:text-white">
                        <i class="pi pi-arrow-right text-lg"></i>
                    </div>
                </div>

                <!-- Category Name -->
                <div class="bg-white px-4 py-3 text-center font-semibold text-gray-800 transition-colors group-hover:bg-green-50">
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
