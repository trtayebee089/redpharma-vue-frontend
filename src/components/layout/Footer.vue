<script setup>
    const year = new Date().getFullYear();
    import mainLogo from '@/assets/logo.png';
    import paymentsLogo from '@/assets/images/payment-logos.webp';
    import InputField from '@/components/common/InputField.vue';
    import { ref } from 'vue';

    const email = ref('');
</script>

<template>
    <footer class="bg-gray-900 text-gray-300 relative z-50">
        <div class="w-full mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

            <!-- Column 1: Logo & Description -->
            <div>
                <a href="/" class="flex items-center mb-4">
                    <img :src="mainLogo" alt="RedPharma Logo" class="h-12" />
                </a>
                <p class="text-sm text-gray-400">
                    RedPharma BD is your trusted online pharmacy in Bangladesh. Fast delivery, genuine medicines, and
                    top healthcare products.
                </p>
                <!-- Optional tagline -->
                <p class="text-green-400 font-semibold mt-2">Quality Medicines, Trusted Care</p>
            </div>

            <!-- Column 2: Quick Links -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link to="/" class="hover:text-green-400 transition">Home</router-link></li>
                    <li><router-link to="/about" class="hover:text-green-400 transition">About Us</router-link></li>
                    <li><router-link to="/contact" class="hover:text-green-400 transition">Contact</router-link></li>
                    <li><router-link to="/privacy-and-policy" class="hover:text-green-400 transition">Privacy & Policy</router-link></li>
                    <li><router-link to="/delivery-coverage" class="hover:text-green-400 transition">Delivery Coverage</router-link></li>
                </ul>
            </div>

            <!-- Column 3: Customer Service -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Customer Service</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link to="/cart" class="hover:text-green-400 transition">Cart</router-link></li>
                    <li><router-link to="/request-order" class="hover:text-green-400 transition">Request
                            Order</router-link></li>
                    <li><a href="#" class="hover:text-green-400 transition">FAQs</a></li>
                    <li><a href="#" class="hover:text-green-400 transition">Returns & Refunds</a></li>
                </ul>
            </div>

            <!-- Column 4: Contact & Newsletter -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                <ul class="space-y-2 text-sm">
                    <li class="flex items-center"><span class="mr-2">📍</span> 123 Main Street, City</li>
                    <li><a href="tel:+1234567890" class="hover:text-green-400 transition">📞 +1 234 567 890</a></li>
                    <li><a href="mailto:support@redpharma.com" class="hover:text-green-400 transition">✉️
                            support@redpharma.com</a></li>
                </ul>

                <!-- Social Links -->
                <div class="flex space-x-3 mt-4">
                    <a href="#" class="hover:text-green-400 transition text-xl"><i
                            class="fab fa-facebook-f"></i></a>
                    <a href="#" class="hover:text-green-400 transition text-xl"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="hover:text-green-400 transition text-xl"><i
                            class="fab fa-linkedin-in"></i></a>
                    <a href="#" class="hover:text-green-400 transition text-xl"><i
                            class="fab fa-instagram"></i></a>
                </div>

                <!-- Newsletter -->
                <div class="mt-6">
                    <p class="text-gray-400 text-sm mb-2">Subscribe to our newsletter</p>
                    <div class="flex">
                        <InputField v-model="email" type="email" placeholder="Your email"
                            input-class="flex-1 px-3 py-2 rounded-l-md focus:outline-none text-gray-100 border border-green-300">
                            <template #append>
                                <button @click="subscribe"
                                    class="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition">
                                    Subscribe
                                </button>
                            </template>
                        </InputField>
                    </div>
                </div>

            </div>
        </div>

        <!-- Bottom Bar -->
        <div
            class="bg-gray-800 text-gray-400 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm border-t border-gray-700">
            <!-- Left: Copyright Text -->
            <div class="mb-2 md:mb-0">
                © {{ year }} <strong>RedPharma BD</strong>. All rights reserved.
            </div>

            <!-- Right: Payment Logos Image -->
            <div>
                <img :src="paymentsLogo" alt="Payment Methods" class="h-6" />
            </div>
        </div>

    </footer>
</template>

<style scoped>
    /* Optional: add smooth transition for hover effects */
    a {
        transition: color 0.3s;
    }

    input:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
        /* Tailwind green-500 */
    }
</style>
