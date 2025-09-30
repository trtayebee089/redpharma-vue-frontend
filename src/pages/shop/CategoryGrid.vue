<template>
    <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div v-for="category in categories" :key="category.id"
                class="flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition border border-gray-200 hover:border-green-500">
                <!-- Category Icon -->
                <div class="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-3">
                    <img v-if="category.icon" :src="category.icon" :alt="category.name"
                        class="w-10 h-10 object-contain" />
                    <i v-else class="fas fa-folder text-gray-400 text-2xl"></i>
                </div>

                <!-- Category Name -->
                <span class="text-gray-700 font-medium text-sm text-center">
                    {{ category . name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        useCategories
    } from "@/composables/useCategories"

    // fetch categories
    const {
        categories
    } = useCategories()
</script>

<style scoped>
    /* Optional hover animation */
</style>
