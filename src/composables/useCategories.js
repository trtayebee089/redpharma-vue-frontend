import { ref, onMounted } from "vue";
import axios from "@/api/config"; // your axios instance
import { CATEGORIES } from "@/api/endpoints.js";
import { visibleCategories } from "@/utils/categoryNavigation.js";

const CACHE_KEY = "categories_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour
const REFRESH_INTERVAL = 60_000;
let refreshedCategories;
let categoryRequest;
let refreshTime = 0;

function requestCategories(force) {
    if (categoryRequest) return categoryRequest;
    if (!force && Date.now() - refreshTime < REFRESH_INTERVAL) return refreshedCategories;

    categoryRequest = axios.get(CATEGORIES).then(({ data }) => {
        if (!Array.isArray(data.data)) throw new Error("Invalid category list");

        refreshedCategories = visibleCategories(data.data);
        refreshTime = Date.now();
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: refreshedCategories,
                timestamp: refreshTime,
            }));
        } catch {
            // Categories are still usable when browser storage is disabled.
        }
        return refreshedCategories;
    }).finally(() => {
        categoryRequest = null;
    });

    return categoryRequest;
}

function getCachedCategories() {
    try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (Array.isArray(cached?.data) && Number.isFinite(cached.timestamp)
            && Date.now() - cached.timestamp <= CACHE_TTL) {
            return visibleCategories(cached.data);
        }
    } catch {
        // An unavailable or invalid cache is equivalent to a missing cache.
    }
    return [];
}

export function useCategories() {
    const categories = ref([]);
    const category = ref(null);
    const products = ref([]);  
    const pagination = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const sortOption = ref("default");

    const fetchCategories = async (force = false) => {
        loading.value = true;
        error.value = null;
        try {
            categories.value = await requestCategories(force);
        } catch (err) {
            error.value = err;
            categories.value = refreshedCategories ?? getCachedCategories();
        } finally {
            loading.value = false;
        }
    };

    async function fetchCategoryDetails(slug, page = 1, params = []) {
        loading.value = true;
        try {
            const res = await axios.get(`/categories/${slug}`, {
                params: {
                    page,
                    sort: sortOption.value !== 'default' ? sortOption.value : null,
                },
            });

            category.value = res.data.data;
            products.value = res.data.products?.data || res.data.products || [];
            pagination.value = res.data.products || null;
            return products.value;
        } catch (err) {
            console.error(err);
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    onMounted(() => {
        fetchCategories();
    });

    return { categories, category, products, pagination, loading, error, fetchCategories, fetchCategoryDetails, sortOption };
}
