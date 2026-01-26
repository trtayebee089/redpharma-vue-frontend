<template>
    <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Browse Categories
        </h2>

        <div class="grid gap-6
                    grid-cols-1
                    [@media(min-width:375px)]:grid-cols-2
                    [@media(min-width:768px)]:grid-cols-3
                    [@media(min-width:1140px)]:grid-cols-4">
            <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.slug}`"
                class="group relative block aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <!-- Image -->
                <img :src="category.image" :alt="category.name"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <div v-if="category.total_products > 0"
                    class="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {{ category.total_products }} Products
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
