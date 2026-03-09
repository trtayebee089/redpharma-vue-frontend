<template>
    <div v-if="isLoading" class="flex justify-center items-center min-h-[300px] ">
        <svg class="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
            </path>
        </svg>
    </div>

    <div v-else class="pt-6">
        <BreadCrumb :crumbs="[
            { label: 'Home', to: '/' }, { label: 'Category', to: '/categories' }, { label: category?.name }
        ]" :title="category?.name" :subtitle="`Showing ${filteredProducts.length} products in ${category?.name}`"
            :description="category?.description" />

        <section
            class="relative fade-up flex flex-col md:flex-row gap-6 mt-10 transform transition-transform duration-300"
            v-if="category">
            <div class="flex-1">
                <div
                    class="grid grid-cols-1 min-[321px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <ProductGridItem v-for="product in filteredProducts" :key="product.id" :product="product" />
                </div>


                <div class="flex justify-center mt-6 space-x-2" v-if="pagination && pagination.last_page > 1">
                    <button @click="changePage(pagination.current_page - 1)" :disabled="pagination.current_page === 1"
                        class="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50">
                        Prev
                    </button>

                    <template v-for="page in pageNumbersToShow" :key="page">
                        <span v-if="page === '...'">...</span>
                        <button v-else @click="changePage(page)" :class="page === pagination.current_page ?
                            'px-3 py-1 rounded border bg-green-600 text-white' :
                            'px-3 py-1 rounded border bg-white text-gray-700'">
                            {{ page }}
                        </button>
                    </template>

                    <button @click="changePage(pagination.current_page + 1)"
                        :disabled="pagination.current_page === pagination.last_page"
                        class="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50">
                        Next
                    </button>
                </div>

                <p v-if="filteredProducts.length === 0" class="mt-4 text-gray-600">
                    No products found in this category.
                </p>
            </div>
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
import BreadCrumb from "@/components/common/BreadCrumb.vue";
import {
    useCategories
} from "@/composables/useCategories.js";

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
