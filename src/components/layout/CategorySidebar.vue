<template>
    <aside :class="['w-70 overflow-y-auto self-start bg-gray-100', paddingTop]"
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
        computed
    } from "vue";
    import {
        useRoute
    } from "vue-router";
    import {
        categories
    } from "@/data/categories.js";

    const route = useRoute();

    // Dynamic padding-top based on route
    const paddingTop = computed(() => {
        return route.name === "Category" ? "pt-12" : "pt-4";
    });
</script>
