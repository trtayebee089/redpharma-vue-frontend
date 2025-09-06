<script setup>
    import {
        useCartStore
    } from "@/stores/cart";
    import {
        computed,
        ref
    } from "vue";

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

<template>
    <div class="container mx-auto md:px-6 px-4 py-40">
        <div class="flex flex-col lg:flex-row lg:items-start gap-8">
            <!-- Left Column: Cart Items -->
            <div class="flex-1">
                <h1 class="text-2xl font-bold mb-6 text-gray-700">My Cart</h1>

                <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-10">
                    Your cart is empty 🛒
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-4 py-2 text-left text-gray-700 font-semibold bg-gray-200 border-b">Product
                                </th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-gray-200 border-b">Price
                                </th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-gray-200 border-b">Qty
                                </th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-gray-200 border-b">
                                    Amount</th>
                                <th class="px-4 py-2 text-center text-gray-700 font-semibold bg-gray-200 border-b">
                                    Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartItems" :key="item.id"
                                class="border-b last:border-b-0 hover:bg-gray-50">
                                <!-- Product -->
                                <td class="px-4 py-3 flex items-center space-x-3 border-l">
                                    <img :src="item.image || 'https://via.placeholder.com/60'"
                                        class="w-12 h-12 object-contain rounded border border-gray-200" />
                                    <span class="font-medium text-gray-800">{{ item . name }}</span>
                                </td>

                                <!-- Price -->
                                <td class="px-4 py-3 text-center text-gray-700">${{ item . price . toFixed(2) }}</td>

                                <!-- Quantity -->
                                <td class="px-4 py-3 text-center">
                                    <div
                                        class="inline-flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                                        <!-- Decrease Quantity -->
                                        <button @click="decreaseQty(item)" :disabled="item.quantity <= 1"
                                            class="w-6 h-6 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-red-400 hover:text-white rounded border border-gray-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition">
                                            -
                                        </button>

                                        <!-- Quantity Display -->
                                        <span
                                            class="w-6 h-6 flex items-center justify-center text-gray-800 font-medium">
                                            {{ item . quantity }}
                                        </span>

                                        <!-- Increase Quantity -->
                                        <button @click="increaseQty(item)"
                                            class="w-6 h-6 flex items-center justify-center text-gray-700 bg-gray-200 hover:bg-green-400 hover:text-white rounded border border-gray-300 transition">
                                            +
                                        </button>
                                    </div>
                                </td>

                                <!-- Amount -->
                                <td class="px-4 py-3 text-center text-gray-700">
                                    ${{ item . price * item . quantity . toFixed(2) }}
                                </td>

                                <!-- Action -->
                                <td class="px-4 py-3 text-center">
                                    <button @click="removeItem(item)"
                                        class="text-red-500 hover:text-red-700 font-semibold bg-red-50 px-2 py-1 rounded border border-red-200 hover:bg-red-100 transition">
                                        ✕
                                    </button>
                                </td>
                            </tr>

                            <!-- Empty Cart Row -->
                            <tr v-if="cartItems.length === 0">
                                <td colspan="5" class="text-center py-6 text-gray-500">
                                    Your cart is empty 🛒
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

            <!-- Right Column: Summary & Checkout Form -->
            <div class="w-full lg:w-1/3">
                <div class="border rounded-lg bg-gray-50 shadow-sm overflow-hidden">

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
