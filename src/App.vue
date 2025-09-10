<script setup>
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'
    import CategorySidebar from './components/CategorySidebar.vue'
    import FloatingCartButton from './components/FloatingCartButton.vue'
    import 'primeicons/primeicons.css'
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

        <FloatingCartButton />
    </div>
</template>
