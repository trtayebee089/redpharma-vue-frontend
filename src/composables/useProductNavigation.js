import { computed, ref } from "vue";

const pendingProductSlug = ref(null);

export function useProductNavigation() {
    const isProductNavigationPending = computed(
        () => pendingProductSlug.value !== null,
    );

    const beginProductNavigation = (slug) => {
        pendingProductSlug.value = String(slug);
    };

    const completeProductNavigation = (slug) => {
        if (pendingProductSlug.value === String(slug)) {
            pendingProductSlug.value = null;
        }
    };

    return {
        isProductNavigationPending,
        beginProductNavigation,
        completeProductNavigation,
    };
}
