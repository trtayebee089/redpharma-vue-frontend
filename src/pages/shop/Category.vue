<template>
    <div v-if="isLoading" class="category-loading" role="status" :aria-label="t('catalog.loading')">
        <span class="category-spinner" aria-hidden="true"></span>
    </div>

    <div v-else class="category-page">
        <header v-if="category?.name" class="category-hero">
            <div class="category-hero-body">
                <nav aria-label="Breadcrumb" class="category-breadcrumb">
                    <ol>
                        <li><RouterLink to="/">{{ t('header.menu.home') }}</RouterLink></li>
                        <li><RouterLink to="/categories">{{ t('catalog.category') }}</RouterLink></li>
                        <li aria-current="page">{{ categoryName(category) }}</li>
                    </ol>
                </nav>
                <h1>{{ categoryName(category) }}</h1>
                <p v-if="category.description" class="category-description">{{ category.description }}</p>
            </div>
            <CategoryImage v-if="category.image" :src="category.image" alt="" class="category-hero-image" />
        </header>

        <section v-if="category" aria-label="Products" class="category-catalog">
            <p v-if="filteredProducts.length" class="category-results" role="status">
                <i18n-t keypath="catalog.showing" scope="global">
                    <template #shown><strong>{{ n(filteredProducts.length) }}</strong></template>
                    <template #total><strong>{{ n(pagination?.total ?? filteredProducts.length) }}</strong></template>
                </i18n-t>
            </p>

            <div v-if="filteredProducts.length" class="category-grid">
                <ProductGridItem v-for="product in filteredProducts" :key="product.id" :product="product"
                    class="category-product-card" />
            </div>
            <p v-else class="category-empty">{{ t('catalog.empty') }}</p>

            <nav v-if="pagination && pagination.last_page > 1" class="category-pagination" :aria-label="t('catalog.pages')">
                <button type="button" @click="changePage(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1">{{ t('catalog.previous') }}</button>

                <template v-for="(page, index) in pageNumbersToShow" :key="index">
                    <span v-if="page === '...'">…</span>
                    <button v-else type="button" @click="changePage(page)"
                        :aria-current="page === pagination.current_page ? 'page' : undefined">
                        {{ n(page) }}
                    </button>
                </template>

                <button type="button" @click="changePage(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page">{{ t('catalog.next') }}</button>
            </nav>
        </section>

        <transition name="slide-fade">
            <div v-if="showFilters" class="fixed inset-0 z-50 bg-black/60 flex justify-start"
                @click.self="showFilters = false">
                <div class="bg-white w-3/4 max-w-xs p-6 shadow-lg">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold">Filters</h2>
                        <button @click="showFilters = false" class="text-gray-500 hover:text-gray-800">
                            &times;
                        </button>
                    </div>
                    <FilterOptions :max-price="maxPrice" :selected-brand="selectedBrand" :in-stock-only="inStockOnly"
                        :min-rating="minRating" @reset="resetFilters" />
                    <button @click="showFilters = false"
                        class="mt-4 w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
                        Apply Filters
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import {
    ref,
    computed,
    watch
} from "vue";
import {
    useRoute,
    useRouter
} from "vue-router";
import ProductGridItem from "@/components/products/ProductGridItem.vue";
import FilterOptions from "@/components/products/FilterOptions.vue";
import CategoryImage from "@/components/common/CategoryImage.vue";
import { useCategoryNames } from "@/composables/useCategoryNames.js";
import { useI18n } from "vue-i18n";
import {
    useCategories
} from "@/composables/useCategories.js";

const { t, n } = useI18n();
const categoryName = useCategoryNames();
const route = useRoute();
const router = useRouter();

const slug = ref(route.params.slug);
const {
    categories,
    category,
    products,
    pagination,
    fetchCategoryDetails,
    loading: isLoading,
    error,
    sortOption
} = useCategories();

const maxPrice = ref(null);
const selectedBrand = ref("");
const inStockOnly = ref(false);
const minRating = ref(null);
const showFilters = ref(false);

function resetFilters() {
    maxPrice.value = null;
    selectedBrand.value = "";
    inStockOnly.value = false;
    minRating.value = null;
}

const filteredProducts = computed(() => products.value || []);

// Function to change page
function changePage(page) {
    if (!pagination.value) return;
    if (page >= 1 && page <= pagination.value.last_page) {
        fetchCategoryDetails(slug.value, page);
    }
}

// Compute which page numbers to show
const pageNumbersToShow = computed(() => {
    if (!pagination.value) return [];
    const total = pagination.value.last_page;
    const current = pagination.value.current_page;

    const visible = 5; // total visible pages including active
    let start = Math.max(1, current - 1); // active page as 2nd button
    let end = start + visible - 1;

    if (end > total) {
        end = total;
        start = Math.max(1, end - visible + 1);
    }

    const pages = [];
    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < total - 1) pages.push("...");
    if (end < total) pages.push(total);

    return pages;
});

// Watch slug changes
watch(() => route.params.slug,
    async (newSlug) => {
        slug.value = newSlug;
        await fetchCategoryDetails(newSlug);
        resetFilters();

        if (!category.value && !isLoading.value) {
            router.replace("/categories");
        }
    }, {
    immediate: true
}
);

watch(sortOption, async () => {
    if (category.value) {
        await fetchCategoryDetails(slug.value, 1);
    }
});
</script>

<style scoped>
.category-page {
    padding-block: clamp(0.75rem, 2vw, 1.5rem) 1rem;
}

.category-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    padding: clamp(1.125rem, 3vw, 2rem);
    border: 1px solid #d4e9dd;
    border-radius: 1.125rem;
    background: linear-gradient(115deg, #f3faf6 15%, #e2f4e9 100%);
    color: #163b2b;
}

.category-hero-body {
    min-width: 0;
}

.category-hero h1 {
    margin-top: 0.625rem;
    font-size: clamp(1.65rem, 3vw, 2.85rem);
    font-weight: 750;
    letter-spacing: -0.025em;
    line-height: 1.15;
    overflow-wrap: anywhere;
}

.category-breadcrumb ol {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.55rem;
    color: #426153;
    font-size: 0.8125rem;
}

.category-breadcrumb li + li::before {
    margin-inline-end: 0.55rem;
    content: "/";
    color: #668374;
}

.category-breadcrumb li[aria-current] {
    color: #214a37;
    font-weight: 650;
}

.category-breadcrumb a:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
}

.category-description {
    max-width: 50ch;
    margin-top: 0.625rem;
    color: #3e5f50;
}

.category-hero-image {
    flex: 0 0 auto;
    width: clamp(3.75rem, 13vw, 7rem);
    aspect-ratio: 1;
    padding: 0.25rem;
    border: 1px solid #cfe5d9;
    border-radius: 1rem;
    background: #fff;
    object-fit: contain;
}

.category-catalog {
    margin-top: clamp(1.25rem, 2.5vw, 2rem);
}

.category-results {
    margin-bottom: 0.75rem;
    color: #53645d;
    font-size: 0.875rem;
}

.category-results strong {
    color: #263f35;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(0.625rem, 1.3vw, 1.1rem);
}

.category-grid :deep(.category-product-card) {
    min-width: 0;
    border-color: #e0e8e4;
    border-radius: 0.875rem;
    box-shadow: 0 1px 2px rgb(23 53 40 / 6%);
}

.category-grid :deep(.category-product-card:hover) {
    border-color: #bfd9cb;
    box-shadow: 0 5px 15px rgb(23 53 40 / 9%);
}

.category-grid :deep(.category-product-card > a:first-of-type) {
    margin: 0.375rem 0.375rem 0;
    border-radius: 0.625rem;
    background: #f6f8f7;
}

.category-grid :deep(.category-product-card h5) {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    line-height: 1.35;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.category-pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    margin-top: 1.5rem;
}

.category-pagination button {
    min-width: 2.625rem;
    min-height: 2.625rem;
    padding-inline: 0.625rem;
    border: 1px solid #d6e3dc;
    border-radius: 0.5rem;
    background: #fff;
    color: #284537;
    font-size: 0.875rem;
    font-weight: 600;
}

.category-pagination button:not(:disabled):hover {
    border-color: #9ecbaf;
    background: #eff8f2;
}

.category-pagination button[aria-current="page"] {
    border-color: #137346;
    background: #137346;
    color: #fff;
}

.category-pagination button[aria-current="page"]:hover {
    border-color: #0e5d38;
    background: #0e5d38;
}

.category-pagination button:disabled {
    opacity: 0.45;
    cursor: default;
}

.category-page :deep(a:focus-visible),
.category-page :deep(button:focus-visible) {
    outline: 2px solid #137346;
    outline-offset: 2px;
}

.category-empty {
    padding: 1rem 1.25rem;
    border: 1px solid #e0e8e4;
    border-radius: 0.75rem;
    color: #53645d;
}

.category-loading {
    display: grid;
    min-height: 300px;
    place-items: center;
}

.category-spinner {
    width: 2.25rem;
    height: 2.25rem;
    border: 3px solid #dceee3;
    border-top-color: #137346;
    border-radius: 50%;
    animation: category-spin 0.75s linear infinite;
}

@keyframes category-spin {
    to { transform: rotate(360deg); }
}

@media (width < 360px) {
    .category-grid { grid-template-columns: 1fr; }
}

@media (width >= 768px) {
    .category-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (width >= 1180px) {
    .category-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (width >= 1440px) {
    .category-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
}

@media (prefers-reduced-motion: reduce) {
    .category-spinner { animation: none; }
}
</style>
