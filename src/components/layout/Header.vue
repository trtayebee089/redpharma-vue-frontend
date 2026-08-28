<template>
    <nav
        :class="['fixed top-0 left-0 w-full z-50 bg-green-50 transition-shadow border-b border-green-200', { 'shadow-md': isSticky }]">
        <div class="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <div class="flex items-center justify-between w-full md:w-full">
                <a href="/" class="flex items-center flex-shrink-0">
                    <img :src="mainLogo" alt="Logo" class="h-10 md:h-12 lg:14" />
                </a>

                <!-- Desktop Search -->
                <div class="hidden md:flex flex-1 justify-center px-4">
                    <div ref="desktopSearchContainer" class="relative w-full max-w-full md:max-w-xl lg:max-w-2xl">
                        <input ref="desktopSearchInput" type="text" v-model="searchQuery" :placeholder="placeholderText"
                            :class="[langStore.langClass]" class="w-full transition bg-white search-input"
                            role="combobox" aria-autocomplete="list" autocomplete="off"
                            :aria-expanded="shouldShowSearchPanel" aria-controls="desktop-product-search-results"
                            :aria-activedescendant="activeSearchIndex >= 0 ? `desktop-product-search-results-option-${activeSearchIndex}` : undefined"
                            @focus="openSearchPanel" @keydown="handleSearchKeydown" />

                        <span v-if="searchQuery" @click="clearSearch"
                            class="absolute right-12 top-0 h-full w-10 flex items-center justify-center text-gray-500 hover:text-red-500 cursor-pointer transition">
                            <i class="pi pi-times text-lg"></i>
                        </span>
                        <span
                            class="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-gradient-to-bl from-green-400 to-green-600 text-white rounded-r-lg cursor-pointer">
                            <i class="pi pi-search text-lg"></i>
                        </span>

                        <ProductSearchDropdown v-if="shouldShowSearchPanel && isDesktopSearch"
                            id="desktop-product-search-results" :products="filteredProducts" :query="searchQuery"
                            :loading="searchRequestPending" :active-index="activeSearchIndex"
                            @select="selectProductSuggestion" @add="addToCart"
                            @active-change="activeSearchIndex = $event" />
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

                    <div class="relative hidden xl:inline-block">
                        <button @click="router.push('/cart')" class="w-12 h-12 flex items-center justify-center rounded-md border border-green-300 shadow-sm text-green-600
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

                    <button v-if="!authStore.isAuthenticated" @click="showLoginModal = true"
                        class="flex items-center justify-center space-x-2 px-4 rounded-lg bg-green-500 hover:border-red-300 hover:bg-gradient-to-b hover:from-red-500 hover:to-red-800 text-white shadow-sm h-12">
                        <span class="w-8 h-8 bg-white text-green-600 flex items-center justify-center rounded-full">
                            <i class="pi pi-user text-lg"></i>
                        </span>
                        <span class="font-semibold">{{ $t('auth.login') }}</span>
                    </button>

                    <UserDropdown v-else />
                </div>

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
                <div ref="mobileSearchContainer" class="relative w-full max-w-full">
                    <input ref="mobileSearchInput" type="text" v-model="searchQuery" :placeholder="placeholderText"
                        :class="[langStore.langClass]"
                        class="w-full transition bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                        role="combobox" aria-autocomplete="list" autocomplete="off"
                        :aria-expanded="shouldShowSearchPanel" aria-controls="mobile-product-search-results"
                        :aria-activedescendant="activeSearchIndex >= 0 ? `mobile-product-search-results-option-${activeSearchIndex}` : undefined"
                        @focus="openSearchPanel" @keydown="handleSearchKeydown" />
                    <span v-if="searchQuery" @click="clearSearch"
                        class="absolute right-12 top-0 h-full w-10 flex items-center justify-center text-gray-500 hover:text-red-500 cursor-pointer transition">
                        <i class="pi pi-times text-lg"></i>
                    </span>
                    <span
                        class="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-gradient-to-bl from-green-400 to-green-600 text-white rounded-r-lg cursor-pointer">
                        <i class="pi pi-search text-lg"></i>
                    </span>

                    <ProductSearchDropdown v-if="shouldShowSearchPanel && !isDesktopSearch"
                        id="mobile-product-search-results" :products="filteredProducts" :query="searchQuery"
                        :loading="searchRequestPending" :active-index="activeSearchIndex"
                        @select="selectProductSuggestion" @add="addToCart"
                        @active-change="activeSearchIndex = $event" />
                </div>

            </div>
        </div>

        <transition name="slide-fade">
            <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md">
                <ul class="flex flex-col px-4 py-4 space-y-2 text-gray-700 font-medium">
                    <li><router-link @click.native="closeMenu" to="/">{{ $t('header.menu.home') }}</router-link></li>
                    <li><router-link @click.native="closeMenu" to="/about">{{ $t('header.menu.about') }}</router-link>
                    </li>
                    <li>
                        <router-link @click.native="closeMenu" to="/categories">{{ $t('header.menu.category') }}</router-link>
                    </li>
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

    <RegistrationModal :show="showRegister" @close="showRegister = false" @open-login="openLogin" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import mainLogo from '@/assets/logo.png';
import { products } from "@/data/products.js";
import { categories } from "@/data/categories.js";
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from "@/stores/cart"
import LoginFormModal from '@/components/auth/LoginFormModal.vue';
import { useAuthStore } from "@/stores/auth";
import UserDropdown from "@/components/auth/UserDropdown.vue";
import { useLanguageStore } from "@/stores/language";
import RegistrationModal from "@/components/auth/RegistrationModal.vue";
import { useProducts } from "@/composables/useProducts";
import { useProductNavigation } from "@/composables/useProductNavigation";
import ProductSearchDropdown from "@/components/products/ProductSearchDropdown.vue";
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
const route = useRoute()
const showLoginModal = ref(false);
const authStore = useAuthStore();
const langStore = useLanguageStore();
const { products: searchResults, fetchSearchResults } = useProducts({ fetchOnMount: false });

const currentLanguage = computed(() => langStore.lang.toUpperCase());
const currentFlag = computed(() => flags[langStore.lang]);

const isActive = (path) => route.path === path
const showRegister = ref(false);

const isMenuOpen = ref(false)
const isSticky = ref(false)
const cartStore = useCartStore();
const push = usePush()
const { beginProductNavigation, completeProductNavigation } = useProductNavigation();

const searchQuery = ref("");
const desktopSearchInput = ref(null);
const mobileSearchInput = ref(null);
const desktopSearchContainer = ref(null);
const mobileSearchContainer = ref(null);
const searchPanelOpen = ref(false);
const searchRequestPending = ref(false);
const activeSearchIndex = ref(-1);
const isDesktopSearch = ref(false);
const placeholders = computed(() => tm("header.searchPlaceHolders"));
const placeholderText = ref("");
let index = 0;
let charIndex = 0;
let isDeleting = false;
let typingInterval;
let searchMediaQuery;

const clearSearch = () => {
    clearTimeout(debounceTimeout);
    searchQuery.value = "";
    searchResults.value = [];
    searchPanelOpen.value = false;
    searchRequestPending.value = false;
    activeSearchIndex.value = -1;
    desktopSearchInput.value?.blur();
    mobileSearchInput.value?.blur();
};

const openSearchPanel = () => {
    if (searchQuery.value.trim().length >= 2) {
        searchPanelOpen.value = true;
    }
};

const closeSearchPanel = () => {
    searchPanelOpen.value = false;
    activeSearchIndex.value = -1;
};

const handleSearchKeydown = async (event) => {
    if (event.key === "Escape") {
        if (searchPanelOpen.value) {
            event.preventDefault();
            closeSearchPanel();
        }
        return;
    }

    if (!["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;

    if (event.key === "Enter") {
        if (shouldShowSearchPanel.value && activeSearchIndex.value >= 0) {
            event.preventDefault();
            await selectProductSuggestion(filteredProducts.value[activeSearchIndex.value]);
        }
        return;
    }

    if (!filteredProducts.value.length || searchRequestPending.value) return;

    event.preventDefault();
    searchPanelOpen.value = true;

    const direction = event.key === "ArrowDown" ? 1 : -1;
    const totalResults = filteredProducts.value.length;
    activeSearchIndex.value = activeSearchIndex.value < 0
        ? (direction > 0 ? 0 : totalResults - 1)
        : (activeSearchIndex.value + direction + totalResults) % totalResults;

    await nextTick();
};

const handleSearchOutsideClick = (event) => {
    const clickedInsideDesktop = desktopSearchContainer.value?.contains(event.target);
    const clickedInsideMobile = mobileSearchContainer.value?.contains(event.target);

    if (!clickedInsideDesktop && !clickedInsideMobile) {
        closeSearchPanel();
    }
};

const handleSearchViewportChange = (event) => {
    isDesktopSearch.value = event.matches;
    activeSearchIndex.value = -1;
};

const selectProductSuggestion = async (product) => {
    beginProductNavigation(product.slug);
    clearSearch();

    try {
        await router.push({
            name: "ProductDetails",
            params: { slug: product.slug },
        });
    } catch {
        push.error("Unable to open this product. Please try again.");
    } finally {
        completeProductNavigation(product.slug);
    }
};

function openRegister() {
    showLoginModal.value = false;
    showRegister.value = true;
}

function openLogin() {
    showRegister.value = false;
    showLoginModal.value = true;
}

function closeAuthModals() {
    showLoginModal.value = false;
    showRegister.value = false;
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
    activeSearchIndex.value = -1;

    const normalizedQuery = newQuery.trim();

    if (normalizedQuery.length < 2) {
        searchPanelOpen.value = false;
        searchRequestPending.value = false;
        fetchSearchResults("");
        return;
    }

    searchPanelOpen.value = true;
    searchRequestPending.value = true;

    debounceTimeout = setTimeout(async () => {
        await fetchSearchResults(normalizedQuery);

        if (searchQuery.value.trim() === normalizedQuery) {
            searchRequestPending.value = false;
        }
    }, 400);
});

watch(
    () => route.path,
    () => {
        closeAuthModals();
    }
);

const filteredProducts = computed(() => searchResults.value);
const shouldShowSearchPanel = computed(
    () => searchPanelOpen.value && searchQuery.value.trim().length >= 2,
);

const addToCart = (product) => {
    cartStore.addToCart({
        ...product,
        quantity: 1
    });

    clearSearch();
    push.success(t("product.addedToCart", { name: product.name }))
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("pointerdown", handleSearchOutsideClick);
    searchMediaQuery = window.matchMedia("(min-width: 768px)");
    isDesktopSearch.value = searchMediaQuery.matches;
    searchMediaQuery.addEventListener("change", handleSearchViewportChange);
    typingInterval = setInterval(typeEffect, 100);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener("pointerdown", handleSearchOutsideClick);
    searchMediaQuery?.removeEventListener("change", handleSearchViewportChange);
    clearTimeout(debounceTimeout);
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
    outline: none;
}

.search-input:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
}

.search-input::placeholder {
    font-weight: 700;
    font-size: 1.1rem;
    color: #16a34a;
    opacity: 0.9;
    transition: color 0.3s ease;
}

.search-input:focus::placeholder {
    color: #9ca3af;
}
</style>
