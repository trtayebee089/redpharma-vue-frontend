<script setup>
    import {
        ref,
        computed
    } from "vue";
    import {
        categories
    } from "@/data/categories.js";
    import {
        useCartStore
    } from "@/stores/cart";
    import {
        useLanguageStore
    } from "@/stores/language";
    import {
        useRouter
    } from "vue-router";
    import {
        useAuthStore
    } from "@/stores/auth"; // your Pinia auth store
    import LoginFormModal from "@/components/auth/LoginFormModal.vue";

    const isSidebarOpen = ref(false);
    const cartStore = useCartStore();
    const langStore = useLanguageStore();
    const router = useRouter();
    const authStore = useAuthStore();
    const showLoginModal = ref(false);

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
</script>

<template>
    <!-- Bottom Navigation (mobile only) -->
    <nav class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md z-50 lg:hidden py-1">
        <div class="flex justify-between">

            <!-- Category Sidebar Opener -->
            <button @click="isSidebarOpen = true" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <i class="pi pi-list text-xl"></i>
                <!-- <span class="text-xs mt-1">Categories</span> -->
            </button>

            <!-- Cart -->
            <button @click="goToCart" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <!-- Icon wrapper -->
                <div class="relative">
                    <i class="pi pi-shopping-cart text-xl"></i>

                    <!-- Badge -->
                    <span v-if="cartQty > 0"
                        class="absolute -top-2 left-1/1 -translate-x-1/2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {{ cartQty }}
                    </span>
                </div>

                <!-- <span class="text-xs mt-1">Cart</span> -->
            </button>


            <!-- Home -->
            <button @click="goHome" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <i class="pi pi-home text-xl"></i>
                <!-- <span class="text-xs mt-1">Home</span> -->
            </button>

            <!-- Profile -->
            <button @click="goProfile" class="flex-1 flex flex-col items-center py-2 hover:bg-gray-100">
                <i class="pi pi-user text-xl"></i>
                <!-- <span class="text-xs mt-1">Profile</span> -->
            </button>
        </div>
    </nav>

    <!-- Login Modal -->
    <LoginFormModal v-if="showLoginModal" @close="showLoginModal = false" />

    <!-- Mobile Sidebar Overlay -->
    <transition name="slide-fade">
        <aside v-if="isSidebarOpen" class="fixed inset-0 z-50 w-64 bg-gray-200 shadow-lg p-4 overflow-y-auto lg:hidden">
            <button @click="isSidebarOpen = false" class="mb-4 px-3 py-2 bg-green-500 text-white rounded">
                Close
            </button>
            <ul>
                <li v-for="category in categories" :key="category.id">
                    <router-link :to="`/category/${category.slug}`" @click="isSidebarOpen = false"
                        class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors">
                        <img :src="category.image" alt="" class="w-6 h-6 mr-3" />
                        <span>{{ category . name }}</span>
                    </router-link>
                </li>
            </ul>
        </aside>
    </transition>
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
