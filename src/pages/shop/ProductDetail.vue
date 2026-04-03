<template>
  <section
    v-if="productDetail"
    class="text-gray-800 space-y-6 md:space-y-12 px-3 sm:px-4 md:px-8 lg:px-16 py-6 md:py-8"
  >
    <!-- Product Information Card -->
    <div
      class="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow border border-gray-200"
    >
      <div
        class="md:col-span-2 relative w-full h-full min-h-[250px] md:min-h-[350px] rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100"
      >
        <img
          :src="defaultImagePlaceHolder.url"
          :alt="productDetail.name"
          loading="lazy"
          :class="[
            'object-contain p-4 md:absolute md:inset-0 md:w-full md:h-full transition-transform duration-500 hover:scale-[1.02]',
            defaultImagePlaceHolder.type === 'category'
              ? 'w-24 h-24'
              : 'w-full h-full',
          ]"
        />
      </div>

      <div class="md:col-span-3 flex flex-col justify-between space-y-6 py-2">
        <div>
          <div class="border-b border-gray-100 pb-4 mb-4">
            <h1
              class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight"
            >
              {{ productDetail.name }}
            </h1>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <!-- Brand Badge -->
            <div
              v-if="productDetail.brand"
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-md shadow-sm"
            >
              <i class="pi pi-shield text-indigo-500 text-xs"></i>
              <span class="text-sm text-indigo-800">
                <span class="font-normal opacity-80 mr-1">Brand:</span>
                <span class="font-bold">{{ productDetail.brand.title }}</span>
              </span>
            </div>

            <!-- Category Badge -->
            <div
              v-if="productDetail.category"
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-md shadow-sm"
            >
              <i class="pi pi-tags text-orange-500 text-xs"></i>
              <span class="text-sm text-orange-800">
                <span class="font-normal opacity-80 mr-1">Category:</span>
                <span class="font-bold">{{ fullCategoryName }}</span>
              </span>
            </div>
          </div>

          <!-- Unit Selection Dropdown -->
          <div
            v-if="showPriceInfo"
            class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Select Unit</label
              >
              <select
                v-model="selectedUnit"
                class="form-select select-unit-field w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 py-2 px-3 focus:border-green-500 bg-white"
              >
                <option value="piece">Piece</option>
                <option
                  v-if="Number(productDetail.piece_qty) > 1"
                  value="strip"
                >
                  Strip ({{ productDetail.piece_qty }} Pieces)
                </option>
                <option v-if="Number(productDetail.stripe_qty) > 1" value="box">
                  Box ({{
                    Number(productDetail.stripe_qty) *
                    (Number(productDetail.piece_qty) || 1)
                  }}
                  Pieces)
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Unit Price</label
              >
              <p
                class="w-full flex items-center border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-lg font-bold text-gray-800"
                style="min-height: 23px; line-height: 23.5px"
              >
                {{ formatPrice(currentUnitPrice) }} Tk
              </p>
            </div>
          </div>

          <div>
            <p class="block text-sm font-medium text-gray-700 mb-0 mt-5">
              Total Price:
            </p>
            <div class="flex items-center flex-wrap gap-3 mt-0 price-field">
              <p class="text-2xl font-bold text-green-600" v-if="hasPromotion">
                {{ formatPrice(displayPromotionPrice) }} Tk
              </p>

              <p
                class="font-bold"
                :class="
                  hasPromotion
                    ? 'line-through text-gray-500 text-xl'
                    : 'text-green-600 text-3xl'
                "
              >
                {{ formatPrice(displayRegularPrice) }} Tk
              </p>

              <span
                v-if="hasPromotion && product.discountPercentage"
                class="bg-green-50 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm border border-green-200"
              >
                -{{ product.discountPercentage }}%
              </span>
            </div>
          </div>
          <div
            class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6"
          >
            <div
              class="flex sm:inline-flex justify-between sm:justify-center items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-sm"
            >
              <button
                @click="decreaseQty"
                :disabled="quantity <= 1 || isStockOut"
                class="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200"
              >
                <i class="pi pi-minus"></i>
              </button>

              <input
                type="text"
                v-model.number="quantity"
                min="1"
                class="w-16 sm:w-16 flex-1 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-none py-3 sm:py-2"
              />

              <button
                @click="increaseQty"
                :disabled="isStockOut"
                class="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200"
              >
                <i class="pi pi-plus"></i>
              </button>
            </div>

            <button
              @click="addToCart(productDetail)"
              :disabled="isStockOut"
              class="w-full sm:flex-1 md:w-auto md:flex-none flex items-center justify-center whitespace-nowrap px-6 py-3 sm:py-2 font-bold text-lg sm:text-base text-white shadow-md transition-all duration-200 focus:ring-2 focus:ring-offset-1 rounded-full bg-green-600 hover:bg-green-700 focus:ring-green-400 disabled:bg-red-600 disabled:cursor-not-allowed disabled:hover:bg-red-700"
            >
              <span v-if="!isStockOut">Add to Cart</span>
              <span v-else>❌ Unavailable</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Price Information Card -->
    <div
      v-if="showPriceInfo"
      class="bg-white p-6 rounded-lg shadow border border-gray-200"
    >
      <div class="flex items-center gap-3 mb-6">
        <div
          class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"
        >
          <img :src="bdtIcon" class="w-5 h-5 object-contain opacity-80" />
        </div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-800">
          {{ productDetail.name }} Price Information
        </h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- Per Piece -->
        <div
          class="bg-[#eefcf2] border border-[#d1f4df] rounded-xl p-5 flex flex-col items-center justify-center text-center"
        >
          <div
            class="w-10 h-10 rounded-full bg-[#d1f4df] flex items-center justify-center mb-3"
          >
            <i class="pi pi-circle-fill text-green-600 text-sm"></i>
          </div>
          <span class="text-sm font-bold text-gray-800 mb-2">Per Piece</span>
          <div
            class="text-2xl font-bold text-green-600 flex items-baseline justify-center"
          >
            {{ formatPrice(piecePrice) }} Tk
          </div>
        </div>

        <!-- Per Strip -->
        <div
          class="bg-[#f0f7ff] border border-[#dbeafe] rounded-xl p-5 flex flex-col items-center justify-center text-center"
        >
          <div
            class="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center mb-3"
          >
            <i class="pi pi-table text-blue-500 text-sm"></i>
          </div>
          <span class="text-sm font-bold text-gray-800 mb-2">Per Strip</span>
          <div class="text-2xl font-bold text-blue-500">
            {{ formatPrice(stripPrice) }} Tk
          </div>
        </div>

        <!-- Per Pack -->
        <div
          class="bg-[#fdf4ff] border border-[#fae8ff] rounded-xl p-5 flex flex-col items-center justify-center text-center"
        >
          <div
            class="w-10 h-10 rounded-full bg-[#fae8ff] flex items-center justify-center mb-3"
          >
            <i class="pi pi-box text-purple-600 text-sm"></i>
          </div>
          <span class="text-sm font-bold text-gray-800 mb-2">Per Pack</span>
          <div class="text-2xl font-bold text-purple-600">
            {{ formatPrice(packPrice) }} Tk
          </div>
        </div>

        <!-- Pack Size -->
        <div
          class="bg-[#fff7ed] border border-[#ffedd5] rounded-xl p-5 flex flex-col items-center justify-center text-center"
        >
          <div
            class="w-10 h-10 rounded-full bg-[#ffedd5] flex items-center justify-center mb-3"
          >
            <i class="pi pi-server text-orange-500 text-sm"></i>
          </div>
          <span class="text-sm font-bold text-gray-800 mb-2">Pack Size</span>
          <div class="text-lg font-bold text-orange-600 leading-tight">
            {{ productDetail.stripe_qty || 1 }} x
            {{ productDetail.piece_qty || 1 }}
            <span class="block text-sm font-normal text-orange-800 mt-1"
              >units/tablets</span
            >
          </div>
        </div>
      </div>

      <!-- Note -->
      <div
        class="mt-6 bg-[#fffbeb] border border-[#fef3c7] rounded-lg p-3 flex items-start sm:items-center flex-col sm:flex-row gap-3 text-yellow-800 text-sm"
      >
        <i class="pi pi-exclamation-triangle text-yellow-600 mt-1 sm:mt-0"></i>
        <span
          ><strong>Note:</strong> Prices may vary. Contact pharmacy for latest
          prices.</span
        >
      </div>
    </div>

    <!-- Doses Informations -->
    <div
      v-if="product.description || product.doses"
      class="bg-white p-6 rounded-lg shadow border border-gray-200"
    >
      <h2 class="text-xl font-semibold mb-4">Product Description</h2>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>

      <h3 class="text-lg font-semibold mb-2">Dose Details</h3>
      <ul class="list-disc list-inside text-gray-700">
        <li v-for="(dose, index) in product.doses" :key="index">{{ dose }}</li>
      </ul>
    </div>

    <!-- Related Medicines -->
    <div>
      <h2 v-if="alternativeProducts.length" class="text-xl font-semibold mb-4">
        Related Medicines ({{ alternativeProducts.length }})
      </h2>

      <div
        v-if="alternativeProducts.length"
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="alt in alternativeProducts"
          :key="alt.id"
          class="overflow-visible"
        >
          <ProductGridItem :product="alt" />
        </div>
      </div>

      <div v-else class="text-gray-500">No alternative products available.</div>
    </div>
  </section>

  <div v-else class="flex justify-center items-center min-h-[300px]">
    <svg
      class="animate-spin h-10 w-10 text-green-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { usePush } from "notivue";
import { useProducts } from "@/composables/useProducts";
import ProductGridItem from "../../components/products/ProductGridItem.vue";
import bdtIcon from "@/assets/images/bdt-icon.png";

const BASE_URL = "http://127.0.0.1:8000";
const route = useRoute();
const { product, fetchProductDetails } = useProducts();
const productDetail = ref(null);

const cartStore = useCartStore();
const push = usePush();
const alternativeProducts = ref([]);
const quantity = ref(1);
const selectedUnit = ref("piece");

const unitMultiplier = computed(() => {
  if (!productDetail.value) return 1;
  if (selectedUnit.value === "piece") return 1;
  if (selectedUnit.value === "strip")
    return Number(productDetail.value.piece_qty) || 1;
  if (selectedUnit.value === "box") {
    const pQty = Number(productDetail.value.piece_qty) || 1;
    const sQty = Number(productDetail.value.stripe_qty) || 1;
    return pQty * sQty;
  }
  return 1;
});

const displayRegularPrice = computed(() => {
  const price = Number(productDetail.value?.price || 0);
  return price * unitMultiplier.value * quantity.value;
});

const displayPromotionPrice = computed(() => {
  const promo = Number(productDetail.value?.promotion_price);
  if (!isNaN(promo) && promo > 0) {
    return promo * unitMultiplier.value * quantity.value;
  }
  return null;
});

const hasPromotion = computed(() => {
  const p = Number(productDetail.value?.price || 0);
  const promo = Number(productDetail.value?.promotion_price || 0);
  return promo > 0 && promo < p;
});

const formatPrice = (price) => {
  return Number(price) % 1 === 0
    ? Number(price).toFixed(2)
    : Number(price).toFixed(2);
};

// The base price (product.price) is for a single Piece.
const basePrice = computed(() => {
  if (!productDetail.value) return 0;
  return (
    Number(productDetail.value.promotion_price ?? productDetail.value.price) ||
    0
  );
});

const piecePrice = computed(() => basePrice.value);

const stripPrice = computed(() => {
  const pQty = Number(productDetail.value?.piece_qty) || 1;
  return piecePrice.value * pQty;
});

const packPrice = computed(() => {
  const sQty = Number(productDetail.value?.stripe_qty) || 1;
  return stripPrice.value * sQty;
});

const currentUnitPrice = computed(() => {
  if (selectedUnit.value === "strip") return stripPrice.value;
  if (selectedUnit.value === "box") return packPrice.value;
  return piecePrice.value;
});

const defaultImagePlaceHolder = computed(() => {
  const prodImage = product.value.image?.trim();
  const catImage = product.value.category?.image?.trim();

  const normalizeUrl = (url) => {
    if (url.startsWith("http")) return url;
    return BASE_URL + url;
  };

  if (
    prodImage &&
    !prodImage.includes("https://placehold.co") &&
    !prodImage.includes("no-image.png")
  ) {
    return { url: prodImage, type: "product" };
  } else if (
    catImage &&
    !catImage.includes("https://placehold.co") &&
    !catImage.includes("no-image.png")
  ) {
    return { url: catImage, type: "category" };
  } else {
    return { url: "https://placehold.co/1920x1080", type: "placeholder" };
  }
});

const isStockOut = computed(() => {
  if (!productDetail.value) return false;
  return (
    !productDetail.value.qty ||
    productDetail.value.qty <= 0 ||
    productDetail.value.price <= 0
  );
});

const showPriceInfo = computed(() => {
  if (!productDetail.value) return false;
  const b = Number(productDetail.value.box_qty) || 1;
  const s = Number(productDetail.value.stripe_qty) || 1;
  const p = Number(productDetail.value.piece_qty) || 1;

  return b !== s || s !== p || b !== p;
});

const increaseQty = () => {
  quantity.value += 1;
};

const decreaseQty = () => {
  if (quantity.value > 1) quantity.value -= 1;
};

const addToCart = (prod) => {
  const totalPieces = quantity.value * unitMultiplier.value;

  cartStore.addToCart({
    ...prod,
    quantity: totalPieces,
  });
  push.success(`${prod.name} added to cart!`);

  // ✅ Meta Pixel AddToCart event
  if (typeof window.fbq === "function") {
    window.fbq("track", "AddToCart", {
      content_name: prod.name,
      content_ids: [String(prod.id)],
      content_type: "product",
      value: Number(prod.promotion_price ?? prod.price) * totalPieces,
    });
  }

  quantity.value = 1;
  selectedUnit.value = "piece";
};

const fullCategoryName = computed(() => {
  if (!productDetail.value?.category) return "";
  const cat = productDetail.value.category;
  return cat.parent ? `${cat.parent.name} > ${cat.name}` : cat.name;
});

// Fetch product based on slug in URL
async function loadProduct() {
  const slug = route.params.slug;
  const related = await fetchProductDetails(slug);
  productDetail.value = product.value;
  console.log(productDetail.value);
  // Filter out the current product from related products
  alternativeProducts.value = related.filter(
    (p) => p.id !== productDetail.value.id,
  );
}

onMounted(loadProduct);

// Refetch if route slug changes
watch(() => route.params.slug, loadProduct);
</script>
