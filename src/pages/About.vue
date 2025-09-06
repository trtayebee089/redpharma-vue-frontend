<template>
    <section class="container pt-40 mx-auto px-4 md:px-6 py-12 space-y-16">

        <!-- About Us -->
        <div class="text-center md:text-left max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
            <p class="text-gray-700 text-base md:text-lg leading-relaxed">
                ZonHack is a premier e-commerce services agency dedicated to helping brands succeed on global
                marketplaces such as Amazon, eBay, Walmart, and Etsy.
                We specialize in account management, product listing optimization, and growth strategies tailored to
                each seller’s unique needs.
            </p>
            <p class="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                Founded with a passion for simplifying online selling, our team combines technical expertise,
                marketplace insights, and a client-first approach to deliver measurable results.
            </p>
        </div>

        <!-- Why Choose Us -->
        <div class="max-w-5xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Why Choose Us</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                    <i class="pi pi-briefcase text-4xl text-green-500 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">Expertise</h3>
                    <p class="text-gray-600 text-sm md:text-base">
                        Our team has years of experience in managing successful seller accounts across multiple
                        marketplaces.
                    </p>
                </div>

                <div class="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                    <i class="pi pi-chart-line text-4xl text-green-500 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">Results-Driven</h3>
                    <p class="text-gray-600 text-sm md:text-base">
                        We focus on strategies that maximize sales, increase visibility, and boost customer engagement
                        for your brand.
                    </p>
                </div>

                <div class="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
                    <i class="pi pi-users text-4xl text-green-500 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">Client-Centric</h3>
                    <p class="text-gray-600 text-sm md:text-base">
                        Your goals are our priority. We provide personalized services, timely support, and transparent
                        reporting.
                    </p>
                </div>
            </div>
        </div>

        <!-- Contact Details -->
        <div class="max-w-4xl mx-auto bg-green-50 rounded-lg p-6 shadow-lg">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Contact Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <p class="flex items-center space-x-2"><i class="pi pi-map-marker text-green-500"></i> <span>123 Main
                        Street, City, Country</span></p>
                <p class="flex items-center space-x-2"><i class="pi pi-phone text-green-500"></i> <span>+1 234 567
                        890</span></p>
                <p class="flex items-center space-x-2"><i class="pi pi-envelope text-green-500"></i>
                    <span>support@zonhack.com</span></p>
                <p class="flex items-center space-x-2"><i class="pi pi-globe text-green-500"></i>
                    <span>www.zonhack.com</span></p>
            </div>
        </div>

    </section>
</template>

<script setup>
    // No dynamic logic needed yet
</script>

<style scoped>
    /* Optional: Add subtle fade-in animations for sections */
    section>div {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s forwards;
        animation-delay: 0.2s;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
