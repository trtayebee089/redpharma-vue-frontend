// src/composables/useProducts.js
import { ref, onMounted } from 'vue';
import api from '@/api/config';
import { PRODUCTS } from '@/api/endpoints';

export function useProducts() {
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchProducts = async () => {
        loading.value = true;
        try {
            const response = await api.get(PRODUCTS);
            products.value = response.data;
        } catch (err) {
            error.value = err.message || 'Failed to fetch products';
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchProducts);

    return { products, loading, error, fetchProducts };
}
