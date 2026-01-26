<template>
    <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Browse Categories
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <router-link v-for="category in categories" :key="category.id" :to="`/category/${category.slug}`" class="group relative flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200
                       shadow-sm transition-all duration-300
                       hover:shadow-xl hover:-translate-y-1 hover:border-green-500
                       hover:bg-green-50" :class="{
                        'border-green-600 bg-green-50 shadow-lg': route.params.slug === category.slug
                    }">
                <div class="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100
                           transition-colors duration-300
                           group-hover:bg-green-100">
                    <img v-if="category.image" :src="category.image" :alt="category.name"
                        class="w-12 h-12 object-contain" loading="lazy" />
                    <i v-else class="fas fa-folder text-gray-400 text-3xl group-hover:text-green-600"></i>
                </div>

                <span class="mt-4 text-base font-semibold text-gray-700 text-center
                           transition-colors duration-300
                           group-hover:text-green-700">
                    {{ category.name }}
                </span>

                <i class="pi pi-arrow-right mt-2 text-sm text-gray-400
                           opacity-0 group-hover:opacity-100
                           transition-all duration-300"></i>
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
