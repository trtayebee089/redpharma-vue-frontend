<script setup>
    import Header from './components/layout/Header.vue'
    import Footer from './components/layout/Footer.vue'
    import CategorySidebar from './components/layout/CategorySidebar.vue'
    import 'primeicons/primeicons.css'
    import CartOffCanvas from './components/cart/CartOffCanvas.vue'
    import PrimeVue from 'primevue/config'
    import { useLanguageStore } from "@/stores/language";
    import {
        ref,
        computed,
        onMounted,
        onBeforeUnmount
    } from "vue";
    
    const langStore = useLanguageStore();
    const langClass = computed(() =>
        langStore.lang === "bn" ? "font-bn" : "font-sans"
    );
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white" :class="langClass">
        <Header />

        <div class="flex flex-1 relative">
            <CategorySidebar class="hidden md:block" />

            <main class="container mx-auto flex-1 pt-16 p-6 mb-18 my-16 relative leading-relaxed fade-up main-content">
                <router-view />
            </main>
        </div>

        <Footer />

        <CartOffCanvas />
    </div>
</template>

<style>
    .fade-up {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s forwards;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .main-content {
        padding-top: 70px;
        min-height: calc(100vh - 70px);
    }
</style>
