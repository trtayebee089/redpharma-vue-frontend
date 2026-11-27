<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import CategoryImage from '@/components/common/CategoryImage.vue';
import LoginFormModal from '@/components/auth/LoginFormModal.vue';
import RegistrationModal from '@/components/auth/RegistrationModal.vue';
import { useCategories } from '@/composables/useCategories.js';
import { useCategoryNames } from '@/composables/useCategoryNames.js';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const { t, locale } = useI18n();
const { categories } = useCategories();
const categoryName = useCategoryNames();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const isSidebarOpen = ref(false);
const showLoginModal = ref(false);
const showRegister = ref(false);

const cartQty = computed(() => cartStore.items.length);
const cartBadge = computed(() => new Intl.NumberFormat(locale.value).format(cartQty.value));
const categoriesSelected = computed(() => isSidebarOpen.value || ['Category', 'CategoryList'].includes(route.name));

function goProfile() {
    if (authStore.isAuthenticated) {
        router.push('/profile');
    } else {
        showLoginModal.value = true;
    }
}

function openRegister() {
    showLoginModal.value = false;
    showRegister.value = true;
}

function openLogin() {
    showRegister.value = false;
    showLoginModal.value = true;
}

watch(() => route.path, () => {
    isSidebarOpen.value = false;
    showLoginModal.value = false;
    showRegister.value = false;
});
</script>

<template>
    <nav class="mobile-site-nav lg:hidden" :aria-label="t('mobileNav.navigation')">
        <div class="mobile-nav-items">
            <RouterLink to="/" class="bottom-link" exact-active-class="is-current">
                <i class="pi pi-home" aria-hidden="true"></i>
                <span>{{ t('header.menu.home') }}</span>
            </RouterLink>
            <button type="button" class="bottom-link" :class="{ 'is-current': categoriesSelected }"
                :aria-expanded="isSidebarOpen" aria-controls="mobile-category-menu"
                @click="isSidebarOpen = !isSidebarOpen">
                <i class="pi pi-list" aria-hidden="true"></i>
                <span>{{ t('mobileNav.categories') }}</span>
            </button>
            <RouterLink to="/cart" class="bottom-link" exact-active-class="is-current"
                :aria-label="cartQty ? t('mobileNav.cartWithCount', { count: cartBadge }) : undefined">
                <span class="bottom-cart-icon">
                    <i class="pi pi-shopping-cart" aria-hidden="true"></i>
                    <span v-if="cartQty" class="bottom-cart-count" aria-hidden="true">{{ cartBadge }}</span>
                </span>
                <span>{{ t('header.menu.cart') }}</span>
            </RouterLink>
            <button type="button" class="bottom-link" :class="{ 'is-current': route.name === 'Profile' }"
                :aria-current="route.name === 'Profile' ? 'page' : undefined"
                :aria-haspopup="authStore.isAuthenticated ? undefined : 'dialog'" @click="goProfile">
                <i class="pi pi-user" aria-hidden="true"></i>
                <span>{{ t('mobileNav.account') }}</span>
            </button>
        </div>
    </nav>

    <Transition name="slide-fade">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-50 flex lg:hidden" @keydown.esc="isSidebarOpen = false">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="isSidebarOpen = false"></div>
            <aside id="mobile-category-menu" :aria-label="t('mobileNav.categories')"
                class="relative w-64 bg-white shadow-xl p-4 overflow-y-auto border-r border-gray-200">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-base font-semibold">{{ t('mobileNav.categories') }}</h2>
                    <button type="button" :aria-label="t('common.close')" @click="isSidebarOpen = false"
                        class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition">
                        <i class="pi pi-times" aria-hidden="true"></i>
                    </button>
                </div>
                <ul class="space-y-2">
                    <li v-for="category in categories" :key="category.id">
                        <RouterLink :to="category.navigationPath" @click="isSidebarOpen = false"
                            class="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-red-200 transition-colors hover:font-bold hover:text-red-950"
                            :class="{ 'bg-red-200 font-bold text-red-950': route.params.slug === category.slug }">
                            <div class="flex items-center">
                                <CategoryImage v-if="category.image" :src="category.image" alt="" class="w-6 h-6 mr-3"
                                    loading="lazy" />
                                <span>{{ categoryName(category) }}</span>
                            </div>
                            <i class="pi pi-chevron-right text-sm" aria-hidden="true"></i>
                        </RouterLink>
                    </li>
                </ul>
            </aside>
        </div>
    </Transition>

    <LoginFormModal :show="showLoginModal" @close="showLoginModal = false" @open-register="openRegister" />
    <RegistrationModal :show="showRegister" @close="showRegister = false" @open-login="openLogin" />
</template>

<style scoped>
.mobile-site-nav {
    position: fixed;
    z-index: 49;
    inset-inline: 0;
    bottom: 0;
    padding-inline: max(.45rem, env(safe-area-inset-left)) max(.45rem, env(safe-area-inset-right));
    padding-bottom: env(safe-area-inset-bottom);
    border-top: 1px solid #dce8e0;
    background: #fff;
    box-shadow: 0 -3px 14px rgb(25 65 44 / 8%);
}

.mobile-nav-items {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: .2rem;
    min-height: var(--mobile-nav-height);
    max-width: 32rem;
    margin-inline: auto;
    padding-block: .25rem;
}

.bottom-link {
    display: grid;
    justify-items: center;
    align-content: center;
    gap: .2rem;
    min-width: 0;
    min-height: 2.85rem;
    padding: .15rem .2rem;
    border-radius: .675rem;
    color: #4c6256;
    font-size: .72rem;
    font-weight: 650;
    line-height: 1.3;
    text-align: center;
}

.bottom-link:hover {
    background: #f3f8f5;
    color: #0f6740;
}

.bottom-link.is-current {
    background: #e6f4eb;
    color: #126940;
}

.bottom-link:focus-visible {
    outline: 2px solid #22834f;
    outline-offset: -2px;
}

.bottom-link .pi {
    font-size: 1.12rem;
    line-height: 1.1;
}

.bottom-cart-icon {
    position: relative;
    display: grid;
    place-items: center;
}

.bottom-cart-count {
    position: absolute;
    inset-inline-start: 78%;
    top: -.32rem;
    min-width: .95rem;
    padding: .025rem .22rem;
    border-radius: 99px;
    background: #147446;
    color: #fff;
    font-size: .625rem;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: transform .24s ease, opacity .24s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: none;
    }
}
</style>
