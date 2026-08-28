// src/composables/useProducts.js
import { ref, onMounted } from "vue";
import api from "@/api/config";
import { PRODUCTS } from "@/api/endpoints"; // assume something like '/products'

export function useProducts({ fetchOnMount = true } = {}) {
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

    const fetchProductDetails = async (slug, { signal } = {}) => {
        loading.value = true;
        error.value = null;
        product.value = null;

        try {
            const response = await api.get(`/products/${slug}`, { signal });
            product.value = response.data.data || response.data;
            // Return related products
            return response.data.relatedProducts || [];
        } catch (err) {
            if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
                return [];
            }

            error.value = err.response?.status === 404
                ? "Product not found."
                : "Unable to load product details. Please check your connection and try again.";
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
        if (controller) {
            controller.abort();
            controller = null;
        }

        if (!query || query.trim().length < 2) {
            products.value = [];
            loading.value = false;
            return;
        }

        const requestController = new AbortController();
        controller = requestController;

        loading.value = true;
        error.value = null;

        try {
            const response = await api.get(`/search/${encodeURIComponent(query)}`, {
                signal: requestController.signal,
            });

            if (controller !== requestController) return;

            products.value = response.data.data || [];
        } catch (err) {
            if (err.name !== "CanceledError") {
                error.value = err.message || "Failed to fetch search results";
            }
        } finally {
            if (controller === requestController) {
                controller = null;
                loading.value = false;
            }
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
        if (fetchOnMount) {
            fetchProducts();
        }
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
