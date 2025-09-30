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
    
    onMounted(() => {
        fetchProducts();
    });

    return {
        products,
        product,
        featured,
        pagination,
        loading,
        error,
        fetchProducts,
        fetchProductDetails,
        fetchFeaturedProducts,
    };
}
