<script setup>
import { ref, computed } from "vue";
import { useCategories } from "@/composables/useCategories.js";
const { categories, loading, error } = useCategories();
import { useRoute } from 'vue-router';
import { useCartStore } from "@/stores/cart";
import { useLanguageStore } from "@/stores/language";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // your Pinia auth store
import LoginFormModal from "@/components/auth/LoginFormModal.vue";
import RegistrationModal from "@/components/auth/RegistrationModal.vue";

const route = useRoute();
const isSidebarOpen = ref(false);
const cartStore = useCartStore();
const langStore = useLanguageStore();
const router = useRouter();
const authStore = useAuthStore();
const showLoginModal = ref(false);
const showRegister = ref(false);

const cartQty = computed(() => cartStore.items.length); // or sum quantities if needed

// Navigation methods
const goToCart = () => {
    cartStore.toggleCart(true);
}
const goHome = () => {
    router.push('/');
}

const goProfile = () => {
    if (authStore.isAuthenticated) {
        router.push("/profile");
    } else {
        showLoginModal.value = true;
    }
};

function openRegister() {
    showLoginModal.value = false;
    showRegister.value = true;
}

</script>

<template>
    <nav class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md z-49 lg:hidden py-1">
        <div class="flex justify-between">

            <button @click="isSidebarOpen = true" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <i class="pi pi-list text-xl"></i>
            </button>

            <!-- Cart -->
            <button @click="goToCart" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <div class="relative">
                    <i class="pi pi-shopping-cart text-xl"></i>
                    <span v-if="cartQty > 0"
                        class="absolute -top-2 left-1/1 -translate-x-1/2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {{ cartQty }}
                    </span>
                </div>
            </button>

            <button @click="goHome" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <i class="pi pi-home text-xl"></i>
            </button>

            <!-- Profile -->
            <button @click="goProfile" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <i class="pi pi-user text-xl"></i>
            </button>
        </div>
    </nav>

    <transition name="slide-fade">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-50 flex">
            <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="isSidebarOpen = false"></div>
            <aside class="relative w-64 bg-white shadow-xl p-4 overflow-y-auto border-r border-gray-200">
                <div class="flex justify-end mb-4">
                    <button @click="isSidebarOpen = false"
                        class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <ul class="space-y-2">
                    <li v-for="category in categories" :key="category.id">
                        <router-link :to="`/category/${category.slug}`"
                            class="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-red-200 transition-colors hover:font-bold hover:text-red-950"
                            :class="{
                                'bg-red-200 font-bold text-red-950': route.params.slug === category.slug
                            }">
                            <div class="flex items-center">
                                <img v-if="category.image" :src="category.image" alt="" class="w-6 h-6 mr-3"
                                    loading="lazy" />
                                <span>{{ category.name }}</span>
                            </div>
                            <i class="pi pi-chevron-right text-sm"></i>
                        </router-link>
                    </li>
                </ul>
            </aside>
        </div>
    </transition>

    <LoginFormModal :show="showLoginModal" @close="() => { showLoginModal = false }" @open-register="openRegister" />

    <RegistrationModal :show="showRegister" @close="showRegister = false" @open-login="() => showLoginModal.value = true" />
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>
