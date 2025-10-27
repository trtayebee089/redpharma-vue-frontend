<template>
    <nav
        :class="['fixed top-0 left-0 w-full z-50 bg-green-50 transition-shadow border-b border-green-200', { 'shadow-md': isSticky }]">
        <div class="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <div class="flex items-center justify-between w-full md:w-full">
                <a href="/" class="flex items-center flex-shrink-0">
                    <img :src="mainLogo" alt="Logo" class="h-10 md:h-12 lg:14" />
                </a>

                <!-- Desktop Search -->
                <div class="hidden md:flex flex-1 justify-center px-4 relative">
                    <div class="relative w-full max-w-full md:max-w-xl lg:max-w-2xl">
                        <!-- Search Input -->
                        <input type="text" v-model="searchQuery" :placeholder="placeholderText"
                            :class="[langStore.langClass]" class="w-full transition bg-white search-input" />

                        <!-- Clear Icon -->
                        <span v-if="searchQuery" @click="searchQuery = ''"
                            class="absolute right-12 top-0 h-full w-10 flex items-center justify-center text-gray-500 hover:text-red-500 cursor-pointer transition">
                            <i class="pi pi-times text-lg"></i>
                        </span>
                        <!-- Search Icon (Right) -->
                        <span
                            class="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-gradient-to-bl from-green-400 to-green-600 text-white rounded-r-lg cursor-pointer">
                            <i class="pi pi-search text-lg"></i>
                        </span>
                    </div>

                    <!-- Live Search Results -->
                    <div v-if="searchQuery && filteredProducts.length"
                        class="absolute top-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-[60vh] overflow-y-auto">
                        <ul>
                            <li v-for="product in filteredProducts" :key="product.id"
                                class="px-4 py-3 hover:bg-red-100 flex justify-between items-center gap-3">
                                <router-link :to="`/products/${product.slug}`" class="flex-1 flex flex-col gap-1"
                                    @click="clearSearch">
                                    <p class="font-medium text-gray-800">{{ capitalizeWords(product.name) }}</p>
                                    <p class="text-sm text-gray-600">
                                        Brand: {{ product.brand.title }} | Category:
                                        {{ product.category?.name }}
                                    </p>
                                    <p class="text-md font-bold text-green-600 m-0">
                                        {{ product.promotion_price ? product.promotion_price.toFixed(2) :
                                            product.price.toFixed(2) }} Tk
                                    </p>
                                </router-link>

                                <button @click="addToCart(product)"
                                    class="relative inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg hover:border-red-800">
                                    Add to Cart
                                    <span
                                        class="absolute inset-0 bg-white opacity-10 rounded-lg scale-0 hover:scale-100 transition-transform duration-300"></span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Desktop Buttons -->
                <div class="hidden md:flex items-center space-x-4 h-full relative">
                    <router-link to="/order-tracking"
                        class="hidden 2xl:flex space-x-2 h-12 bg-green-100 text-green-600 items-center justify-center rounded-md hover:border-red-300 hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800 hover:text-white transition border border-green-300 shadow-sm px-3">
                        <img :src="trackingImg" alt="flag" class="w-6 h-6 rounded-sm" />
                        <span class="font-semibold" :class="[langStore.langClass]">{{ $t('header.buttons.track')
                        }}</span>
                    </router-link>

                    <button @click="toggleLanguage" class="
                            flex items-center justify-center space-x-2
                            bg-green-100 text-green-600 border border-green-300 rounded-md shadow-sm
                            hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800 hover:text-white hover:border-red-300
                            transition
                            w-6 h-6 text-sm
                            sm:w-18 sm:h-10 sm:text-sm
                            md:w-20 md:h-11 md:text-base
                            lg:w-20 lg:h-12
                        ">
                        <img :src="currentFlag" alt="flag" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-sm" />
                        <span class="font-semibold hidden sm:inline">{{ currentLanguage }}</span>
                    </button>


                    <!-- Cart Button -->
                    <div class="relative hidden xl:inline-block">
                        <button @click="cartStore.toggleCart(true)" class="w-12 h-12 flex items-center justify-center rounded-md border border-green-300 shadow-sm text-green-600
                                bg-green-100
                                hover:text-white
                                hover:border-red-300
                                transition-all duration-300
                                hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800">
                            <i class="pi pi-shopping-cart text-xl"></i>
                        </button>
                        <!-- Badge -->
                        <span v-if="cartStore.uniqueItems"
                            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {{ cartStore.uniqueItems }}
                        </span>
                    </div>

                    <!-- Login Button with User Icon -->
                    <button v-if="!authStore.isAuthenticated" @click="showLoginModal = true"
                        class="flex items-center justify-center space-x-2 px-4 rounded-lg bg-green-500 hover:border-red-300 hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800 text-white shadow-sm h-12">
                        <span class="w-8 h-8 bg-white text-green-600 flex items-center justify-center rounded-full">
                            <i class="pi pi-user text-lg"></i>
                        </span>
                        <span class="font-semibold">Login</span>
                    </button>

                    <!-- If logged in -->
                    <UserDropdown v-else />
                </div>

                <!-- Mobile Hamburger -->
                <div class="flex flex-1 justify-end md:hidden">
                    <button @click="toggleLanguage" class="
                            flex items-center justify-center space-x-2
                            bg-green-100 text-green-600 border border-green-300 rounded-md shadow-sm
                            hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800 hover:text-white hover:border-red-300
                            transition
                            w-16 h-10 text-sm
                            sm:w-18 sm:h-10 sm:text-sm
                            md:w-20 md:h-11 md:text-base
                            lg:w-20 lg:h-12
                        ">
                        <img :src="currentFlag" alt="flag" class="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-sm" />
                        <span class="font-semibold inline">{{ currentLanguage }}</span>
                    </button>

                    <button @click="toggleMenu" class="
                        flex items-center justify-center
                        border border-green-500 rounded text-gray-800 focus:outline-none transition
                        hover:bg-red-50
                        w-10 h-10 
                        sm:w-11 sm:h-11
                        md:w-12 md:h-12
                        lg:w-12 lg:h-12
                        ml-2 sm:ml-3
                        ">
                        <!-- Menu Icon -->
                        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2" class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                        </svg>

                        <!-- Close Icon -->
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2" class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>


                </div>
            </div>

            <!-- Mobile Search -->
            <div class="flex-1 relative flex md:hidden">
                <!-- Input Wrapper -->
                <div class="relative w-full max-w-full">
                    <input type="text" v-model="searchQuery" :placeholder="placeholderText"
                        :class="[langStore.langClass]"
                        class="w-full transition bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700" />
                    <!-- Clear Icon -->
                    <span v-if="searchQuery" @click="searchQuery = ''"
                        class="absolute right-12 top-0 h-full w-10 flex items-center justify-center text-gray-500 hover:text-red-500 cursor-pointer transition">
                        <i class="pi pi-times text-lg"></i>
                    </span>
                    <span
                        class="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-gradient-to-bl from-green-400 to-green-600 text-white rounded-r-lg cursor-pointer">
                        <i class="pi pi-search text-lg"></i>
                    </span>
                </div>

                <!-- Mobile Live Search Results -->
                <div v-if="searchQuery && filteredProducts.length"
                    class="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-50 max-h-[60vh] overflow-y-auto">
                    <ul>
                        <li v-for="product in filteredProducts" :key="product.id"
                            class="px-4 py-3 hover:bg-gray-50 flex justify-between items-center gap-3">
                            <router-link :to="`/products/${product.slug}`" class="flex-1 flex flex-col gap-1">
                                <p class="font-medium text-gray-800">{{ product.name }}</p>
                                <p class="text-sm text-gray-600">
                                    {{ product.brand?.title }} <br>
                                    {{ product.category?.name }}
                                </p>
                                <p class="text-md font-bold text-green-600 m-0">
                                    {{ product.promotion_price ? product.promotion_price.toFixed(2) :
                                        product.price.toFixed(2) }} Tk
                                </p>
                            </router-link>
                            <button @click="addToCart(product)"
                                class="relative inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg">
                                Add to Cart
                                <span
                                    class="absolute inset-0 bg-white opacity-10 rounded-lg scale-0 hover:scale-100 transition-transform duration-300"></span>
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <transition name="slide-fade">
            <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md">
                <ul class="flex flex-col px-4 py-4 space-y-2 text-gray-700 font-medium">
                    <li><router-link @click.native="closeMenu" to="/">{{ $t('header.menu.home') }}</router-link></li>
                    <li><router-link @click.native="closeMenu" to="/about">{{ $t('header.menu.about') }}</router-link>
                    </li>
                    <!-- <li><router-link @click.native="closeMenu" to="/delivery-coverage">{{ $t('header.menu.coverage')
                    }}</router-link></li> -->
                    <li><router-link @click.native="closeMenu" to="/order-tracking">{{ $t('header.buttons.track')
                    }}</router-link></li>
                    <li v-if="authStore.isAuthenticated"><router-link @click.native="closeMenu" to="/orders">{{
                        $t('header.menu.orders') }}</router-link></li>
                    <li v-if="authStore.isAuthenticated"><router-link @click.native="closeMenu" to="/membership">{{
                        $t('header.menu.membership') }}</router-link></li>
                    <li v-if="authStore.isAuthenticated"><router-link @click.native="closeMenu" to="/settings">{{
                        $t('header.menu.settings') }}</router-link></li>
                    <li v-if="authStore.isAuthenticated">
                        <button @click="logout"
                            class="flex items-center text-red-500 hover:bg-red-300 transition w-full text-left">
                            {{ $t('header.menu.logout') }}
                        </button>
                    </li>
                </ul>
            </div>
        </transition>
    </nav>

    <LoginFormModal :show="showLoginModal" @close="() => { showLoginModal = false }" @open-register="openRegister" />

    <RegistrationModal :show="showRegister" @close="showRegister = false"
        @open-login="() => showLoginModal.value = true" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive, watch } from 'vue'
import mainLogo from '@/assets/logo.png';
import { products } from "@/data/products.js";
import { categories } from "@/data/categories.js";
import { useRouter } from 'vue-router'
import { useCartStore } from "@/stores/cart"
import LoginFormModal from '@/components/auth/LoginFormModal.vue';
import { useAuthStore } from "@/stores/auth";
import UserDropdown from "@/components/auth/UserDropdown.vue";
import { useLanguageStore } from "@/stores/language";
import RegistrationModal from "@/components/auth/RegistrationModal.vue";
import { useProducts } from "@/composables/useProducts";
import { usePush } from "notivue"

import usFlag from '@/assets/icons/us-flag.png';
import bdFlag from '@/assets/icons/bd-flag.png';
import deliveryImg from '@/assets/icons/express-delivery.png';
import trackingImg from '@/assets/icons/order-tracking.png';

import { useI18n } from "vue-i18n";
const { t, tm } = useI18n();

const flags = {
    en: usFlag,
    bn: bdFlag
};

const router = useRouter()
const showLoginModal = ref(false);
const authStore = useAuthStore();
const langStore = useLanguageStore();
const { products: searchResults, fetchSearchResults, loading } = useProducts();

const currentLanguage = computed(() => langStore.lang.toUpperCase());
const currentFlag = computed(() => flags[langStore.lang]);

const isActive = (path) => route.path === path
const showRegister = ref(false);

const isMenuOpen = ref(false)
const isSticky = ref(false)
const cartStore = useCartStore();
const push = usePush()

const searchQuery = ref("");
const placeholders = computed(() => tm("header.searchPlaceHolders"));
const placeholderText = ref("");
let index = 0;
let charIndex = 0;
let isDeleting = false;
let typingInterval;

const clearSearch = () => {
    searchQuery.value = "";
    searchResults.value = [];
};

function capitalizeWords(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function openRegister() {
    showLoginModal.value = false;
    showRegister.value = true;
}

function typeEffect() {
    const currentText = placeholders.value[index];
    if (!currentText) return;

    if (!isDeleting) {
        placeholderText.value = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            clearInterval(typingInterval);
            setTimeout(() => {
                typingInterval = setInterval(typeEffect, 100);
            }, 1500);
        }
    } else {
        placeholderText.value = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % placeholders.value.length;
        }
    }
}

const logout = () => {
    if (!authStore.isAuthenticated) return;
    authStore.logout();
    isMenuOpen.value = false
    router.push({
        path: '/'
    });
};

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
    isMenuOpen.value = false
}

function handleScroll() {
    isSticky.value = window.scrollY > 50
}

const toggleLanguage = () => {
    const langs = ["en", "bn"];
    const currentIndex = langs.indexOf(langStore.lang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    langStore.setLanguage(nextLang);
};

let debounceTimeout = null;

watch(searchQuery, (newQuery) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        fetchSearchResults(newQuery);
    }, 400);
});

const filteredProducts = computed(() => searchResults.value);

const addToCart = (product) => {
    cartStore.addToCart({
        ...product,
        quantity: 1
    });

    searchQuery.value = ""
    push.success(`${product.name} added to cart!`)
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    typingInterval = setInterval(typeEffect, 100);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    clearInterval(typingInterval);
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.btn-navbar {
    border-radius: 30px;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.3px;
    padding: 8px 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-navbar::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
    z-index: 0;
}

.btn-navbar:hover::after {
    width: 200%;
    height: 500%;
}

.btn-navbar>* {
    position: relative;
    z-index: 1;
}

.search-input {
    min-width: 100%;
    border: 1px solid #22c55e;
    border-radius: 0.45rem;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    /* text-gray-700 */
    outline: none;
}

.search-input:focus {
    border-color: #16a34a;
    /* Tailwind green-600 */
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
}

/* Placeholder styles */
.search-input::placeholder {
    font-weight: 700;
    /* bold */
    font-size: 1.1rem;
    /* slightly bigger */
    color: #16a34a;
    /* green */
    opacity: 0.9;
    transition: color 0.3s ease;
}

/* On focus, placeholder fades */
.search-input:focus::placeholder {
    color: #9ca3af;
    /* gray-400 */
}
</style>
