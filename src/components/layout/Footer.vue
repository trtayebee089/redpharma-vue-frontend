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
    <footer class="bg-gray-900 text-gray-300 relative z-50  hidden lg:block">
        <div class="w-full mx-auto px-6 py-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:grid">
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

            <div class="md:col-span-1 lg:col-span-1">
                <h3 class="text-xl font-semibold mb-4 text-white font-wb" :class="[langStore.langClass]">
                    {{ $t('footer.headings.quick_actions') }}</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link :class="[langStore.langClass]" to="/about"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.about')
                            }}</router-link>
                    </li>
                    <li><router-link :class="[langStore.langClass]" to="/contact"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.contact')
                            }}</router-link>
                    </li>
                    <li>
                        <router-link :class="[langStore.langClass]" to="/refund-and-returns"
                            class="hover:text-green-400 transition text-md font-normal">
                            {{ $t('header.menu.returns') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :class="[langStore.langClass]" to="/privacy-and-policy"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.privacy')
                            }}</router-link>
                    </li>
                </ul>
            </div>

            <div class="md:col-span-1 lg:col-span-1">
                <h3 class="text-xl font-semibold mb-4 text-white font-wb" :class="[langStore.langClass]">
                    {{ $t('footer.headings.services') }}</h3>
                <ul class="space-y-2 text-sm">
                    <li><router-link to="/cart" class="hover:text-green-400 transition text-md font-normal">{{
                        $t('header.menu.cart') }}</router-link>
                    </li>
                    <li><a href="#" class="hover:text-green-400 transition text-md font-normal">{{
                        $t('header.menu.help') }}</a>
                    </li>
                    <li><router-link :class="[langStore.langClass]" to="/delivery-coverage"
                            class="hover:text-green-400 transition text-md font-normal">{{ $t('header.menu.coverage')
                            }}</router-link>
                    </li>
                </ul>
            </div>

            <div class="md:col-span-3 lg:col-span-1">
                <h3 class="text-xl font-semibold mb-4 text-white font-wb" :class="[langStore.langClass]">{{
                    $t('footer.headings.contact') }}</h3>
                <ul class="space-y-3 text-sm text-gray-600">
                    <li class="flex items-center space-x-3">
                        <div
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                            <i class="pi pi-map-marker"></i>
                        </div>
                        <span class="text-gray-200">303, Rajshahi 6000</span>
                    </li>

                    <li class="flex items-center space-x-3">
                        <div
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                            <i class="pi pi-phone"></i>
                        </div>
                        <a href="tel:+1234567890" class="text-gray-200 hover:text-green-600 transition font-medium">
                            +8801997202010
                        </a>
                    </li>

                    <li class="flex items-center space-x-3">
                        <div
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                            <i class="pi pi-envelope"></i>
                        </div>
                        <a href="mailto:support@redpharma.com"
                            class="text-gray-200 hover:text-green-600 transition font-medium">
                            support@redpharma.com
                        </a>
                    </li>
                </ul>

                <div class="flex items-center space-x-4 mt-6">
                    <a href="https://www.facebook.com/redpharmabd" target="_blank"
                        class="group relative flex items-center justify-center gap-2 px-4 h-10 rounded-full bg-gray-100 text-gray-600 shadow-sm hover:bg-blue-700 hover:text-white transition-all duration-300"
                        title="Facebook">
                        <i class="pi pi-facebook text-lg"></i>
                        <span class="font-medium text-sm tracking-wide">FOLLOW US</span>
                    </a>
                </div>
            </div>
        </div>

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
a {
    transition: color 0.3s;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
}
</style>
