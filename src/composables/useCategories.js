import { ref, onMounted } from "vue";
import axios from "@/api/config"; // your axios instance
import { CATEGORIES } from "@/api/endpoints.js";

export function useCategories() {
    const categories = ref([]);
    const category = ref(null);
    const products = ref([]);  
    const pagination = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const sortOption = ref("default");

    const fetchCategories = async () => {
        loading.value = true;
        try {
            const res = await axios.get(CATEGORIES);
            categories.value = res.data.data;
        } catch (err) {
            error.value = err;
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
