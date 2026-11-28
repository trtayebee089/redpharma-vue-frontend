<script setup>
import { useRoute } from 'vue-router';
import CategoryImage from '@/components/common/CategoryImage.vue';
import { useCategories } from '@/composables/useCategories.js';
import { useCategoryNames } from '@/composables/useCategoryNames.js';

const route = useRoute();
const { categories } = useCategories();
const categoryName = useCategoryNames();
</script>

<template>
    <aside class="category-sidebar">
        <nav :aria-label="$t('header.menu.category')">
            <h2 class="category-title">{{ $t('header.menu.category') }}</h2>
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
                        <span class="category-name">{{ categoryName(category) }}</span>
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
    top: 73px;
    z-index: 10;
    flex: 0 0 var(--category-sidebar-width);
    width: var(--category-sidebar-width);
    height: calc(100dvh - 73px);
    overflow-y: auto;
    border-inline-end: 1px solid #d6e5dc;
    background: #f2f7f4;
    scrollbar-width: thin;
}

.category-title {
    margin: 1rem 0.875rem 0.25rem;
    padding: 0 0.5rem 0.625rem;
    border-bottom: 1px solid #dce9e0;
    color: #355746;
    font-size: .8125rem;
    font-weight: 750;
}

.category-list {
    display: grid;
    gap: 3px;
    padding: 0.25rem 0.625rem 1rem;
}

.category-link {
    display: grid;
    grid-template-columns: 1.75rem minmax(0, 1fr) 0.625rem;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.75rem;
    padding: 0.375rem 0.625rem;
    border-radius: 0.5rem;
    color: #294437;
    font-size: 0.9rem;
    line-height: 1.35;
    transition: background-color 150ms ease, color 150ms ease;
}

.category-link:hover {
    background: #e8f2eb;
    color: #174e32;
}

.category-link:focus-visible {
    outline: 2px solid #21834c;
    outline-offset: -2px;
}

.category-link.is-selected {
    background: #daeee1;
    box-shadow: inset 3px 0 #267b4c;
    color: #174e32;
    font-weight: 700;
}

.category-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
