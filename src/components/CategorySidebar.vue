<template>
    <!-- sidebar is part of the page flow; hidden on small screens -->
    <aside class="w-70 overflow-y-auto self-start pt-4 bg-gray-100"
        style="position: sticky; top: 64px; height: calc(100vh - 64px); box-shadow: rgba(0, 0, 0, 0.3) -1px 0px 12px 0px;">
        <ul>
            <li v-for="category in categories" :key="category.id" class="last:border-b-0">
                <router-link :to="`/category/${category.slug}`"
                    class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors">
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
    /* optional scrollbar */
    aside::-webkit-scrollbar {
        width: 6px;
    }

    aside::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
</style>
