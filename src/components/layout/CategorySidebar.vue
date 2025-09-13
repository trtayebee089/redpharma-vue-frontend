<template>
    <!-- Desktop Sidebar: shows only from 1024px -->
    <aside class="hidden lg:block w-64 bg-gray-100 shadow-red-400 pt-4 category-sidebar shadow-right">
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
    import {
        categories
    } from "@/data/categories.js";
</script>

<style scoped>
    .category-sidebar {
        position: sticky;
        top: 70px;
        height: calc(100vh - 70px);
        overflow-y: auto;
        z-index: 10;
        width: 16rem;
    }

    /* Optional: force hide below 1024px if any override */
    @media (max-width: 1023px) {
        .category-sidebar {
            display: none !important;
        }
    }
    .category-sidebar.shadow-right {
        box-shadow: 1px 0px 11px 0px rgb(193 193 193 / 50%);
    }
</style>
