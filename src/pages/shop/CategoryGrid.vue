<template>
    <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
            {{ t('home.welcome.browse') }}
        </h2>

        <div class="grid gap-6
grid-cols-1
[@media(min-width:375px)]:grid-cols-2
[@media(min-width:638px)]:grid-cols-3
[@media(min-width:1140px)]:grid-cols-4">
            <router-link v-for="category in categories" :key="category.id" :to="category.navigationPath"
                class="group relative block aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <!-- Image -->
                <CategoryImage :src="category.image" :alt="categoryName(category)"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <div v-if="category.total_products > 0"
                    class="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {{ t('catalog.productCount', { count: n(category.total_products) }) }}
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import CategoryImage from "@/components/common/CategoryImage.vue";
import { useCategories } from "@/composables/useCategories";
import { useCategoryNames } from "@/composables/useCategoryNames.js";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const categoryName = useCategoryNames();
const { categories } = useCategories();
</script>

<style scoped>
/* Optional hover animation */
</style>
