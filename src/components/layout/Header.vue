<template>
    <nav class="site-header fixed top-0 left-0 w-full z-50" :class="{ 'site-header-scrolled': isSticky }">
        <div class="header-row">
            <a href="/" class="header-brand">
                <img :src="mainLogo" alt="RedPharma BD" />
            </a>

            <div ref="searchContainer" class="header-search">
                <i class="pi pi-search header-search-icon" aria-hidden="true"></i>
                <input ref="searchInput" type="text" v-model="searchQuery" :placeholder="searchPlaceholder || $t('header.search')"
                    :aria-label="$t('header.search')" class="header-search-input"
                    role="combobox" aria-autocomplete="list" autocomplete="off"
                    :aria-expanded="shouldShowSearchPanel"
                    :aria-controls="shouldShowSearchPanel ? 'header-product-search-results' : undefined"
                    :aria-activedescendant="activeSearchIndex >= 0 ? `header-product-search-results-option-${activeSearchIndex}` : undefined"
                    @focus="openSearchPanel" @keydown="handleSearchKeydown" />
                <button v-if="searchQuery" type="button" class="header-search-clear"
                    :aria-label="$t('header.clearSearch')" @click="clearSearch">
                    <i class="pi pi-times" aria-hidden="true"></i>
                </button>

                <ProductSearchDropdown v-if="shouldShowSearchPanel"
                    id="header-product-search-results" :products="filteredProducts" :query="searchQuery"
                    :loading="searchRequestPending" :active-index="activeSearchIndex"
                    @select="selectProductSuggestion" @add="addToCart" @active-change="activeSearchIndex = $event" />
            </div>

            <div class="header-tools">
                <router-link to="/order-tracking" class="header-control hidden 2xl:inline-flex">
                    <i class="pi pi-truck" aria-hidden="true"></i>
                    {{ $t('header.buttons.track') }}
                </router-link>

                <button type="button" class="header-control header-language"
                    :aria-label="$t('header.switchLanguage')" @click="toggleLanguage">
                    <img :src="currentFlag" alt="" class="header-flag" />
                    {{ currentLanguage }}
                </button>

                <button type="button" class="header-control header-icon-control relative hidden xl:inline-flex"
                    :aria-label="cartStore.uniqueItems ? $t('mobileNav.cartWithCount', { count: n(cartStore.uniqueItems) }) : $t('header.buttons.cart')"
                    @click="router.push('/cart')">
                    <i class="pi pi-shopping-cart" aria-hidden="true"></i>
                    <span v-if="cartStore.uniqueItems" class="header-cart-count" aria-hidden="true">
                        {{ n(cartStore.uniqueItems) }}
                    </span>
                </button>

                <button v-if="!authStore.isAuthenticated" type="button"
                    class="header-control header-login hidden md:inline-flex" @click="showLoginModal = true">
                    <i class="pi pi-user" aria-hidden="true"></i>
                    {{ $t('auth.login') }}
                </button>

                <div v-else class="header-account hidden md:block">
                    <UserDropdown />
                </div>

                <button type="button" class="header-control header-icon-control inline-flex md:hidden"
                    :aria-label="$t('header.openMenu')" :aria-expanded="isMenuOpen"
                    :aria-controls="isMenuOpen ? 'header-mobile-menu' : undefined" @click="toggleMenu">
                    <i :class="isMenuOpen ? 'pi pi-times' : 'pi pi-bars'" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <transition name="slide-fade">
            <div v-if="isMenuOpen" id="header-mobile-menu" class="header-mobile-menu md:hidden"
                @keydown.esc="closeMenu">
                <ul>
                    <li><router-link @click="closeMenu" to="/">{{ $t('header.menu.home') }}</router-link></li>
                    <li><router-link @click="closeMenu" to="/about">{{ $t('header.menu.about') }}</router-link></li>
                    <li><router-link @click="closeMenu" to="/categories">{{ $t('header.menu.category') }}</router-link></li>
                    <li><router-link @click="closeMenu" to="/order-tracking">{{ $t('header.buttons.track') }}</router-link></li>
                    <li v-if="authStore.isAuthenticated">
                        <router-link @click="closeMenu" to="/orders">{{ $t('header.menu.orders') }}</router-link>
                    </li>
                    <li v-if="authStore.isAuthenticated">
                        <router-link @click="closeMenu" to="/membership">{{ $t('header.menu.membership') }}</router-link>
                    </li>
                    <li v-if="authStore.isAuthenticated">
                        <router-link @click="closeMenu" to="/settings">{{ $t('header.menu.settings') }}</router-link>
                    </li>
                    <li v-if="authStore.isAuthenticated">
                        <button type="button" class="header-menu-logout" @click="logout">
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

import { useI18n } from "vue-i18n";
const { t, n, tm, rt, locale } = useI18n();

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

const showRegister = ref(false);

const isMenuOpen = ref(false)
const isSticky = ref(false)
const cartStore = useCartStore();
const push = usePush()
const { beginProductNavigation, completeProductNavigation } = useProductNavigation();

const searchQuery = ref("");
const searchInput = ref(null);
const searchContainer = ref(null);
const searchPanelOpen = ref(false);
const searchRequestPending = ref(false);
const activeSearchIndex = ref(-1);
const searchPlaceholder = ref("");
let placeholderTimer;
let reducedMotion;

function startPlaceholderAnimation() {
    clearTimeout(placeholderTimer);
    searchPlaceholder.value = t("header.search");
    if (reducedMotion?.matches) return;

    const segmenter = typeof Intl.Segmenter === "function"
        ? new Intl.Segmenter(locale.value, { granularity: "grapheme" })
        : null;
    const phrases = tm("header.searchPlaceHolders").map(message => {
        const text = rt(message);
        return segmenter ? Array.from(segmenter.segment(text), part => part.segment) : Array.from(text);
    });
    if (!phrases.length) return;

    let phraseIndex = 0;
    let length = phrases[0].length;
    let deleting = true;
    searchPlaceholder.value = phrases[0].join("");

    function animate() {
        const phrase = phrases[phraseIndex];
        length += deleting ? -1 : 1;
        searchPlaceholder.value = phrase.slice(0, length).join("");

        let delay = deleting ? 34 : 64;
        if (length === 0) {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            deleting = false;
            delay = 230;
        } else if (length === phrase.length) {
            deleting = true;
            delay = 1700;
        }
        placeholderTimer = setTimeout(animate, delay);
    }

    placeholderTimer = setTimeout(animate, 1700);
}

watch(locale, startPlaceholderAnimation);

const clearSearch = () => {
    clearTimeout(debounceTimeout);
    searchQuery.value = "";
    searchResults.value = [];
    searchPanelOpen.value = false;
    searchRequestPending.value = false;
    activeSearchIndex.value = -1;
    searchInput.value?.blur();
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
    if (!searchContainer.value?.contains(event.target)) {
        closeSearchPanel();
    }
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
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.addEventListener("change", startPlaceholderAnimation);
    startPlaceholderAnimation();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener("pointerdown", handleSearchOutsideClick);
    reducedMotion?.removeEventListener("change", startPlaceholderAnimation);
    clearTimeout(placeholderTimer);
    clearTimeout(debounceTimeout);
})
</script>

<style scoped>
.site-header {
    background: #e7f7ed;
    border-bottom: 1px solid #b5d9c0;
    box-shadow: 0 2px 5px rgb(20 61 42 / 8%);
    transition: box-shadow 180ms ease;
}

.site-header-scrolled {
    box-shadow: 0 5px 16px rgb(20 61 42 / 14%);
}

.header-row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-areas: "brand tools" "search search";
    align-items: center;
    gap: 8px 16px;
    padding: 8px 16px 9px;
}

.header-brand {
    grid-area: brand;
    display: inline-flex;
    justify-self: start;
    align-items: center;
    min-height: 44px;
    border-radius: 8px;
}

.header-brand img {
    width: auto;
    height: 38px;
}

.header-search {
    grid-area: search;
    position: relative;
    width: 100%;
    justify-self: center;
}

.header-search-input {
    display: block;
    width: 100%;
    height: 42px;
    padding: 0 40px;
    border: 1px solid #80b895;
    border-radius: 10px;
    background: #fff;
    color: #183b2c;
    font-size: 1rem;
    transition: border-color 160ms ease, box-shadow 160ms ease;
}

.header-search-input::placeholder {
    color: #176742;
    font-weight: 600;
    opacity: 1;
}

.header-search-input:focus {
    border-color: #218158;
    outline: none;
    box-shadow: 0 0 0 3px rgb(33 129 88 / 15%);
}

.header-search-icon,
.header-search-clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #176742;
}

.header-search-icon {
    left: 14px;
    font-size: .95rem;
    pointer-events: none;
}

.header-search-clear {
    right: 5px;
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 7px;
    cursor: pointer;
}

.header-tools {
    grid-area: tools;
    display: flex;
    align-items: center;
    justify-self: end;
    gap: 8px;
}

.header-control,
.header-account :deep(.dropdown-wrapper > button) {
    min-height: 44px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 12px;
    border: 1px solid #afd2b9;
    border-radius: 9px;
    background: #fff;
    color: #153e2a;
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.3;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}

.header-control:hover,
.header-search-clear:hover {
    border-color: #80b895;
    background: #dbf1e2;
}

.header-icon-control {
    width: 44px;
    padding: 0;
    font-size: 1rem;
}

.header-language {
    display: inline-flex;
}

.header-login,
.header-account :deep(.dropdown-wrapper > button) {
    color: #fff;
    background: #176742;
    border-color: #176742;
}

.header-login:hover,
.header-account :deep(.dropdown-wrapper > button:hover) {
    color: #fff;
    background: #105335;
    border-color: #105335;
}

.header-flag {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.header-cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 18px;
    padding: 2px 4px;
    border: 1px solid #fff;
    border-radius: 999px;
    background: #b92432;
    color: #fff;
    font-size: .625rem;
    line-height: 1.1;
}

.header-mobile-menu {
    padding: 8px 16px 12px;
    border-top: 1px solid #dce8e0;
    background: #fff;
    box-shadow: 0 8px 16px rgb(20 61 42 / 10%);
    max-height: 55dvh;
    overflow-y: auto;
}

.header-mobile-menu a,
.header-mobile-menu button {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 42px;
    padding: 6px 10px;
    border-radius: 8px;
    color: #244e3a;
    font-weight: 600;
}

.header-mobile-menu a:hover,
.header-mobile-menu a.router-link-exact-active {
    background: #eef7f1;
}

.header-mobile-menu .header-menu-logout {
    color: #ad2431;
}

.site-header :is(a, button):focus-visible {
    outline: 2px solid #218158;
    outline-offset: 2px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 160ms ease, transform 160ms ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

@media (min-width: 768px) {
    .header-row {
        grid-template-columns: auto minmax(0, 1fr) auto;
        grid-template-areas: "brand search tools";
        gap: 24px;
        padding: 8px 24px;
    }

    .header-tools {
        gap: 10px;
    }

    .header-search {
        max-width: 42rem;
    }
}

@media (min-width: 1024px) {
    .header-row {
        padding-block: 12px;
    }

    .header-brand img {
        height: 48px;
    }

    .header-search-input {
        height: 46px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .site-header,
    .header-search-input,
    .header-control,
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: none;
    }
}
</style>
