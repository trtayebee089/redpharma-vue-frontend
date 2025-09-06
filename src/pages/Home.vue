<template>
    <div>
        <!-- Banner Slider -->
        <section class="mt-28 relative banner-slider">
            <Swiper :modules="[Pagination, Navigation, Autoplay]" :slides-per-view="1" :loop="true"
                :autoplay="{ delay: 4000, disableOnInteraction: false }" :pagination="{ clickable: true }" navigation
                class="w-full h-[60vh] md:h-[50vh] lg:h-[60vh] relative">
                <SwiperSlide v-for="(slide, index) in slides" :key="index" class="relative w-full h-full">
                    <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${slide.bg})` }">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

                    <div
                        class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-12">
                        <h1
                            class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in-down leading-snug">
                            {{ slide . title }}
                        </h1>
                        <p
                            class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 max-w-xs sm:max-w-md md:max-w-2xl animate-fade-in-up">
                            {{ slide . subtitle }}
                        </p>
                        <div class="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
                            <a href="tel:+1234567890"
                                class="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base">
                                Call Now
                            </a>
                            <a href="https://wa.me/1234567890" target="_blank"
                                class="px-4 sm:px-6 py-2 sm:py-3 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base">
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>


        <!-- Categories Slider -->
        <section class="bg-red-50 py-12">
            <div class="container mx-auto category-slider px-4 md:px-6">
                <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block">
                    Categories
                    <span class="absolute left-0 bottom-0 w-16 h-1 bg-red-500 rounded-full"></span>
                </h2>
                
                <Swiper :modules="[Navigation, Pagination]" :slides-per-view="2" :space-between="16"
                    :breakpoints="{
                        640: { slidesPerView: 3, spaceBetween: 16 },
                        768: { slidesPerView: 4, spaceBetween: 20 },
                        1024: { slidesPerView: 8, spaceBetween: 24 }
                    }"
                    navigation class="pt-5 pb-5">
                    <SwiperSlide v-for="category in categories" :key="category.id" class="overflow-visible">
                        <router-link :to="`/category/${category.slug}`"
                            class="bg-white rounded-lg shadow p-4 text-center flex flex-col items-center hover:shadow-lg transition">
                            <img :src="category.image" alt="" class="h-16 mx-auto mb-2 object-contain" />
                            <p class="text-sm font-medium text-gray-800">{{ category . name }}</p>
                        </router-link>
                    </SwiperSlide>
                </Swiper>
            </div>
``````
        </section>

        <!-- Products Slider -->
        <section class="py-12 featured-product-slider">
            <div class="container mx-auto category-slider px-4 md:px-6">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Featured Products</h2>

                <Swiper :modules="[Navigation, Pagination]" :slides-per-view="2" :space-between="16"
                    :breakpoints="{
                        640: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 5, spaceBetween: 24 }
                    }"
                    navigation class="pb-4 pt-5">
                    <SwiperSlide v-for="product in products" :key="product.id" class="overflow-visible">
                        <ProductGridItem :product="product" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

    </div>
</template>

<script setup>
    import {
        reactive
    } from 'vue'

    import {
        Swiper,
        SwiperSlide
    } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import {
        Pagination,
        Navigation,
        Autoplay
    } from 'swiper/modules'
    import ProductGridItem from '../components/ProductGridItem.vue'
    import {
        categories
    } from '../data/categories'
    import {
        products
    } from '../data/products'

    const slides = [{
            title: 'Welcome to Medicine Store',
            subtitle: 'Order medicines online with fast delivery',
            bg: 'https://img.freepik.com/free-photo/pharmacist-day-celebration-with-male-pharmacist_23-2151734672.jpg'
        },
        {
            title: 'Trusted Pharmacy',
            subtitle: 'Safe & genuine medicines delivered to your home',
            bg: 'https://img.freepik.com/premium-photo/store-with-shelves-full-products-including-sign-that-says-enter_1065421-40118.jpg?w=2000'
        },
        {
            title: '24/7 Support',
            subtitle: 'Call us anytime for assistance',
            bg: 'https://img.freepik.com/premium-photo/shelves-medical-pharmacy-with-pills-medicine_877191-1005.jpg'
        }
    ]

    function increaseQty(product) {
        product.quantity++
    }

    function decreaseQty(product) {
        if (product.quantity > 0) product.quantity--
    }

    function addToCart(product) {
        if (product.quantity > 0) {
            cart.addToCart({
                ...product
            })
        }
    }
</script>

<style scoped>
    /* Optional fade-in animations */
    @keyframes fadeInDown {
        0% {
            opacity: 0;
            transform: translateY(-30px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in-down {
        animation: fadeInDown 0.8s ease-out forwards;
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    /* Custom Swiper Navigation Buttons */
    .custom-swiper-btn {
        @apply absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 shadow-lg cursor-pointer z-30;
    }

    .swiper-button-prev.custom-swiper-btn {
        left: 1rem;
        /* Adjust distance from left */
    }

    .swiper-button-next.custom-swiper-btn {
        right: 1rem;
        /* Adjust distance from right */
    }

    /* Optional: add smooth hover scale */
    .custom-swiper-btn i {
        @apply transition-transform duration-300;
    }

    .custom-swiper-btn:hover i {
        @apply scale-110;
    }
</style>
