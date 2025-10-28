<template>
    <div class="relative leading-relaxed mb-16 pt-6">
        <!-- Parent flex container -->
        <div class="flex flex-col xl:flex-row xl:items-start gap-8">

            <!-- Left Section: Cart Items -->
            <div class="flex-1 order-1">
                <!-- Desktop Cart Table -->
                <div class="hidden md:block">
                    <div
                        class="max-w-5xl mx-auto text-center leading-relaxed bg-green-100 rounded-lg p-6 relative overflow-hidden mb-6 border border-green-100">
                        <!-- Decorative background pattern -->
                        <div class="absolute inset-0 opacity-10 pointer-events-none">
                            <svg class="w-full h-full" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M20 0 L0 0 0 20" fill="none" stroke="#08CB00" stroke-width="2.0" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)"></rect>
                            </svg>
                        </div>

                        <h1 class="text-3xl md:text-4xl font-bold text-green-600 leading-relaxed mb-2 relative z-10"
                            :class="langStore.langClass">
                            {{ $t('cart.title') }}
                        </h1>

                        <p class="text-gray-700 text-lg md:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto"
                            :class="langStore.langClass">
                            {{ $t('cart.description') }}
                        </p>
                    </div>

                    <div v-if="cartItems.length === 0">
                        <Alert :severity="'warn'" :message="$t('cart.alert')" />
                    </div>

                    <div v-else class="overflow-x-auto shadow">
                        <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden border-collapse">
                            <thead class="bg-green-200">
                                <tr>
                                    <th class="px-4 py-2 text-left text-gray-700 font-semibold bg-green-100">Product
                                    </th>
                                    <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Price
                                    </th>
                                    <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Qty</th>
                                    <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Amount
                                    </th>
                                    <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cartItems" :key="item.id" class="last:border-b hover:bg-gray-50">
                                    <!-- Product -->
                                    <td class="px-4 py-3 flex items-center space-x-3">
                                        <template v-if="getImageUrl(item)">
                                            <img :src="getImageUrl(item).url" :class="[
                                                'object-contain rounded border border-gray-200',
                                                getImageUrl(item).type === 'category' ? 'w-8 h-8' : 'w-12 h-12'
                                            ]" />
                                        </template>
                                        <span class="font-medium text-gray-800">{{ item.name }}</span>
                                    </td>

                                    <!-- Price -->
                                    <td class="px-4 py-3 text-center text-gray-700">
                                        {{ (Number(item.offerPrice ?? item.price) || 0).toFixed(2) }} Tk
                                    </td>

                                    <!-- Quantity -->
                                    <td class="px-4 py-3 text-center">
                                        <div
                                            class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-sm">
                                            <!-- Decrease -->
                                            <button @click="decreaseQty(item)" :disabled="quantity <= 1 || isStockOut"
                                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                                <i class="pi pi-minus"></i>
                                            </button>

                                            <!-- Quantity Input -->
                                            <input type="number" v-model.number="item.
                                                quantity" min="1"
                                                class="w-16 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-none" />

                                            <!-- Increase -->
                                            <button @click="increaseQty(item)" :disabled="isStockOut"
                                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                                <i class="pi pi-plus"></i>
                                            </button>
                                        </div>
                                    </td>

                                    <!-- Amount -->
                                    <td class="px-4 py-3 text-center text-gray-700">
                                        {{ (Number(item.offerPrice ?? item.price) || 0) * (Number(item.quantity) || 1)
                                            .toFixed(2) }} Tk
                                    </td>

                                    <!-- Action -->
                                    <td class="px-4 py-3 text-center">
                                        <button @click="removeItem(item)"
                                            class="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-2 py-1 rounded border border-red-200 hover:bg-red-300 transition">
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Mobile Cart Cards -->
                <div class="md:hidden flex flex-col gap-4">
                    <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-10">
                        Your cart is empty 🛒
                    </div>

                    <div v-else>
                        <div
                            class="max-w-5xl mx-auto text-center leading-relaxed bg-green-100 rounded-lg p-6 relative overflow-hidden mb-6 border border-green-100">
                            <!-- Decorative background pattern -->
                            <div class="absolute inset-0 opacity-10 pointer-events-none">
                                <svg class="w-full h-full" preserveAspectRatio="none">
                                    <defs>
                                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M20 0 L0 0 0 20" fill="none" stroke="#08CB00" stroke-width="2.0" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)"></rect>
                                </svg>
                            </div>

                            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 leading-relaxed mb-2 relative z-10"
                                :class="langStore.langClass">
                                {{ $t('cart.title') }}
                            </h1>

                            <p class="text-gray-700 text-md md:text-lg lg:text-lg leading-relaxed relative z-10 max-w-2xl mx-auto"
                                :class="langStore.langClass">
                                {{ $t('cart.description') }}
                            </p>
                        </div>

                        <div v-for="item in cartItems" :key="item.id"
                            class="border border-gray-200 rounded-lg p-4 shadow-sm mb-3">
                            <div class="flex items-center space-x-4">
                                <template v-if="getImageUrl(item)">
                                    <img :src="getImageUrl(item).url" :class="[
                                        'object-contain rounded border border-gray-200',
                                        getImageUrl(item).type === 'category' ? 'w-8 h-8' : 'w-12 h-12'
                                    ]" />
                                </template>
                                <div class="flex-1">
                                    <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
                                    <p class="text-sm text-gray-600 mt-1">
                                        Brand: {{ item.brand?.title || 'N/A' }}
                                    </p>
                                    <p class="text-sm font-semibold text-green-600 mt-1">
                                        {{ (Number(item.promotion_price ?? item.price) || 0).toFixed(2) }} Tk
                                    </p>
                                </div>
                                <button @click="removeItem(item)"
                                    class="text-red-500 hover:text-red-700 font-semibold text-lg">
                                    ✕
                                </button>
                            </div>

                            <!-- Quantity Controls -->
                            <div class="flex items-center justify-between mt-4">
                                <div
                                    class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-sm">
                                    <!-- Decrease -->
                                    <button @click="decreaseQty" :disabled="quantity <= 1 || isStockOut"
                                        class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                        <i class="pi pi-minus"></i>
                                    </button>

                                    <!-- Quantity Input -->
                                    <input type="number" v-model.number="item.
                                        quantity" min="1"
                                        class="w-16 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-none" />

                                    <!-- Increase -->
                                    <button @click="increaseQty" :disabled="isStockOut"
                                        class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                        <i class="pi pi-plus"></i>
                                    </button>
                                </div>
                                <span class="text-gray-700 font-medium">{{ (Number(item.offerPrice ?? item.price) || 0)
                                    *
                                    (Number(item.quantity) || 1).toFixed(2) }} Tk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Summary & Checkout Form -->
            <div v-if="cartStore.items.length" class="w-full xl:w-1/3 order-2 mt-6 xl:mt-0 xl:order-2">
                <div class="border border-green-300 rounded-lg bg-gray-50 shadow-sm overflow-hidden">
                    <!-- Header -->
                    <div class="bg-green-100 px-6 py-4 border-b border-green-200">
                        <h2 class="text-lg font-bold text-green-700">Order Summary</h2>
                    </div>

                    <div class="px-6 py-4 space-y-4">
                        <!-- Checkout Form -->
                        <form @submit.prevent="submitCheckout" class="mt-0 space-y-4">
                            <div>
                                <label class="block text-gray-700 mb-1">Full Name <span
                                        class="required">*</span></label>
                                <input type="text" v-model="checkoutForm.fullName"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    required />
                            </div>

                            <div>
                                <label class="block text-gray-700 mb-1">Phone Number <span
                                        class="required">*</span></label>
                                <input type="tel" v-model="checkoutForm.phone"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    required />
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label class="block text-gray-700">Division <span class="required">*</span></label>
                                    <select v-model="checkoutForm.division" @change="onDivisionChange"
                                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                        required>
                                        <option value="" disabled>Select Division</option>
                                        <option v-for="zone in shippingZones" :key="zone.id" :value="zone.division">
                                            {{ zone.division }}
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-gray-700">District <span class="required">*</span></label>
                                    <select v-model="checkoutForm.district" :disabled="!checkoutForm.division"
                                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                        required>
                                        <option value="" disabled>Select District</option>
                                        <option v-for="zone in shippingZones" :key="district" :value="zone.district">
                                            {{ zone.district }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-gray-700 mb-1">Address <span class="required">*</span></label>
                                <textarea v-model="checkoutForm.address"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    rows="3" required></textarea>
                            </div>

                            <!-- Subtotal & Shipping -->
                            <div class="flex justify-between text-gray-700 pb-2">
                                <span>Subtotal</span>
                                <span class="font-medium">{{ cartStore.cartSubtotal.toFixed(2) }} Tk</span>
                            </div>
                            <div class="flex justify-between text-gray-700 pb-2">
                                <span>Shipping</span>
                                <span class="text-green-600 font-medium">{{ cartStore.shippingRate }} Tk</span>
                            </div>

                            <template
                                v-if="authStore.isAuthenticated && authStore.membershipInfo && authStore.rewardPointSettings.minimum_amount <= cartStore.cartSubtotal && authStore.membershipInfo?.discount > 0">
                                <!-- Apply Discount Toggle -->
                                <div class="flex justify-between items-center text-gray-700 pb-2"
                                    v-if="authStore.membershipInfo?.discount > 0">
                                    <p>
                                        <span>Apply Discount ({{ authStore.membershipInfo.discount }}%)</span>
                                    </p>

                                    <!-- Toggle Switch -->
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer" v-model="cartStore.applyDiscount" />
                                        <div
                                            class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-200">
                                        </div>
                                        <div
                                            class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-5 transition-all duration-200">
                                        </div>
                                    </label>
                                </div>

                                <!-- Discount Amount (only visible if toggle ON) -->
                                <div class="flex justify-between text-gray-700 pb-2"
                                    v-if="authStore.membershipInfo?.discount > 0 && cartStore.applyDiscount">
                                    <p>
                                        <span>Discount</span>
                                    </p>
                                    <span class="text-green-600 font-medium">
                                        {{ cartStore.membershipDiscount.toFixed(2) }} Tk
                                    </span>
                                </div>
                            </template>

                            <!-- Payment Gateway -->
                            <div class="flex justify-between text-gray-700 pb-2">
                                <span>Payment Method</span>
                                <span class="font-medium">Cash on Delivery</span>
                            </div>

                            <!-- Total -->
                            <div
                                class="flex justify-between font-bold text-lg text-gray-800 mt-4 border-t border-gray-300 pt-2">
                                <span>Grand Total</span>
                                <span>{{ cartStore.totalAmount.toFixed(2) }} Tk</span>
                            </div>

                            <button type="submit"
                                class="w-full bg-green-500 text-white py-2 rounded hover:border-red-300 hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800 border border-green-600 font-semibold shadow-sm transition-all">
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { useLanguageStore } from "@/stores/language";
import Alert from "@/components/common/Alert.vue";
import { useCheckout } from "@/composables/useCheckout";

const authStore = useAuthStore();
const cartStore = useCartStore();
const langStore = useLanguageStore();
const router = useRouter();
const { t } = useI18n();
const { submitOrder, shippingZones, getShippingZones, getShippingRate } = useCheckout();

const checkoutForm = reactive({
    fullName: authStore.user?.name || '',
    phone: authStore.user?.phone_number || '',
    address: authStore.user?.address || '',
    division: authStore.user?.division || '',
    district: authStore.user?.district || '',
});

function onDivisionChange() {
    checkoutForm.district = "";
}

const cartItems = computed(() => cartStore.items);

const getImageUrl = (product) => {
    const prodImage = product.image?.trim();
    const catImage = product.category?.image?.trim();

    if (prodImage && !prodImage.includes("https://placehold.co") && !prodImage.includes("no-image.png")) {
        return { url: prodImage, type: 'product' };
    }
    else if (catImage && !catImage.includes("https://placehold.co") && !catImage.includes("no-image.png")) {
        return { url: catImage, type: 'category' };
    }
    else {
        return { url: "https://placehold.co/1920x1080", type: 'placeholder' };
    }
};

const increaseQty = (item) => cartStore.updateQuantity(item.id, item.quantity + 1);
const decreaseQty = (item) => {
    if (item.quantity > 1) cartStore.updateQuantity(item.id, item.quantity - 1);
};
const removeItem = (item) => cartStore.removeFromCart(item.id);

const submitCheckout = async () => {
    if (!cartStore.items.length) {
        alert("Your cart is empty!");
        return;
    }

    try {
        const result = await submitOrder(checkoutForm);
        if (result?.success) {
            cartStore.clearCart();
            checkoutForm.fullName = '';
            checkoutForm.phone = '';
            checkoutForm.address = '';
            if (authStore.token) {
                await authStore.fetchUser();
            }

            router.push({
                name: "OrderConfirmation",
                params: { order_id: result.sale.id },
                state: { order: result.sale, tracking: result.tracking, isNewCustomer: result.is_new_customer, temporaryPassword: result.temporary_password }
            });
        }
    } catch (err) {
        console.error(err);
        alert("Failed to place order. Please try again.");
    }
};

watch(
    () => checkoutForm.division,
    (division) => {
        checkoutForm.district = "";

        const rate = getShippingRate(division, null);
        if (rate === null) {
            alert(`❌ Sorry, we currently do not deliver to ${division}.`);
            checkoutForm.division = "";
            cartStore.shippingRate = 0;
        } else {
            cartStore.shippingRate = rate; // use default rate for the division
        }
    }
);

watch(
    () => checkoutForm.district,
    (district) => {
        const rate = getShippingRate(checkoutForm.division, district);
        if (rate === null) {
            alert(`❌ Sorry, we currently do not deliver to ${district}.`);
            checkoutForm.district = "";
            cartStore.shippingRate = getShippingRate(checkoutForm.division, null);
        } else {
            cartStore.shippingRate = rate;
        }
    }
);

onMounted(async () => {
    if (!authStore.rewardPointTiers.length) {
        await authStore.fetchRewardPointTiers();
    }
    await getShippingZones();
    console.log(shippingZones.value);
});
</script>

<style scoped>
.required {
    color: red;
    font-size: 18px;
}
</style>