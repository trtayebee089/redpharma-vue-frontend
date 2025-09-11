<script setup>
    import Header from './components/layout/Header.vue'
    import Footer from './components/layout/Footer.vue'
    import CategorySidebar from './components/layout/CategorySidebar.vue'
    import 'primeicons/primeicons.css'
    import CartOffCanvas from './components/cart/CartOffCanvas.vue'

    import PrimeVue from 'primevue/config'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white">
        <!-- Header (fixed in your Header.vue) -->
        <Header />

        <!-- Content area: Sidebar + Main -->
        <div class="flex flex-1">
            <!-- Sidebar (hidden on small screens) -->
            <div class="hidden md:block">
                <CategorySidebar />
            </div>

            <!-- Main content -->
            <main class="container mx-auto flex-1 pt-16">
                <router-view />
            </main>
        </div>

        <!-- Footer (normal flow) -->
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
</style>
