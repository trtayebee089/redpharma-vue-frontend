<template>
    <nav :class="['fixed top-0 left-0 w-full z-50 bg-white transition-shadow', { 'shadow-md': isSticky }]">
        <div
            class="container mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">

            <!-- Row for Logo + Desktop Search + Buttons -->
            <div class="flex items-center justify-between w-full md:w-full">

                <!-- Logo -->
                <a href="/" class="flex items-center flex-shrink-0">
                    <img :src="mainLogo" alt="Logo" class="h-12" />
                </a>

                <!-- Desktop Search -->
                <div class="hidden md:flex flex-1 justify-center px-4 relative">
                    <input type="text" v-model="searchQuery" placeholder="Search medicines..."
                        class="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700" />

                    <!-- Live Search Results -->
                    <div v-if="searchQuery && filteredProducts.length"
                        class="absolute top-full mt-1 w-full max-w-md bg-white border border-gray-200 rounded shadow-lg z-50">
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

                <!-- Desktop Buttons -->
                <div class="hidden md:flex space-x-4">
                    <button @click="showLoginModal = true"
                        class="btn-navbar bg-red-500 hover:bg-red-600 text-white p-2">
                        Login
                    </button>
                    <router-link to="/register"
                        class="btn-navbar border border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                        Register
                    </router-link>
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

        <!-- Desktop Menu -->
        <div class="hidden md:block border-0 border-gray-200 bg-red-700">
            <div class="container mx-auto px-4 md:px-6">
                <div class="flex items-center justify-between font-medium">

                    <!-- Left side -->
                    <ul class="flex items-center space-x-6">

                        <!-- Categories Dropdown -->
                        <li class="relative group">
                            <button
                                class="flex items-center justify-between bg-red-600 text-white px-4 py-3 w-64 font-semibold hover:bg-red-500 transition-colors">
                                <span>CATEGORIES</span>
                                <i class="pi pi-chevron-down"></i>
                            </button>

                            <!-- Dropdown Menu -->
                            <ul
                                class="absolute left-0 mt-0 w-64 bg-white border border-gray-200 rounded-b shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                                <li v-for="category in categories" :key="category.id"
                                    class="border-b last:border-b-0">
                                    <router-link :to="`/category/${category.slug}`"
                                        :class="['flex items-center px-4 py-3 text-gray-700 hover:bg-red-100 transition-colors',
                                            isActive(`/category/${category.slug}`) ?
                                            'bg-red-100 font-semibold text-red-700' : ''
                                        ]">
                                        <img :src="category.image" alt="" class="w-6 h-6 mr-3" />
                                        <span>{{ category . name }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <!-- Other Menus -->
                        <li>
                            <router-link to="/"
                                :class="['text-white px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors',
                                    isActive('/') ? 'bg-red-600 font-semibold' : ''
                                ]">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/request-order"
                                :class="['text-white px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors',
                                    isActive('/request-order') ? 'bg-red-600 font-semibold' : ''
                                ]">
                                Request Order
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/offers"
                                :class="['text-white px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors',
                                    isActive('/offers') ? 'bg-red-600 font-semibold' : ''
                                ]">
                                Offers
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about"
                                :class="['text-white px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors',
                                    isActive('/about') ? 'bg-red-600 font-semibold' : ''
                                ]">
                                About Us
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/contact"
                                :class="['text-white px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors',
                                    isActive('/contact') ? 'bg-red-600 font-semibold' : ''
                                ]">
                                Contact Us
                            </router-link>
                        </li>

                    </ul>

                    <!-- Right side -->
                    <ul class="flex items-center space-x-6">
                        <li>
                            <router-link to="/cart"
                                :class="['text-white px-3 py-2 rounded hover:bg-red-600 transition-colors',
                                    isActive('/cart') ? 'bg-red-600 font-semibold' : ''
                                ]">
                                <i class="pi pi-shopping-cart pr-2"></i>Cart
                            </router-link>
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
                    <li><router-link @click.native="closeMenu" to="/checkout">Checkout</router-link></li>
                    <li class="flex space-x-2 mt-2">
                        <button @click="showLoginModal = true"
                            class="flex-1 bg-green-500 text-white py-2 rounded text-center">
                            Login
                        </button>
                        <router-link @click.native="closeMenu" to="/register"
                            class="flex-1 border border-green-500 text-green-500 py-2 rounded text-center">Register</router-link>
                    </li>
                </ul>
            </div>
        </transition>

        <LoginFormModal :show="showLoginModal" @close="showLoginModal = false" />
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
    import mainLogo from '../assets/20250308105923.png'
    import {
        products
    } from "@/data/products.js";
    import {
        categories
    } from "@/data/categories.js";
    import {
        useCartStore
    } from "@/stores/cart";
    import {
        useRoute
    } from 'vue-router'
    import LoginFormModal from './LoginFormModal.vue';

    const route = useRoute()
    const showLoginModal = ref(false);

    // Function to check if link is active
    const isActive = (path) => route.path === path

    const isMenuOpen = ref(false)
    const isSticky = ref(false)
    const cartStore = useCartStore();

    function toggleMenu() {
        isMenuOpen.value = !isMenuOpen.value
    }

    function closeMenu() {
        isMenuOpen.value = false
    }

    function handleScroll() {
        isSticky.value = window.scrollY > 50
    }

    const searchQuery = ref("");

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

    onMounted(() => window.addEventListener('scroll', handleScroll))
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))
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
</style>
