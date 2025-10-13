// src/composables/useProducts.js
import { ref, onMounted } from "vue";
import api from "@/api/config";
import { PRODUCTS } from "@/api/endpoints"; // assume something like '/products'

export function useProducts() {
    const products = ref([]);
    const product = ref(null);
    const featured = ref([]);
    const pagination = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const bestSelling = ref([]);
    let controller = null;

    const fetchProducts = async ({
        page = 1,
        sort = "default",
        filters = {},
    } = {}) => {
        loading.value = true;
        try {
            const response = await api.get(PRODUCTS, {
                params: { page, sort, ...filters },
            });

            // backend returns { data: [], pagination: {} }
            products.value = response.data.data || response.data;
            pagination.value = response.data.pagination || null;
        } catch (err) {
            error.value = err.message || "Failed to fetch products";
        } finally {
            loading.value = false;
        }
    };

    const fetchProductDetails = async (slug) => {
        loading.value = true;
        try {
            const response = await api.get(`/products/${slug}`);
            product.value = response.data.data || response.data;
            // Return related products
            return response.data.relatedProducts || [];
        } catch (err) {
            error.value = err.message || "Failed to fetch product details";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const fetchFeaturedProducts = async () => {
        loading.value = true;
        try {
            const response = await api.get(`/${PRODUCTS}/featured`);
            featured.value = response.data.data || response.data;
        } catch (err) {
            error.value = err.message || "Failed to fetch featured products";
        } finally {
            loading.value = false;
        }
    };

    const fetchSearchResults = async (query) => {
        if (!query || query.trim().length < 2) {
            products.value = [];
            return;
        }

        if (controller) controller.abort();
        controller = new AbortController();

        loading.value = true;
        error.value = null;

        try {
            const response = await api.get(`/search/${encodeURIComponent(query)}`, {
                signal: controller.signal,
            });
            products.value = response.data.data || [];
        } catch (err) {
            if (err.name !== "CanceledError") {
                error.value = err.message || "Failed to fetch search results";
            }
        } finally {
            loading.value = false;
        }
    };

    const fetchBestSellingProducts = async (query) => {
        loading.value = true;
        try {
            const response = await api.get(`/${PRODUCTS}/best-selling`);
            bestSelling.value = response.data.data || response.data;
        } catch (err) {
            error.value = err.message || "Failed to fetch best selling products";
        } finally {
            loading.value = false;
        }
    }
    
    onMounted(() => {
        fetchProducts();
    });

    return {
        products,
        product,
        featured,
        bestSelling,
        pagination,
        loading,
        error,
        fetchProducts,
        fetchProductDetails,
        fetchFeaturedProducts,
        fetchSearchResults,
        fetchBestSellingProducts
    };
}
