import { ref, onMounted } from "vue";
import axios from "@/api/config"; // your axios instance
import { CATEGORIES } from "@/api/endpoints.js";

const CACHE_KEY = "categories_cache";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export function useCategories() {
    const categories = ref([]);
    const category = ref(null);
    const products = ref([]);  
    const pagination = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const sortOption = ref("default");

    const fetchCategories = async (force = false) => {
        // 1️⃣ Try cache first
        if (!force) {
            const cached = getCachedCategories();
            if (cached) {
                categories.value = cached;
                return;
            }
        }

        // 2️⃣ Fetch from API
        loading.value = true;
        try {
            const res = await axios.get(CATEGORIES);
            categories.value = res.data.data;

            // 3️⃣ Save to cache
            setCachedCategories(categories.value);

        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    const getCachedCategories = () => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const parsed = JSON.parse(cached);

        // Check expiry
        if (Date.now() - parsed.timestamp > CACHE_TTL) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return parsed.data;
    };

    const setCachedCategories = (data) => {
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
                data,
                timestamp: Date.now(),
            })
        );
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
