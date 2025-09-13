<script setup>
    const year = new Date().getFullYear();
    import mainLogo from '@/assets/logo.png';
    import paymentsLogo from '@/assets/images/payment-logos.webp';
    import InputField from '@/components/common/InputField.vue';
    import {
        ref
    } from 'vue';
    import {
        useI18n
    } from "vue-i18n";
    import {
        useLanguageStore
    } from "@/stores/language";
    const email = ref('');

    const {
        t,
        tm
    } = useI18n();
    const langStore = useLanguageStore();
</script>

<template>
    <footer class="bg-gray-900 text-gray-300 relative z-50">
        <div class="w-full mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

            <!-- Column 1: Logo & Description -->
            <div class="md:col-span-1 lg:col-span-1">
                <a href="/" class="flex items-center mb-4">
                    <img :src="mainLogo" alt="RedPharma Logo" class="h-12" />
                </a>
                <p class="text-md text-gray-400 font-ws" :class="[langStore.langClass]">{{ $t('footer.description') }}
                </p>
                <p class="text-green-500 font-semibold mt-2 font-ws text-md" :class="[langStore.langClass]">
                    {{ $t('footer.title') }}</p>
            </div>

            <!-- Column 2: Quick Links -->
            <div class="md:col-span-1 lg:col-span-1">
                <h3 class="text-xl font-semibold mb-4 text-white font-wb" :class="[langStore.langClass]">
                    {{ $t('footer.headings.quick_actions') }}</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link :class="[langStore.langClass]" to="/about"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.about') }}</router-link>
                    </li>
                    <li><router-link :class="[langStore.langClass]" to="/contact"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.contact') }}</router-link>
                    </li>
                    <li><router-link :class="[langStore.langClass]" to="/privacy-and-policy"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.privacy') }}</router-link>
                    </li>
                    <li><router-link :class="[langStore.langClass]" to="/delivery-coverage"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.coverage') }}</router-link>
                    </li>
                </ul>
            </div>

            <!-- Column 3: Customer Service -->
            <div class="md:col-span-1 lg:col-span-1">
                <h3 class="text-xl font-semibold mb-4 text-white font-wb" :class="[langStore.langClass]">
                    {{ $t('footer.headings.services') }}</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link to="/cart"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.cart') }}</router-link>
                    </li>
                    <li><router-link to="/request-order"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.request') }}</router-link>
                    </li>
                    <li><a href="#"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.help') }}</a>
                    </li>
                    <li><a href="#"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.returns') }}</a>
                    </li>
                </ul>
            </div>

            <!-- Column 4: Contact & Newsletter -->
            <div class="md:col-span-3 lg:col-span-1">
                <h3 class="text-xl font-semibold mb-4 text-white font-wb" :class="[langStore.langClass]">
                    {{ $t('footer.headings.contact') }}</h3>
                <ul class="space-y-2 text-sm">
                    <li class="flex items-center"><span class="mr-2">📍</span> 123 Main Street, City</li>
                    <li><a href="tel:+1234567890" class="hover:text-green-400 transition">📞 +1 234 567 890</a></li>
                    <li><a href="mailto:support@redpharma.com"
                            class="hover:text-green-400 transition">✉️support@redpharma.com</a></li>
                </ul>

                <!-- Social Links -->
                <div class="flex space-x-3 mt-4">
                    <a href="#" class="hover:text-green-400 transition text-xl"><i class="pi pi-facebook"></i></a>
                    <a href="#" class="hover:text-green-400 transition text-xl"><i class="pi pi-twitter"></i></a>
                    <a href="#" class="hover:text-green-400 transition text-xl"><i class="pi pi-linkedin"></i></a>
                    <a href="#" class="hover:text-green-400 transition text-xl"><i
                            class="pi pi-instagram"></i></a>
                </div>

                <!-- Newsletter -->
                <div class="mt-6">
                    <p class="text-gray-400 mb-2 font-ws" :class="[langStore.langClass]">
                        {{ $t('footer.headings.newsletter') }}
                    </p>

                    <!-- Default: button below, xl: row -->
                    <div class="flex flex-col gap-2 xl:flex-row">
                        <input v-model="email" type="email" placeholder="Your email"
                            class="flex-1 px-3 py-2 rounded-md focus:outline-none text-gray-900 border border-green-300" />
                        <button @click="subscribe"
                            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full xl:w-auto"
                            :class="[langStore.langClass]">
                            {{ $t('header.buttons.subscribe') }}
                        </button>
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
