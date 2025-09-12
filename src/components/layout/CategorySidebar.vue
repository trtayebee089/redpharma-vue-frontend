<template>
    <aside class="w-full md:w-64 bg-gray-200 rounded-lg shadow-lg pt-4 category-sidebar"
        style="position: sticky; top: 70px; height: calc(100vh - 70px); overflow-y: auto;">

        <ul class="pt-4">
            <li v-for="category in categories" :key="category.id" class="last:border-b-0">
                <router-link :to="`/category/${category.slug}`"
                    class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors">
                    <img :src="category.image" alt="" class="w-6 h-6 mr-3" />
                    <span>{{ category . name }}</span>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script setup>
    // import { computed } from "vue";
    import {
        useRoute
    } from "vue-router";
    import {
        categories
    } from "@/data/categories.js";

    const route = useRoute();
</script>

<style scoped>
.category-sidebar{
  position: sticky;
  top: 70px;  /* sticks below navbar */
  z-index: 10;
}
</style>
