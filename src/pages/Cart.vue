<template>
    <div class="cart-page relative leading-relaxed mb-16">
        <header class="cart-heading">
            <h1>{{ $t('cart.title') }}</h1>
            <span v-if="cartItems.length">
                {{ $t('cart.itemCount', { count: n(cartItems.length) }, cartItems.length) }}
            </span>
        </header>

        <!-- Parent flex container -->
        <div class="cart-layout">

            <!-- Left Section: Cart Items -->
            <div class="min-w-0">
                <div v-if="cartItems.length === 0" class="cart-empty">
                    <span class="cart-empty-icon"><i class="pi pi-shopping-cart" aria-hidden="true"></i></span>
                    <h2>{{ $t('cart.emptyTitle') }}</h2>
                    <router-link to="/categories">{{ $t('cart.browseCategories') }}</router-link>
                </div>

                <!-- Desktop Cart Table -->
                <div v-else class="hidden md:block">
                    <div class="cart-table overflow-x-auto">
                        <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden border-collapse">
                            <thead class="bg-green-200">
                                <tr>
                                    <th scope="col" class="text-left">{{ $t('cart.table.thead.product') }}</th>
                                    <th scope="col">{{ $t('cart.table.thead.price') }}</th>
                                    <th scope="col">{{ $t('cart.table.thead.qty') }}</th>
                                    <th scope="col">{{ $t('cart.table.thead.total') }}</th>
                                    <th scope="col">{{ $t('cart.table.thead.action') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cartItems" :key="item.id" class="last:border-b hover:bg-gray-50">
                                    <!-- Product -->
                                    <td class="px-4 py-3">
                                        <div class="flex items-center gap-3">
                                            <img v-if="getImageUrl(item)" :src="getImageUrl(item).url"
                                                @error="retryProductImage($event, getImageUrl(item).fallbackUrl)"
                                                alt="" class="cart-product-image" />
                                            <span class="font-medium text-gray-800">{{ item.name }}</span>
                                        </div>
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
                                            <button @click="updateQty(item, item.quantity - 1)" :disabled="item.quantity <= 1"
                                                :aria-label="$t('cart.decreaseQuantity')"
                                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                                <i class="pi pi-minus"></i>
                                            </button>

                                            <!-- Quantity Input -->
                                            <input
                                                type="number"
                                                v-model.number="item.quantity"
                                                :aria-label="$t('cart.table.thead.qty')"
                                                @input="handleManualInput(item)"
                                                min="1"
                                                :max="item.stock_qty ?? undefined"
                                                class="w-16 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-none" />

                                            <!-- Increase -->
                                            <button @click="updateQty(item, item.quantity + 1)"
                                                :aria-label="$t('cart.increaseQuantity')"
                                                :disabled="item.stock_qty != null && item.quantity >= item.stock_qty"
                                                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200"
                                                :title="item.stock_qty != null && item.quantity >= item.stock_qty ? $t('cart.maximumStock') : ''">
                                                <i class="pi pi-plus"></i>
                                            </button>
                                        </div>
                                        <!-- Stock badge -->
                                        <p v-if="item.stock_qty != null" class="text-xs text-gray-400 mt-1">
                                            {{ $t('cart.available', { count: n(Number(item.stock_qty)) }) }}
                                        </p>
                                    </td>

                                    <!-- Amount -->
                                    <td class="px-4 py-3 text-center text-gray-700">
                                        {{ ((Number(item.offerPrice ?? item.price) || 0) * (Number(item.quantity) ||
                                            1)).toFixed(2) }} Tk
                                    </td>

                                    <!-- Action -->
                                    <td class="px-4 py-3 text-center">
                                        <button @click="removeItem(item)" :aria-label="$t('cart.removeProduct', { name: item.name })"
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
                <div v-if="cartItems.length" class="md:hidden">
                    <div class="grid gap-3">
                        <div v-for="item in cartItems" :key="item.id"
                            class="cart-item-card">
                            <div class="flex items-start gap-3">
                                <img v-if="getImageUrl(item)" :src="getImageUrl(item).url"
                                    @error="retryProductImage($event, getImageUrl(item).fallbackUrl)"
                                    alt="" class="cart-product-image" />
                                <div class="min-w-0 flex-1">
                                    <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
                                    <p v-if="item.brand?.title" class="text-sm text-gray-600 mt-1">{{ item.brand.title }}</p>
                                    <p class="text-sm text-gray-600 mt-1">
                                        {{ (Number(item.offerPrice ?? item.price) || 0).toFixed(2) }} Tk
                                    </p>
                                </div>
                                <button @click="removeItem(item)" :aria-label="$t('cart.removeProduct', { name: item.name })"
                                    class="cart-remove-mobile text-red-500 hover:text-red-700 font-semibold text-lg">
                                    ✕
                                </button>
                            </div>

                            <!-- Quantity Controls -->
                            <div class="cart-item-controls flex items-center justify-between gap-2 mt-3">
                                <div
                                    class="inline-flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden shadow-sm">
                                    <!-- Decrease -->
                                    <button @click="updateQty(item, item.quantity - 1)" :disabled="item.quantity <= 1"
                                        :aria-label="$t('cart.decreaseQuantity')"
                                        class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200">
                                        <i class="pi pi-minus"></i>
                                    </button>

                                    <!-- Quantity Input -->
                                    <input
                                        type="number"
                                        v-model.number="item.quantity"
                                        :aria-label="$t('cart.table.thead.qty')"
                                        @input="handleManualInput(item)"
                                        min="1"
                                        :max="item.stock_qty ?? undefined"
                                        class="w-16 text-center text-gray-800 font-medium bg-white border-l border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all rounded-none" />

                                    <!-- Increase -->
                                    <button @click="updateQty(item, item.quantity + 1)"
                                        :aria-label="$t('cart.increaseQuantity')"
                                        :disabled="item.stock_qty != null && item.quantity >= item.stock_qty"
                                        class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors disabled:text-gray-400 disabled:bg-gray-200"
                                        :title="item.stock_qty != null && item.quantity >= item.stock_qty ? $t('cart.maximumStock') : ''">
                                        <i class="pi pi-plus"></i>
                                    </button>
                                </div>
                                <div class="text-right">
                                    <span class="text-gray-700 font-medium">
                                        {{ ((Number(item.offerPrice ?? item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2) }} Tk
                                    </span>
                                    <p v-if="item.stock_qty != null" class="text-xs text-gray-400 mt-0.5">
                                        {{ $t('cart.available', { count: n(Number(item.stock_qty)) }) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Summary & Checkout Form -->
            <div v-if="cartStore.items.length" class="min-w-0">
                <div class="checkout-card">
                    <!-- Header -->
                    <div class="checkout-heading">
                        <h2>{{ $t('cart.summary') }}</h2>
                    </div>

                    <div class="checkout-body">
                        <!-- Checkout Form -->
                        <form @submit.prevent="submitCheckout" class="mt-0 space-y-4">
                            <h3 class="checkout-section-title">{{ $t('cart.deliveryDetails') }}</h3>
                            <div>
                                <label for="checkout-name">{{ $t('cart.form.name') }} <span
                                        class="required" aria-hidden="true">*</span></label>
                                <input id="checkout-name" type="text" v-model="checkoutForm.fullName" autocomplete="name"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    required />
                            </div>

                            <div>
                                <label for="checkout-phone">{{ $t('cart.form.phone') }} <span
                                        class="required" aria-hidden="true">*</span></label>
                                <input id="checkout-phone" type="tel" v-model="checkoutForm.phone" autocomplete="tel"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    required />
                            </div>

                            <div class="grid grid-cols-2 gap-3">
                                <!-- Division -->
                                <div>
                                    <label for="checkout-division">{{ $t('cart.form.division') }} <span class="required" aria-hidden="true">*</span></label>
                                    <select id="checkout-division" v-model="checkoutForm.division" @change="onDivisionChange"
                                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                        required>
                                        <option value="" disabled>{{ $t('cart.form.selectDivision') }}</option>
                                        <option v-for="division in uniqueDivisions" :key="division" :value="division">
                                            {{ division }}
                                        </option>
                                    </select>
                                </div>

                                <!-- District -->
                                <div>
                                    <label for="checkout-district">{{ $t('cart.form.district') }} <span class="required" aria-hidden="true">*</span></label>
                                    <select id="checkout-district" v-model="checkoutForm.district" :disabled="!checkoutForm.division"
                                        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                        required>
                                        <option value="" disabled>{{ $t('cart.form.selectDistrict') }}</option>
                                        <option v-for="zone in filteredDistricts" :key="zone.id" :value="zone.district">
                                            {{ zone.district }}
                                        </option>
                                    </select>
                                </div>
                            </div>


                            <div>
                                <label for="checkout-address">{{ $t('cart.form.address') }} <span class="required" aria-hidden="true">*</span></label>
                                <textarea id="checkout-address" v-model="checkoutForm.address" autocomplete="street-address"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    rows="3" required></textarea>
                            </div>

                            <!-- Subtotal & Shipping -->
                            <div class="checkout-line checkout-line-first">
                                <span>{{ $t('cart.subtotal') }}</span>
                                <span class="font-medium">{{ cartStore.cartSubtotal.toFixed(2) }} Tk</span>
                            </div>
                            <div class="checkout-line">
                                <span>{{ $t('cart.shipping') }}</span>
                                <span class="text-green-600 font-medium">{{ cartStore.shippingRate }} Tk</span>
                            </div>

                            <template
                                v-if="authStore.isAuthenticated && authStore.membershipInfo && authStore.rewardPointSettings.minimum_amount <= cartStore.cartSubtotal && authStore.membershipInfo?.discount > 0">
                                <!-- Apply Discount Toggle -->
                                <div class="checkout-line items-center"
                                    v-if="authStore.membershipInfo?.discount > 0">
                                    <p>
                                        <span>{{ $t('cart.applyDiscount', { rate: n(Number(authStore.membershipInfo.discount)) }) }}</span>
                                    </p>

                                    <!-- Toggle Switch -->
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer" v-model="cartStore.applyDiscount"
                                            :aria-label="$t('cart.applyDiscount', { rate: n(Number(authStore.membershipInfo.discount)) })" />
                                        <div
                                            class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-200">
                                        </div>
                                        <div
                                            class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-5 transition-all duration-200">
                                        </div>
                                    </label>
                                </div>
                            </template>

                            <!-- Discount Amount (only visible if toggle ON) -->
                            <div class="checkout-line" v-if="cartStore.applyDiscount">
                                <p>
                                    <span>{{ $t('cart.discount') }}</span>
                                    <span class="ml-2">({{ n(Number(cartStore.discountRate)) }}%)</span>
                                </p>
                                <span class="text-green-600 font-medium">
                                    {{ cartStore.membershipDiscount.toFixed(2) }} Tk
                                </span>
                            </div>

                            <!-- Payment Gateway -->
                            <div class="checkout-line">
                                <span>{{ $t('cart.paymentMethod') }}</span>
                                <span class="font-medium">{{ $t('cart.cashOnDelivery') }}</span>
                            </div>

                            <!-- Total -->
                            <div class="checkout-total">
                                <span>{{ $t('cart.grand') }}</span>
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
import { getProductImage as getImageUrl, retryProductImage } from "@/utils/productImage";
import { computed, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { push } from 'notivue';

import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { useCheckout } from "@/composables/useCheckout";

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();
const { t, n } = useI18n();
const { submitOrder, shippingZones, getShippingZones, getShippingRate, error } = useCheckout();

/**
 * Show a notification using Notivue (the app's active toast library).
 * severity: 'warn' | 'error' | 'success'
 */
const showToast = (message, severity = 'warn') => {
    if (severity === 'error') {
        push.error({ title: 'Error', message });
    } else if (severity === 'success') {
        push.success({ title: 'Success', message });
    } else {
        push.warning({ title: 'Stock Limit', message });
    }
};

const checkoutForm = reactive({
    fullName: authStore.user?.name || '',
    phone: authStore.user?.phone_number || '',
    address: authStore.user?.address || '',
    division: authStore.user?.division || '',
    district: authStore.user?.district || '',
});

const uniqueDivisions = computed(() => {
    const divisions = shippingZones.value
        .filter(z => z.is_active)
        .map(z => z.division);
    return [...new Set(divisions)];
});

const filteredDistricts = computed(() => {
    if (!checkoutForm.division) return [];
    return shippingZones.value.filter(
        z => z.is_active && z.division === checkoutForm.division
    );
});

function onDivisionChange() {
    checkoutForm.district = "";
}

const cartItems = computed(() => cartStore.items);

// ─── Quantity controls with stock-cap enforcement ───────────────────────────

/**
 * Central qty updater. Enforces stock cap, shows toast, auto-resets.
 * Used by + button, - button, and the manual input handler.
 */
const updateQty = (item, newQty) => {
    if (item.qty != null && newQty > item.qty) {
        cartStore.updateQuantity(item.id, item.qty);
        showToast(`Only ${item.qty} item(s) available in stock for ${item.name}`);
        console.log(`Only ${item.qty} item(s) available in stock for ${item.name}.`);
        return;
    }
    if (newQty < 1 || isNaN(newQty)) {
        cartStore.updateQuantity(item.id, 1);
        return;
    }
    cartStore.updateQuantity(item.id, newQty);
};

/**
 * Handles manual typing in the quantity input.
 * v-model.number keeps it numeric; @input fires on every keystroke.
 */
const handleManualInput = (item) => {
    const val = Number(item.quantity);
    if (isNaN(val) || val < 1) {
        cartStore.updateQuantity(item.id, 1);
        return;
    }
    if (item.stock_qty != null && val > item.stock_qty) {
        cartStore.updateQuantity(item.id, item.stock_qty);
        showToast(`Only ${item.stock_qty} item(s) available in stock.`);
    } else {
        cartStore.updateQuantity(item.id, val);
    }
};

const removeItem = (item) => cartStore.removeFromCart(item.id);

const submitCheckout = async () => {
    if (!cartStore.items.length) {
        alert("Your cart is empty!");
        return;
    }

    // ✅ Snapshot cart data BEFORE the API call so it survives clearCart()
    const cartSnapshot = cartStore.items.map(item => ({
        id: String(item.id),
        quantity: item.quantity,
        item_price: Number(item.offerPrice ?? item.price) || 0
    }));
    const totalValue = cartStore.totalAmount;

    try {
        const result = await submitOrder(checkoutForm);

        if (!result?.success) {
            throw new Error("Order failed");
        }

        checkoutForm.fullName = '';
        checkoutForm.phone = '';
        checkoutForm.address = '';
        console.log(result)
        if (result.token && result.user) {
            authStore.setAuth(result.user, result.token);
        }

        sessionStorage.setItem('order_temp_data', JSON.stringify({
            order_id: result.sale.id,
            isNewCustomer: result.is_new_customer,
            temporaryPassword: result.temporary_password
        }));

        // ✅ META PURCHASE EVENT — fire BEFORE clearCart, use snapshotted data
        if (typeof window.fbq === 'function') {
            const saleTotal = parseFloat(result.sale?.total ?? result.sale?.grand_total ?? result.total) || totalValue;
            const eventID = 'purchase_' + result.sale.id + '_' + Date.now();
            window.fbq('track', 'Purchase', {
                value: saleTotal,
                content_ids: cartSnapshot.map(item => item.id),
                contents: cartSnapshot,
                content_type: 'product',
                num_items: cartSnapshot.length
            }, { eventID: eventID });
            console.log('[Meta Pixel] Purchase event fired', { eventID, value: saleTotal });
        } else {
            console.warn('[Meta Pixel] fbq not available — Purchase event skipped');
        }

        cartStore.clearCart();

        router.push({
            name: "OrderConfirmation",
            params: { order_id: result.sale.id }
        });
    } catch (err) {
        console.error(err);

        // ── Handle stock 422 from backend ──────────────────────────────
        if (err?.response?.status === 422) {
            const data = err.response.data;
            showToast(data.message || 'Stock limit exceeded.', 'error');

            // Auto-correct the offending item quantity in the cart
            if (data.product_id && data.available_stock != null) {
                cartStore.updateQuantity(data.product_id, data.available_stock);
            }
            return;
        }

        if (error.value) {
            const message = typeof error.value === 'string'
                ? error.value
                : Object.values(error.value).flat().join('\n');
            showToast(message, 'error');
        } else {
            showToast('Failed to place order. Please try again.', 'error');
        }
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
            cartStore.shippingRate = rate;
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
});
</script>

<style scoped>
.cart-page {
    max-width: 88rem;
    margin-inline: auto;
}

.cart-layout {
    display: grid;
    gap: 24px;
    align-items: start;
}

.cart-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 2px 12px;
    margin-bottom: 14px;
}

.cart-heading h1 {
    color: #173e2c;
    font-size: clamp(1.375rem, 2.5vw, 1.75rem);
    font-weight: 750;
    line-height: 1.3;
}

.cart-heading span {
    color: #496154;
    font-size: .875rem;
}

.cart-table,
.cart-item-card,
.cart-empty,
.checkout-card {
    border: 1px solid #dce8e0;
    border-radius: 13px;
    background: #fff;
    box-shadow: 0 2px 8px rgb(20 61 42 / 4%);
}

.cart-table th {
    padding: 12px;
    background: #f1f8f3;
    color: #244e3a;
    font-size: .8125rem;
    white-space: nowrap;
}

.cart-table td {
    border-top: 1px solid #e9efeb;
}

.cart-table :is(th, td):not(:first-child) {
    text-align: center;
    white-space: nowrap;
}

.cart-product-image {
    flex: none;
    width: 48px;
    height: 48px;
    padding: 3px;
    border: 1px solid #e3ebe5;
    border-radius: 8px;
    background: #f7faf8;
    object-fit: contain;
}

.cart-item-card {
    padding: 14px;
}

.cart-remove-mobile {
    min-width: 36px;
    min-height: 36px;
    border-radius: 8px;
    background: #fff4f4;
}

.cart-item-controls {
    padding-top: 12px;
    border-top: 1px solid #edf1ee;
}

.cart-empty {
    display: grid;
    justify-items: center;
    gap: 13px;
    padding: clamp(24px, 6vw, 56px) 16px;
    color: #173e2c;
    text-align: center;
}

.cart-empty h2 {
    font-size: 1.1rem;
    font-weight: 700;
}

.cart-empty-icon {
    display: grid;
    width: 52px;
    height: 52px;
    place-items: center;
    border-radius: 14px;
    background: #e4f4e9;
    color: #176742;
    font-size: 1.2rem;
}

.cart-empty a {
    padding: 9px 14px;
    border-radius: 8px;
    background: #176742;
    color: #fff;
    font-size: .875rem;
    font-weight: 600;
}

.checkout-card {
    overflow: hidden;
}

.checkout-heading {
    padding: 15px 18px;
    border-bottom: 1px solid #dce8e0;
    background: #f1f8f3;
    color: #173e2c;
    font-size: 1.125rem;
    font-weight: 700;
}

.checkout-body {
    padding: 16px 18px;
}

.checkout-section-title {
    color: #173e2c;
    font-size: .9375rem;
    font-weight: 700;
}

.checkout-body label[for] {
    display: block;
    margin-bottom: 4px;
    color: #394e42;
    font-size: .875rem;
    font-weight: 600;
}

.checkout-body :is(input:not([type="checkbox"]), select, textarea) {
    min-height: 42px;
    border-color: #d4e2d9;
    border-radius: 8px;
    color: #173e2c;
}

.checkout-body select:disabled {
    background: #f4f7f5;
}

.checkout-line,
.checkout-total {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    color: #394e42;
    font-size: .875rem;
}

.checkout-body .checkout-line {
    margin-bottom: 8px;
}

.checkout-line-first,
.checkout-total {
    padding-top: 12px;
    border-top: 1px solid #e4ebe6;
}

.checkout-total {
    color: #173e2c;
    font-size: 1.0625rem;
    font-weight: 750;
}

.checkout-body button[type="submit"] {
    min-height: 44px;
    border-color: #176742;
    border-radius: 9px;
    background: #176742;
}

.checkout-body button[type="submit"]:hover,
.cart-empty a:hover {
    border-color: #105335;
    background: #105335;
}

.cart-page :is(a, button):focus-visible {
    outline: 2px solid #218158;
    outline-offset: 2px;
}

.required {
    color: #ad2431;
}

@media (min-width: 1280px) {
    .cart-layout:has(.checkout-card) {
        grid-template-columns: minmax(0, 1fr) minmax(320px, 36%);
    }
}
</style>
