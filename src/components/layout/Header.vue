<template>
    <nav
        :class="[
            'fixed top-0 left-0 w-full z-50 bg-green-50 transition-shadow border-b border-green-200',
            { 'shadow-md': isSticky }
        ]">
        <div class="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <!-- Row for Logo + Desktop Search + Buttons -->
            <div class="flex items-center justify-between w-full md:w-full">
                <!-- Logo -->
                <a href="/" class="flex items-center flex-shrink-0">
                    <img :src="mainLogo" alt="Logo" class="h-12" />
                </a>

                <!-- Desktop Search -->
                <div class="hidden md:flex flex-1 justify-center px-4 relative">
                    <div class="relative w-full max-w-2xl">
                        <div class="relative w-full max-w-2xl">
                            <!-- Search Input -->
                            <input type="text" v-model="searchQuery" :placeholder="placeholderText"
                                class="w-full transition bg-white search-input" />

                            <!-- Search Icon (Right) -->
                            <span
                                class="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-gradient-to-bl from-green-400 to-green-600 text-white rounded-r-lg cursor-pointer">
                                <i class="pi pi-search text-lg"></i>
                            </span>
                        </div>

                        <!-- Live Search Results -->
                        <div v-if="searchQuery && filteredProducts.length"
                            class="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-50">
                            <ul>
                                <li v-for="product in filteredProducts" :key="product.id"
                                    class="px-4 py-3 hover:bg-gray-50 flex justify-between items-center gap-3">
                                    <div class="flex-1">
                                        <p class="font-medium text-gray-800">{{ product . name }}</p>
                                        <p class="text-sm text-gray-600">
                                            Brand: {{ product . brand }} | Category:
                                            {{ getCategoryName(product . categoryId) }}
                                        </p>
                                        <p class="text-sm font-semibold text-green-600 mt-1">
                                            ${{ product . price . toFixed(2) }}
                                        </p>
                                    </div>

                                    <button @click="addToCart(product)"
                                        class="relative inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg">
                                        Add to Cart
                                        <span
                                            class="absolute inset-0 bg-white opacity-10 rounded-lg scale-0 hover:scale-100 transition-transform duration-300"></span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Desktop Buttons -->
                <div class="hidden md:flex items-center space-x-4 h-full">
                    <router-link to="/delivery-coverage" class="space-x-2 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-md hover:bg-green-500 hover:text-white transition border border-green-300 shadow-sm px-3">
                        <img :src="deliveryImg" alt="flag" class="w-6 h-6 rounded-sm" />
                        <span class="font-semibold">Coverage</span>
                    </router-link>

                    <router-link to="/order-tracking"
                        class="space-x-2 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-md hover:bg-green-500 hover:text-white transition border border-green-300 shadow-sm px-3">
                        <img :src="trackingImg" alt="flag" class="w-6 h-6 rounded-sm" />
                        <span class="font-semibold">Track</span>
                    </router-link>

                    <button @click="toggleLanguage"
                        class="space-x-2 w-20 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-md hover:bg-green-500 hover:text-white transition border border-green-300 shadow-sm">
                        <img :src="currentFlag" alt="flag" class="w-6 h-6 rounded-sm" />
                        <span class="font-semibold">{{ currentLanguage }}</span>
                    </button>

                    <!-- Cart Button -->
                    <div class="relative">
                        <button @click="cartStore.toggleCart(true)"
                            class="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-md hover:bg-green-500 hover:text-white transition border border-green-300 shadow-sm">
                            <i class="pi pi-shopping-cart text-xl"></i>
                        </button>
                        <!-- Badge -->
                        <span v-if="cartStore.totalQty"
                            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {{ cartStore . totalQty }}
                        </span>
                    </div>

                    <!-- Login Button with User Icon -->
                    <button @click="showLoginModal = true"
                        class="flex items-center justify-center space-x-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-sm h-12">
                        <span class="w-8 h-8 bg-white text-green-600 flex items-center justify-center rounded-full">
                            <i class="pi pi-user text-lg"></i>
                        </span>
                        <span class="font-semibold">Login</span>
                    </button>
                </div>

                <!-- Mobile Hamburger -->
                <button @click="toggleMenu" class="md:hidden focus:outline-none ml-3 text-gray-800">
                    <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Mobile Search -->
            <div class="w-full mt-2 md:hidden relative">
                <input type="text" v-model="searchQuery" placeholder="Search medicines..."
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700" />

                <div v-if="searchQuery && filteredProducts.length"
                    class="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-50">
                    <ul>
                        <li v-for="product in filteredProducts" :key="product.id"
                            class="px-4 py-3 hover:bg-gray-50 flex justify-between items-center gap-3">
                            <div class="flex-1">
                                <p class="font-medium text-gray-800">{{ product . name }}</p>
                                <p class="text-sm text-gray-600">
                                    Brand: {{ product . brand }} | Category: {{ getCategoryName(product . categoryId) }}
                                </p>
                                <p class="text-sm font-semibold text-green-600 mt-1">
                                    ${{ product . price . toFixed(2) }}
                                </p>
                            </div>

                            <button @click="addToCart(product)"
                                class="relative inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg">
                                Add to Cart
                                <span
                                    class="absolute inset-0 bg-white opacity-10 rounded-lg scale-0 hover:scale-100 transition-transform duration-300"></span>
                            </button>

                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-fade">
            <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md">
                <ul class="flex flex-col px-4 py-4 space-y-2 text-gray-700 font-medium">
                    <li><router-link @click.native="closeMenu" to="/">Home</router-link></li>
                    <li><router-link @click.native="closeMenu" to="/shop">Shop</router-link></li>
                    <li><router-link @click.native="closeMenu" to="/about">About Us</router-link></li>
                    <li><router-link @click.native="closeMenu" to="/cart">Cart</router-link></li>
                    <li><router-link @click.native="closeMenu" to="/delivery-coverage">Delivery Coverage</router-link></li>
                    <li><router-link @click.native="closeMenu" to="/order-tracking">Order Tracking</router-link></li>
                    <li class="flex space-x-2 mt-2">
                        <button @click="showLoginModal = true"
                            class="flex-1 bg-green-500 text-white py-2 rounded text-center">
                            Login
                        </button>
                    </li>
                    <li class="flex space-x-2 mt-2">
                        <button @click="toggleLanguage"
                            class="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 rounded text-center">
                            <img :src="currentFlag" alt="flag" class="w-6 h-6 rounded-sm" />
                            <span>{{ currentLanguage }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </transition>

        <LoginFormModal :show="showLoginModal" @close="() => { console.log('Header got close'); showLoginModal = false }" />
    </nav>
</template>

<script setup>
    import {
        ref,
        onMounted,
        onUnmounted,
        computed,
        reactive
    } from 'vue'
    import mainLogo from '@/assets/logo.png';
    import {
        products
    } from "@/data/products.js";
    import {
        categories
    } from "@/data/categories.js";
    import {
        useRoute
    } from 'vue-router'
    import {
        useCartStore
    } from "@/stores/cart"
    import LoginFormModal from '@/components/auth/LoginFormModal.vue';
    import usFlag from '@/assets/icons/us-flag.png';
    import bdFlag from '@/assets/icons/bd-flag.png';
    import deliveryImg from '@/assets/icons/express-delivery.png';
    import trackingImg from '@/assets/icons/order-tracking.png';

    const route = useRoute()
    const showLoginModal = ref(false);

    const currentLanguage = ref('EN');

    const toggleLanguage = () => {
        currentLanguage.value = currentLanguage.value === 'EN' ? 'BN' : 'EN';
    };

    const currentFlag = computed(() => {
        return currentLanguage.value === 'EN' ? usFlag : bdFlag;
    });


    // Function to check if link is active
    const isActive = (path) => route.path === path

    const isMenuOpen = ref(false)
    const isSticky = ref(false)
    const cartStore = useCartStore();

    const searchQuery = ref("");
    const placeholders = [
        "Search medicines...",
        "Search by brand...",
        "Search by category...",
        "Find your prescription..."
    ];

    const placeholderText = ref("");
    let index = 0; // current phrase index
    let charIndex = 0; // current character index
    let isDeleting = false;
    let typingInterval;

    function typeEffect() {
        const currentText = placeholders[index];

        if (!isDeleting) {
            // typing
            placeholderText.value = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                // pause before deleting
                isDeleting = true;
                clearInterval(typingInterval);
                setTimeout(() => {
                    typingInterval = setInterval(typeEffect, 100);
                }, 1500);
            }
        } else {
            // deleting
            placeholderText.value = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % placeholders.length;
            }
        }
    }

    function toggleMenu() {
        isMenuOpen.value = !isMenuOpen.value
    }

    function closeMenu() {
        isMenuOpen.value = false
    }

    function handleScroll() {
        isSticky.value = window.scrollY > 50
    }

    // Filter products based on search query
    const filteredProducts = computed(() => {
        if (!searchQuery.value) return [];
        const query = searchQuery.value.toLowerCase();
        return products.filter(
            (p) =>
            p.name.toLowerCase().includes(query) ||
            (p.brand && p.brand.toLowerCase().includes(query))
        );
    });

    // Get category name by ID
    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : "Unknown";
    };

    // Add product to cart
    const addToCart = (product) => {
        cartStore.addToCart({
            ...product,
            quantity: 1
        });
    };

    onMounted(() => {
        // Add scroll listener
        window.addEventListener("scroll", handleScroll);

        typingInterval = setInterval(typeEffect, 100);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
        clearInterval(typingInterval);
    })
</script>

<style scoped>
    /* Slide fade transition for mobile menu */
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
