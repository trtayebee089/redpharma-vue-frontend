<script setup>
import { useRoute } from 'vue-router';
import CategoryImage from '@/components/common/CategoryImage.vue';
import { useCategories } from '@/composables/useCategories.js';

const route = useRoute();
const { categories } = useCategories();
</script>

<template>
    <aside class="category-sidebar">
        <nav :aria-label="$t('header.menu.category')">
            <ul class="category-list">
                <li v-for="category in categories" :key="category.id">
                    <RouterLink
                        :to="category.navigationPath"
                        class="category-link"
                        :class="{ 'is-selected': route.params.slug === category.slug }"
                    >
                        <span class="category-thumbnail" aria-hidden="true">
                            <CategoryImage v-if="category.image" :src="category.image" alt="" loading="lazy" />
                        </span>
                        <span>{{ category.name }}</span>
                        <i class="pi pi-chevron-right category-chevron" aria-hidden="true"></i>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style scoped>
.category-sidebar {
    position: sticky;
    top: 70px;
    z-index: 10;
    flex: 0 0 16rem;
    width: 16rem;
    height: calc(100vh - 70px);
    overflow-y: auto;
    border-inline-end: 1px solid #e1e9e5;
    background: #f8faf9;
}

.category-list {
    display: grid;
    gap: 3px;
    padding: 1.5rem 0.625rem 1rem;
}

.category-link {
    display: grid;
    grid-template-columns: 1.75rem minmax(0, 1fr) 0.75rem;
    align-items: center;
    gap: 0.625rem;
    min-height: 2.75rem;
    padding: 0.375rem 0.625rem;
    border-radius: 0.5rem;
    color: #30423b;
    font-size: 0.9375rem;
    line-height: 1.35;
    transition: background-color 150ms ease, color 150ms ease;
}

.category-link:hover {
    background: #edf4ef;
    color: #174e32;
}

.category-link:focus-visible {
    outline: 2px solid #21834c;
    outline-offset: -2px;
}

.category-link.is-selected {
    background: #e2f2e8;
    box-shadow: inset 3px 0 #21834c;
    color: #174e32;
    font-weight: 650;
}

.category-thumbnail img {
    width: 1.75rem;
    height: 1.75rem;
    padding: 1px;
    border: 1px solid #e1e9e5;
    border-radius: 0.375rem;
    background: #fff;
    object-fit: cover;
}

.category-chevron {
    justify-self: end;
    color: #65776d;
    font-size: 0.7rem;
}

.category-link.is-selected .category-chevron {
    color: #21834c;
}

@media (width < 1024px) {
    .category-sidebar {
        display: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    .category-link {
        transition: none;
    }
}
</style>
