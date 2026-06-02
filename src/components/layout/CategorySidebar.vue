<template>
    <aside class="hidden lg:block w-64 bg-gray-100 shadow-red-400 pt-4 category-sidebar shadow-right">
        <ul class="pt-4">
            <li v-for="category in categories" :key="category.id" class="last:border-b-0">
                <router-link :to="`/category/${category.slug}`"
                    class="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-red-200 transition-colors hover:font-bold hover:text-red-950"
                    :class="{
                        'bg-red-200 font-bold text-red-950': route.params.slug === category.slug
                    }">
                    <div class="flex items-center">
                        <img v-if="category.image" :src="category.image" alt="" class="w-6 h-6 mr-3" loading="lazy" />
                        <span>{{ category . name }}</span>
                    </div>
                    <i class="pi pi-chevron-right text-sm"></i>
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script setup>
    import {
        useCategories
    } from "@/composables/useCategories.js";
    const {
        categories,
        loading,
        error
    } = useCategories();
    import {
        useRoute
    } from 'vue-router';

    const route = useRoute();
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
    @media (max-width: 1023px) {
        .category-sidebar {
            display: none !important;
        }
    }

    .category-sidebar.shadow-right {
        box-shadow: 1px 0px 11px 0px rgb(193 193 193 / 50%);
    }
</style>
