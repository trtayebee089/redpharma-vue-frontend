<template>
    <div :id="id" class="product-search-panel" role="region" aria-label="Product search results">
        <div v-if="loading" class="py-2" role="status" aria-live="polite">
            <span class="sr-only">Searching products</span>
            <div v-for="row in 4" :key="row" class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0">
                <div class="search-skeleton h-12 w-12 rounded-lg flex-shrink-0"></div>
                <div class="min-w-0 flex-1 space-y-2">
                    <div class="search-skeleton h-4 rounded w-3/4"></div>
                    <div class="search-skeleton h-3 rounded w-1/2"></div>
                    <div class="search-skeleton h-3 rounded w-2/5"></div>
                </div>
                <div class="space-y-2 flex-shrink-0">
                    <div class="search-skeleton h-4 rounded w-16"></div>
                    <div class="search-skeleton h-8 rounded-lg w-14"></div>
                </div>
            </div>
        </div>

        <template v-else-if="products.length">
            <div class="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                <p class="text-xs font-semibold text-gray-600">
                    {{ products.length }} {{ products.length === 1 ? "product" : "products" }} found
                </p>
                <p class="hidden sm:block text-[11px] text-gray-400">Use ↑ ↓ to navigate · Enter to open</p>
            </div>

            <ul class="search-results-list" role="listbox" aria-label="Matching products">
                <li
                    v-for="(product, index) in products"
                    :id="`${id}-option-${index}`"
                    :key="product.id"
                    :class="[
                        'search-result-row',
                        { 'search-result-row-active': activeIndex === index },
                    ]"
                    role="option"
                    :aria-selected="activeIndex === index"
                    @mouseenter="$emit('active-change', index)"
                >
                    <router-link
                        :to="`/products/${product.slug}`"
                        class="min-w-0 flex flex-1 items-start gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        :aria-label="`View ${product.name}`"
                        @click.prevent="$emit('select', product)"
                    >
                        <div class="product-thumbnail">
                            <img
                                v-if="hasUsableImage(product)"
                                :src="product.image"
                                :alt="product.name"
                                loading="lazy"
                                decoding="async"
                                class="h-full w-full object-contain"
                                @error="markImageFailed(product.id)"
                            />
                            <i v-else class="pi pi-plus-circle text-lg text-green-500"></i>
                        </div>

                        <div class="min-w-0 flex-1 pt-0.5">
                            <p class="product-name">
                                <span
                                    v-for="(part, partIndex) in highlightParts(product.name)"
                                    :key="`${product.id}-${partIndex}`"
                                    :class="part.match ? 'search-match' : ''"
                                >{{ part.text }}</span>
                            </p>

                            <p v-if="metadata(product).length" class="product-metadata">
                                <template v-for="(item, metadataIndex) in metadata(product)" :key="`${product.id}-meta-${metadataIndex}`">
                                    <span v-if="metadataIndex" class="mx-1 text-gray-300" aria-hidden="true">·</span>
                                    <span>{{ item }}</span>
                                </template>
                            </p>

                            <p :class="['stock-status', stockState(product).className]">
                                <span class="stock-dot" aria-hidden="true"></span>
                                <span>{{ stockState(product).label }}</span>
                            </p>
                        </div>
                    </router-link>

                    <div class="flex flex-col items-end justify-between self-stretch gap-2 pl-1 sm:pl-3">
                        <p class="product-price">৳{{ displayPrice(product) }}</p>
                        <button
                            type="button"
                            :disabled="stockState(product).isOutOfStock"
                            class="add-product-button"
                            :aria-label="`Add ${product.name} to cart`"
                            @click.stop="$emit('add', product)"
                        >
                            <i class="pi pi-plus text-[10px]" aria-hidden="true"></i>
                            <span>Add</span>
                        </button>
                    </div>
                </li>
            </ul>
        </template>

        <div v-else class="px-6 py-10 text-center" role="status" aria-live="polite">
            <div class="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
                <i class="pi pi-search text-lg" aria-hidden="true"></i>
            </div>
            <p class="text-sm font-semibold text-gray-800">No products found</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">Try another medicine or product name.</p>
        </div>
    </div>
</template>

<script setup>
import { nextTick, reactive, watch } from "vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: () => [],
    },
    query: {
        type: String,
        default: "",
    },
    loading: {
        type: Boolean,
        default: false,
    },
    activeIndex: {
        type: Number,
        default: -1,
    },
});

defineEmits(["select", "add", "active-change"]);

const failedImages = reactive(new Set());

const markImageFailed = (productId) => {
    failedImages.add(productId);
};

const hasUsableImage = (product) => {
    const image = product?.image?.trim();

    return Boolean(
        image
        && !failedImages.has(product.id)
        && !image.includes("placehold.co")
        && !image.includes("no-image.png"),
    );
};

const highlightParts = (name) => {
    const text = String(name || "");
    const needle = props.query.trim().toLocaleLowerCase();

    if (!needle) return [{ text, match: false }];

    const lowerText = text.toLocaleLowerCase();
    const parts = [];
    let cursor = 0;
    let matchIndex = lowerText.indexOf(needle);

    while (matchIndex !== -1) {
        if (matchIndex > cursor) {
            parts.push({ text: text.slice(cursor, matchIndex), match: false });
        }

        parts.push({
            text: text.slice(matchIndex, matchIndex + needle.length),
            match: true,
        });

        cursor = matchIndex + needle.length;
        matchIndex = lowerText.indexOf(needle, cursor);
    }

    if (cursor < text.length) {
        parts.push({ text: text.slice(cursor), match: false });
    }

    return parts.length ? parts : [{ text, match: false }];
};

const metadata = (product) => [
    product?.brand?.title,
    product?.category?.name,
].filter(Boolean);

const stockQuantity = (product) => {
    const value = product?.available_qty ?? product?.qty;
    const quantity = Number(value);

    return Number.isFinite(quantity) ? Math.max(0, quantity) : null;
};

const formatStockQuantity = (quantity) => (
    Number.isInteger(quantity) ? String(quantity) : quantity.toFixed(2).replace(/\.00$/, "")
);

const stockState = (product) => {
    const quantity = stockQuantity(product);
    const unit = product?.unit?.unit_code || "pcs";

    if (quantity !== null && quantity <= 0) {
        return {
            label: "Out of Stock",
            className: "stock-out",
            isOutOfStock: true,
        };
    }

    if (quantity !== null && quantity <= 5) {
        return {
            label: `Only ${formatStockQuantity(quantity)} left`,
            className: "stock-low",
            isOutOfStock: false,
        };
    }

    return {
        label: quantity === null
            ? "In Stock"
            : `In Stock · ${formatStockQuantity(quantity)} ${unit}`,
        className: "stock-available",
        isOutOfStock: false,
    };
};

const displayPrice = (product) => {
    const promotionalPrice = Number(product?.promotion_price);
    const regularPrice = Number(product?.price);
    const price = promotionalPrice > 0 ? promotionalPrice : regularPrice;

    return Number.isFinite(price) ? price.toFixed(2) : "0.00";
};

watch(
    () => props.activeIndex,
    async (index) => {
        if (index < 0) return;

        await nextTick();
        document.getElementById(`${props.id}-option-${index}`)?.scrollIntoView({
            block: "nearest",
        });
    },
);
</script>

<style scoped>
.product-search-panel {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    z-index: 80;
    overflow: hidden;
    max-height: min(540px, calc(100vh - 7.5rem));
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    background: #fff;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.06);
}

.search-results-list {
    max-height: min(490px, calc(100vh - 10.5rem));
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: #a7f3d0 transparent;
}

.search-results-list::-webkit-scrollbar {
    width: 6px;
}

.search-results-list::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: #a7f3d0;
}

.search-result-row {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    background: #fff;
    transition: background-color 160ms ease, box-shadow 160ms ease;
}

.search-result-row:last-child {
    border-bottom: 0;
}

.search-result-row:hover,
.search-result-row-active {
    background: #f4fbf6;
    box-shadow: inset 3px 0 0 #22c55e;
}

.product-thumbnail {
    display: flex;
    width: 3rem;
    height: 3rem;
    flex: 0 0 3rem;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0.3rem;
    border: 1px solid #edf1f4;
    border-radius: 0.6rem;
    background: #f8faf9;
}

.product-name {
    display: -webkit-box;
    overflow: hidden;
    color: #1f2937;
    font-size: 0.925rem;
    font-weight: 650;
    line-height: 1.3;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.search-match {
    border-radius: 0.2rem;
    background: #dcfce7;
    color: #15803d;
    box-shadow: 0 0 0 1px #dcfce7;
}

.product-metadata {
    overflow: hidden;
    margin-top: 0.25rem;
    color: #64748b;
    font-size: 0.75rem;
    line-height: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.stock-status {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.2rem;
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1rem;
}

.stock-dot {
    width: 0.4rem;
    height: 0.4rem;
    flex: 0 0 0.4rem;
    border-radius: 999px;
    background: currentColor;
}

.stock-available {
    color: #15803d;
}

.stock-low {
    color: #b45309;
}

.stock-out {
    color: #dc2626;
}

.product-price {
    color: #15803d;
    font-size: 0.95rem;
    font-weight: 750;
    line-height: 1.25rem;
    white-space: nowrap;
}

.add-product-button {
    display: inline-flex;
    min-height: 2rem;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.35rem 0.65rem;
    border-radius: 0.55rem;
    background: #16a34a;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
    transition: background-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
}

.add-product-button:hover:not(:disabled) {
    background: #15803d;
    box-shadow: 0 4px 10px rgba(22, 163, 74, 0.2);
    transform: translateY(-1px);
}

.add-product-button:focus-visible {
    outline: 2px solid #16a34a;
    outline-offset: 2px;
}

.add-product-button:disabled {
    cursor: not-allowed;
    background: #cbd5e1;
    color: #64748b;
}

.search-skeleton {
    position: relative;
    overflow: hidden;
    background: #e5e7eb;
}

.search-skeleton::after {
    position: absolute;
    inset: 0;
    content: "";
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
    animation: search-shimmer 1.4s infinite;
}

@keyframes search-shimmer {
    100% {
        transform: translateX(100%);
    }
}

@media (max-width: 639px) {
    .product-search-panel {
        max-height: min(500px, calc(100vh - 9rem));
        border-radius: 0.65rem;
    }

    .search-results-list {
        max-height: min(450px, calc(100vh - 12rem));
    }

    .search-result-row {
        gap: 0.35rem;
        padding: 0.7rem 0.75rem;
    }

    .product-thumbnail {
        width: 2.75rem;
        height: 2.75rem;
        flex-basis: 2.75rem;
    }

    .product-name {
        font-size: 0.875rem;
    }

    .product-metadata {
        max-width: 12rem;
    }

    .product-price {
        font-size: 0.875rem;
    }

    .add-product-button {
        min-height: 1.9rem;
        padding-inline: 0.55rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .search-result-row,
    .add-product-button,
    .search-skeleton::after {
        animation: none;
        transition: none;
    }
}
</style>
