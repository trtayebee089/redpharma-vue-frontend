<template>
    <div class="relative leading-relaxed mb-16">
        <div class="flex flex-col lg:flex-row lg:items-start gap-8">
            <!-- Desktop Cart Table -->
            <div class="hidden md:block flex-1">
                <h1 class="text-2xl font-bold mb-6 text-gray-700">My Cart</h1>

                <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-10">
                    Your cart is empty 🛒
                </div>

                <div v-else class="overflow-x-auto shadow">
                    <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden border-collapse">
                        <thead class="bg-green-200">
                            <tr>
                                <th class="px-4 py-2 text-left text-gray-700 font-semibold bg-green-100">Product</th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Price</th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Qty</th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Amount</th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-green-100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartItems" :key="item.id" class="last:border-b hover:bg-gray-50">
                                <!-- Product -->
                                <td class="px-4 py-3 flex items-center space-x-3">
                                    <img :src="item.image || 'https://placehold.co/400'"
                                        class="w-12 h-12 object-contain rounded border border-gray-200" />
                                    <span class="font-medium text-gray-800">{{ item . name }}</span>
                                </td>

                                <!-- Price -->
                                <td class="px-4 py-3 text-center text-gray-700">${{ item . price . toFixed(2) }}</td>

                                <!-- Quantity -->
                                <td class="px-4 py-3 text-center">
                                    <div
                                        class="inline-flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                                        <button @click="decreaseQty(item)" :disabled="item.quantity <= 1"
                                            class="w-6 h-6 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-green-400 hover:text-white rounded border border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition">-</button>
                                        <span
                                            class="w-6 h-6 flex items-center justify-center text-gray-800 font-medium">{{ item . quantity }}</span>
                                        <button @click="increaseQty(item)"
                                            class="w-6 h-6 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-green-400 hover:text-white rounded border border-gray-300 transition">+</button>
                                    </div>
                                </td>

                                <!-- Amount -->
                                <td class="px-4 py-3 text-center text-gray-700">
                                    ${{ item . price * item . quantity . toFixed(2) }}</td>

                                <!-- Action -->
                                <td class="px-4 py-3 text-center">
                                    <button @click="removeItem(item)"
                                        class="text-green-500 hover:text-green-700 font-semibold bg-green-50 px-2 py-1 rounded border border-green-200 hover:bg-green-100 transition">
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

                <div v-else v-for="item in cartItems" :key="item.id"
                    class="border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div class="flex items-center space-x-4">
                        <img :src="item.image || 'https://placehold.co/60'"
                            class="w-16 h-16 object-contain rounded border border-gray-200" />
                        <div class="flex-1">
                            <h3 class="font-medium text-gray-800">{{ item . name }}</h3>
                            <p class="text-sm text-gray-600 mt-1">Brand: {{ item . brand }}</p>
                            <p class="text-sm font-semibold text-green-600 mt-1">
                                ${{ item . price * item . quantity . toFixed(2) }}</p>
                        </div>
                        <button @click="removeItem(item)" class="text-red-500 hover:text-red-700 font-semibold text-lg">
                            ✕
                        </button>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="flex items-center justify-between mt-4">
                        <div
                            class="inline-flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                            <button @click="decreaseQty(item)" :disabled="item.quantity <= 1"
                                class="w-8 h-8 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-green-400 hover:text-white rounded border border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition">-</button>
                            <span
                                class="w-8 h-8 flex items-center justify-center text-gray-800 font-medium">{{ item . quantity }}</span>
                            <button @click="increaseQty(item)"
                                class="w-8 h-8 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-green-400 hover:text-white rounded border border-gray-300 transition">+</button>
                        </div>
                        <span class="text-gray-700 font-medium">${{ item . price . toFixed(2) }}</span>
                    </div>
                </div>
            </div>


            <!-- Right Column: Summary & Checkout Form -->
            <div class="w-full lg:w-1/3">
                <div class="border border-green-300 rounded-lg bg-gray-50 shadow-sm overflow-hidden">

                    <!-- Header -->
                    <div class="bg-green-100 px-6 py-4 border-b border-green-200">
                        <h2 class="text-lg font-bold text-green-700">Order Summary</h2>
                    </div>

                    <div class="px-6 py-4 space-y-4">

                        <!-- Subtotal & Shipping -->
                        <div class="flex justify-between text-gray-700 border-b border-gray-200 pb-2">
                            <span>Subtotal</span>
                            <span class="font-medium">${{ cartTotal . toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-gray-700 border-b border-gray-200 pb-2 pt-2">
                            <span>Shipping</span>
                            <span class="text-green-600 font-medium">Free</span>
                        </div>

                        <!-- Total -->
                        <div
                            class="flex justify-between font-bold text-lg text-gray-800 mt-4 border-t border-gray-300 pt-2">
                            <span>Total</span>
                            <span>${{ cartTotal . toFixed(2) }}</span>
                        </div>

                        <!-- Checkout Form -->
                        <form @submit.prevent="submitCheckout" class="mt-6 space-y-4">
                            <div>
                                <label class="block text-gray-700 mb-1">Full Name</label>
                                <input type="text" v-model="checkoutForm.fullName"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    required />
                            </div>

                            <div>
                                <label class="block text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" v-model="checkoutForm.phone"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    required />
                            </div>

                            <div>
                                <label class="block text-gray-700 mb-1">Address</label>
                                <textarea v-model="checkoutForm.address"
                                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-300 bg-white"
                                    rows="3" required></textarea>
                            </div>

                            <button type="submit"
                                class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 border border-green-600 font-semibold shadow-sm transition-all">
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
    import {
        useCartStore
    } from "@/stores/cart";
    import {
        computed,
        ref
    } from "vue";
    import PageTemplate from "../components/layout/PageTemplate.vue";

    const cartStore = useCartStore();

    // cart items
    const cartItems = computed(() => cartStore.items);

    // total
    const cartTotal = computed(() =>
        cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    // actions
    const increaseQty = (item) => {
        cartStore.updateQuantity(item.id, item.quantity + 1);
    };

    const decreaseQty = (item) => {
        if (item.quantity > 1) {
            cartStore.updateQuantity(item.id, item.quantity - 1);
        }
    };

    const removeItem = (item) => cartStore.removeFromCart(item.id);
    const checkoutForm = ref({
        fullName: "",
        phone: "",
        address: ""
    })

    const submitCheckout = () => {
        if (!cartStore.items.length) {
            alert("Your cart is empty!")
            return
        }

        // Handle checkout submission
        console.log("Checkout Data:", checkoutForm.value)
        console.log("Cart Items:", cartStore.items)

        // Example: clear cart after order
        cartStore.clearCart()
        alert("Order placed successfully!")

        // Reset form
        checkoutForm.value = {
            fullName: "",
            phone: "",
            address: ""
        }
    }
</script>
