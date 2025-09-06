<script setup>
const year = new Date().getFullYear()
</script>

<template>
    <footer class="bg-gray-900 text-gray-300">
        <div class="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

            <!-- Column 1 -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">RedPharma BD</h3>
                <p class="text-sm">
                    Your trusted online pharmacy. Fast delivery, genuine medicines, and top healthcare products.
                </p>
            </div>

            <!-- Column 2 -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link to="/" class="hover:text-green-400">Home</router-link></li>
                    <li><router-link to="/shop" class="hover:text-green-400">Shop</router-link></li>
                    <li><router-link to="/about" class="hover:text-green-400">About Us</router-link></li>
                    <li><router-link to="/contact" class="hover:text-green-400">Contact</router-link></li>
                </ul>
            </div>

            <!-- Column 3 -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Customer Service</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link to="/cart" class="hover:text-green-400">Cart</router-link></li>
                    <li><router-link to="/checkout" class="hover:text-green-400">Checkout</router-link></li>
                    <li><a href="#" class="hover:text-green-400">FAQs</a></li>
                    <li><a href="#" class="hover:text-green-400">Returns & Refunds</a></li>
                </ul>
            </div>

            <!-- Column 4 -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                <ul class="space-y-2 text-sm">
                    <li><span class="block">📍 123 Main Street, City</span></li>
                    <li><a href="tel:+1234567890" class="hover:text-green-400">📞 +1 234 567 890</a></li>
                    <li><a href="mailto:support@medicinestore.com" class="hover:text-green-400">✉️
                            support@medicinestore.com</a></li>
                    <li class="flex space-x-3 mt-2">
                        <a href="#" class="hover:text-green-400">🌐</a>
                        <a href="#" class="hover:text-green-400">🐦</a>
                        <a href="#" class="hover:text-green-400">📘</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Copyright -->
        <div class="bg-gray-800 text-gray-400 py-4 text-center text-sm border-t border-gray-700">
            © {{ year }} <strong>RedPharma BD</strong>. All rights reserved.
        </div>
    </footer>
</template>
