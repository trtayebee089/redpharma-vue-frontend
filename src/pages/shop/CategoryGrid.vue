<template>
    <section class="catalog-page" aria-labelledby="catalog-heading">
        <header class="catalog-heading">
            <nav :aria-label="t('catalog.breadcrumb')" class="catalog-path">
                <router-link to="/">{{ t('common.home') }}</router-link>
                <i class="pi pi-chevron-right" aria-hidden="true"></i>
                <span aria-current="page">{{ t('mobileNav.categories') }}</span>
            </nav>
            <h1 id="catalog-heading">{{ t('home.welcome.browse') }}</h1>
        </header>

        <ul v-if="categories.length" class="catalog-grid">
            <li v-for="category in categories" :key="category.id">
                <router-link :to="category.navigationPath" class="catalog-card">
                    <div class="catalog-image">
                        <CategoryImage :src="category.image" alt="" loading="lazy" decoding="async" />
                    </div>
                    <div class="catalog-card-body">
                        <div>
                            <h2>{{ categoryName(category) }}</h2>
                            <p v-if="productCount(category) > 0">
                                {{ t('catalog.productCount', { count: n(productCount(category)) }, productCount(category)) }}
                            </p>
                        </div>
                        <i class="pi pi-arrow-right catalog-card-arrow" aria-hidden="true"></i>
                    </div>
                </router-link>
            </li>
        </ul>
        <p v-else-if="loading" class="catalog-status" role="status">{{ t('common.loading') }}</p>
        <div v-else-if="error" class="catalog-status" role="status">
            <p>{{ t('catalog.categoriesFailed') }}</p>
            <button type="button" @click="fetchCategories(true)">{{ t('orders.retry') }}</button>
        </div>
        <p v-else class="catalog-status">{{ t('catalog.noCategories') }}</p>
    </section>
</template>

<script setup>
import CategoryImage from "@/components/common/CategoryImage.vue";
import { useCategories } from "@/composables/useCategories";
import { useCategoryNames } from "@/composables/useCategoryNames.js";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const categoryName = useCategoryNames();
const { categories, loading, error, fetchCategories } = useCategories();
const productCount = category => Number(category.total_products ?? category.product_count) || 0;
</script>

<style scoped>
.catalog-page {
    max-width: 88rem;
    margin-inline: auto;
    color: #17382b;
}

.catalog-heading {
    margin-bottom: clamp(.9rem, 2vw, 1.4rem);
    padding: clamp(1rem, 2.5vw, 1.5rem);
    border: 1px solid #d7e8dd;
    border-radius: 1rem;
    background: linear-gradient(105deg, #f3faf5, #e5f3ea);
}

.catalog-heading h1 {
    margin-top: .3rem;
    font-size: clamp(1.5rem, 4vw, 2.3rem);
    font-weight: 750;
    line-height: 1.25;
}

.catalog-path {
    display: flex;
    align-items: center;
    gap: .45rem;
    color: #3d5c4d;
    font-size: .8125rem;
}

.catalog-path a:hover {
    text-decoration: underline;
}

.catalog-path i {
    font-size: .6rem;
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr));
    gap: clamp(.625rem, 1.6vw, 1.125rem);
}

.catalog-card {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: .45rem;
    border: 1px solid #dce8e0;
    border-radius: .85rem;
    background: #fff;
    box-shadow: 0 2px 5px rgb(22 59 42 / 5%);
    transition: border-color 160ms ease, background-color 160ms ease;
}

.catalog-card:hover {
    border-color: #82b998;
    background: #f9fcfa;
}

.catalog-page :is(a, button):focus-visible {
    outline: 2px solid #218158;
    outline-offset: 2px;
}

.catalog-image {
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border-radius: .55rem;
    background: #f1f6f2;
}

.catalog-image :deep(img) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.catalog-card-body {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: .4rem;
    padding: .6rem .25rem .35rem;
}

.catalog-card-body h2 {
    font-size: .95rem;
    font-weight: 750;
    line-height: 1.35;
    overflow-wrap: anywhere;
}

.catalog-card-body p {
    margin-top: .15rem;
    color: #496154;
    font-size: .75rem;
}

.catalog-card-arrow {
    display: grid;
    width: 1.7rem;
    height: 1.7rem;
    flex: none;
    place-items: center;
    border-radius: 50%;
    background: #eaf5ed;
    color: #176742;
    font-size: .72rem;
}

.catalog-status {
    padding: 1.25rem;
    border: 1px solid #dce8e0;
    border-radius: .8rem;
    text-align: center;
}

.catalog-status button {
    margin-top: .65rem;
    color: #176742;
    text-decoration: underline;
}

@media (width >= 360px) and (width < 500px) {
    .catalog-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (width >= 900px) {
    .catalog-grid {
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    }
}

@media (prefers-reduced-motion: reduce) {
    .catalog-card {
        transition: none;
    }
}
</style>
