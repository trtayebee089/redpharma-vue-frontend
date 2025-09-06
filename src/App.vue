<script setup>
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'
    import FloatingCartButton from './components/FloatingCartButton.vue'
    import 'primeicons/primeicons.css'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <!-- Header/Navbar -->
        <Header />

        <!-- Main page content -->
        <main class="flex-1 pb-10">
            <router-view />
        </main>

        <!-- Footer -->
        <Footer />

        <!-- Floating Cart Button (visible on all pages) -->
        <FloatingCartButton />
    </div>
</template>
