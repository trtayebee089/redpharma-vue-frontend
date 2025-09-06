<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full">
    <!-- Product Image (full width, no padding) -->
    <img
      :src="product.image"
      alt=""
      class="w-full h-32 sm:h-36 md:h-40 object-contain rounded-t-lg bg-gray-200"
    />

    <!-- Content Below Image -->
    <div class="p-3 flex flex-col flex-1">
      <!-- Product Name -->
      <h3 class="font-medium text-gray-800 text-sm sm:text-base md:text-lg truncate">
        {{ product.name }}
      </h3>

      <!-- Strength & Pack Size -->
      <p class="text-xs sm:text-sm text-gray-600 mt-1">
        {{ product.strength }} | Pack: {{ product.packSize }}
      </p>

      <!-- Category -->
      <p class="text-xs sm:text-sm text-gray-500 mt-1">
        Category: {{ categoryName }}
      </p>

      <!-- Short Description -->
      <p class="text-xs sm:text-sm text-gray-600 flex-1 mt-1 line-clamp-2">
        {{ product.shortDescription }}
      </p>

      <!-- Quantity & Add to Cart -->
      <div class="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div class="flex items-center space-x-2">
          <!-- Decrease Quantity -->
          <button
            @click="decreaseQty"
            :disabled="quantity <= 1"
            :class="[
              'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border rounded-sm',
              quantity <= 1
                ? 'bg-gray-200 cursor-not-allowed border-gray-400 text-gray-700'
                : 'text-red-700 bg-red-200 hover:bg-red-400 hover:text-white border-red-400'
            ]"
          >
            <i class="pi pi-minus"></i>
          </button>

          <!-- Quantity -->
          <span
            class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-300 text-gray-800 rounded text-sm sm:text-base"
          >
            {{ quantity }}
          </span>

          <!-- Increase Quantity -->
          <button
            @click="increaseQty"
            class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-green-200 border border-green-400 rounded-sm text-green-600 text-sm sm:text-base"
          >
            <i class="pi pi-plus"></i>
          </button>
        </div>

        <!-- Add to Cart -->
        <button @click="addToCart" class="btn-add-to-cart w-full sm:w-auto">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { categories } from "@/data/categories.js";

const props = defineProps({
  product: { type: Object, required: true }
});

const quantity = ref(1);
const cartStore = useCartStore();

const decreaseQty = () => { if (quantity.value > 1) quantity.value--; };
const increaseQty = () => { quantity.value++; };
const addToCart = () => { cartStore.addToCart({ ...props.product, quantity: quantity.value }); quantity.value = 1; };

// Category name from categoryId
const categoryName = computed(() => {
  const cat = categories.find(c => c.id === props.product.categoryId);
  return cat ? cat.name : "Unknown";
});
</script>

<style scoped>
.btn-add-to-cart {
  border-radius: 30px;
  font-family: Inter, sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.2px;
  line-height: 1.5rem;
  padding: 8px 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #22c55e; /* Tailwind green-500 */
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.btn-add-to-cart:hover {
  background-color: #16a34a; /* Tailwind green-600 */
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}
.btn-add-to-cart::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
  z-index: 0;
}
.btn-add-to-cart:hover::after {
  width: 200%;
  height: 500%;
}
.btn-add-to-cart > * { position: relative; z-index: 1; }
</style>
