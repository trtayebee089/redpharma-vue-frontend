<template>
    <div>
        <!-- Banner Slider -->
        <section class="my-10 relative leading-relaxed">
            <div class=" rounded-xl overflow-hidden">
                <Swiper :modules="[Pagination, Navigation, Autoplay]" :slides-per-view="1" :loop="true"
                    :autoplay="{ delay: 4500, disableOnInteraction: false }" :pagination="{ clickable: true }"
                    class="w-full h-[60vh] md:h-[50vh] lg:h-[60vh] relative rounded-xl overflow-hidden shadow-xl">
                    <SwiperSlide v-for="(slide, index) in slides" :key="index" class="relative w-full h-full">

                        <!-- Background Image -->
                        <div class="absolute inset-0 bg-cover bg-center rounded-xl filter brightness-75"
                            :style="{ backgroundImage: `url(${slide.bg})` }"></div>

                        <!-- Stronger Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 rounded-xl">
                        </div>

                        <!-- Slide Content -->
                        <div
                            class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-12">

                            <!-- Title -->
                            <h1
                                class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl mb-4 leading-tight animate-fade-in-down">
                                {{ slide . title }}
                            </h1>

                            <!-- Subtitle -->
                            <h4
                                class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-100 mb-4 max-w-xs sm:max-w-md md:max-w-2xl animate-fade-in-up">
                                {{ slide . subtitle }}
                            </h4>

                            <!-- Optional Description -->
                            <p v-if="slide.description"
                                class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 max-w-md sm:max-w-lg md:max-w-2xl animate-fade-in-up delay-150">
                                {{ slide . description }}
                            </p>

                            <!-- CTA Buttons -->
                            <div
                                class="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 animate-fade-in-up delay-300">
                                <a href="tel:+880123456789"
                                    class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition transform hover:scale-105 flex items-center justify-center text-base sm:text-lg">
                                    <i class="pi pi-phone mr-2"></i> Call Now
                                </a>

                                <a href="https://wa.me/880123456789" target="_blank"
                                    class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg transition transform hover:scale-105 flex items-center justify-center text-base sm:text-lg">
                                    <i class="pi pi-whatsapp mr-2"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

        <!-- Categories Slider -->
        <section class="my-10 relative leading-relaxed">
            <div class="category-slider">
                <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block">
                    Product Categories
                    <span class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"></span>
                </h2>

                <!-- Custom Navigation Buttons -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>

                <Swiper :modules="[Navigation, Pagination]" :slides-per-view="2" :space-between="16"
                    :breakpoints="{
                        640: { slidesPerView: 3, spaceBetween: 16 },
                        768: { slidesPerView: 4, spaceBetween: 20 },
                        1024: { slidesPerView: 8, spaceBetween: 24 }
                    }"
                    :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }" class="pt-5 pb-5">
                    <SwiperSlide v-for="category in categories" :key="category.id" class="overflow-visible">
                        <router-link :to="`/category/${category.slug}`"
                            class="bg-white rounded-lg p-4 text-center flex flex-col items-center hover:shadow-lg transition border-gray-300 border">
                            <img :src="category.image" alt="" class="h-16 mx-auto mb-2 object-contain" />
                            <p class="text-sm font-medium text-gray-800">{{ category . name }}</p>
                        </router-link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

        <!-- CTA SECTION -->
        <section class="my-10 relative leading-relaxed">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- Upload Prescription CTA -->
                <router-link to="/upload-prescription" class="block">
                    <div
                        class="bg-gradient-to-r border border-green-600 from-green-50 via-green-00 to-green-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition transform hover:scale-101 cursor-pointer relative overflow-hidden">
                        <div class="absolute inset-0 opacity-10 pointer-events-none">
                            <svg class="w-full h-full" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M20 0 L0 0 0 20" fill="none" stroke="#FF0B55" stroke-width="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)"></rect>
                            </svg>
                        </div>
                        <div class="text-green-600 text-6xl flex-shrink-0 mt-1 z-10">
                            <i class="pi pi-upload"></i>
                        </div>
                        <div class="flex-1 text-left z-10">
                            <h3 class="text-xl font-bold text-gray-800 mb-2">Upload Your Prescription</h3>
                            <p class="text-gray-600 mb-4">
                                Easily upload your medical prescription and order your medicines online with just a few
                                clicks.
                            </p>
                            <span
                                class="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow inline-block">
                                Upload Now
                            </span>
                        </div>
                    </div>
                </router-link>

                <!-- How Does Upload Work CTA -->
                <div
                    class="bg-white rounded-xl shadow-sm border p-6 flex items-start gap-4 transition relative border-l-8 border-green-600 overflow-hidden">

                    <!-- Decorative pattern (optional subtle diagonal lines) -->
                    <div class="absolute inset-0 opacity-5 pointer-events-none">
                        <svg class="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <circle cx="1" cy="1" r="1" fill="#f87171"></circle>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)"></rect>
                        </svg>
                    </div>

                    <!-- Text content -->
                    <div class="flex-1 text-left z-10">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">How Does Upload Work?</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                            <p class="flex items-start gap-2">
                                <span
                                    class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">1</span>
                                Capture a clear photo of your prescription.
                            </p>
                            <p class="flex items-start gap-2">
                                <span
                                    class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">2</span>
                                Login to upload the photo.
                            </p>
                            <p class="flex items-start gap-2">
                                <span
                                    class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">3</span>
                                Our expert pharmacists will verify your prescription.
                            </p>
                            <p class="flex items-start gap-2">
                                <span
                                    class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">4</span>
                                Our customer agent will call you to confirm the order.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Quick Action Buttons CTA -->
        <section
            class="bg-white leading-relaxed relative flex flex-col md:flex-row items-center justify-center gap-8 ransition my-10">

            <!-- Book Appointment -->
            <a href="/book-appointment"
                class="flex-1 px-6 py-4 bg-green-100 text-zinc-800 font-semibold rounded-full shadow-lg text-center hover:text-zinc-50 hover:bg-green-700 transform hover:scale-105 transition">
                <i class="pi pi-calendar"></i>
                Book Appointment
            </a>

            <!-- Call To Order -->
            <a href="tel:+1234567890"
                class="flex-1 px-6 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg text-center hover:bg-green-700 transform hover:scale-105 transition">
                <i class="pi pi-phone"></i>
                Call To Order
            </a>

            <!-- Doctor Consultation -->
            <a href="/doctor-consultation"
                class="flex-1 px-6 py-4 bg-green-100 text-zinc-800 font-semibold rounded-full shadow-lg text-center hover:text-zinc-50 hover:bg-green-700 transform hover:scale-105 transition">
                <i class="pi pi-users"></i>
                Doctor Consultation
            </a>
        </section>

        <!-- How to Order Medicines Section -->
        <section class="my-10 leading-relaxed relative overflow-hidden rounded-xl">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-lg bg-green-100 p-6 rounded-xl">

                <!-- Left Column: Steps -->
                <div class="md:col-span-8 flex flex-col justify-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">How to Order Medicines</h2>
                    <div class="space-y-4 text-gray-700">
                        <p class="flex items-start gap-3">
                            <span
                                class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">1</span>
                            Browse our medicines catalog and select the products you need.
                        </p>
                        <p class="flex items-start gap-3">
                            <span
                                class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">2</span>
                            Upload your prescription securely through our platform.
                        </p>
                        <p class="flex items-start gap-3">
                            <span
                                class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">3</span>
                            Review your order and provide your delivery details.
                        </p>
                        <p class="flex items-start gap-3">
                            <span
                                class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">4</span>
                            Our pharmacists verify your prescription and confirm your order.
                        </p>
                        <p class="flex items-start gap-3">
                            <span
                                class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">5</span>
                            Receive your medicines at your doorstep quickly and safely.
                        </p>
                    </div>
                </div>

                <!-- Right Column: Image -->
                <div class="md:col-span-4 flex items-center justify-center">
                    <img :src="orderMedicineImg" alt="Order Medicines"
                        class="rounded-lg shadow-lg w-full h-full object-cover">
                </div>

            </div>
        </section>

        <!-- Products Slider -->
        <section class="my-10 leading-relaxed relative featured-product-slider">
            <div class="category-slider">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Featured Products</h2>

                <Swiper :modules="[Navigation, Pagination]" :slides-per-view="2" :space-between="16"
                    :breakpoints="{
                        640: { slidesPerView: 1, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 5, spaceBetween: 24 }
                    }"
                    :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }" class="pb-4 pt-5">
                    <SwiperSlide v-for="product in products" :key="product.id" class="overflow-visible">
                        <ProductGridItem :product="product" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

        <!-- Health Articles Section -->
        <section class="my-12  leading-relaxed">
            <div class="container mx-auto px-4">
                <!-- Section Title -->
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Health Articles
                </h2>

                <!-- Swiper Slider -->
                <Swiper :slides-per-view="1" :space-between="20"
                    :breakpoints="{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 }
                    }"
                    :loop="true" :pagination="{ clickable: true }" :navigation="true" class="pb-10">
                    <!-- Loop through your blog posts -->
                    <SwiperSlide v-for="(article, index) in articles" :key="index">
                        <BlogGridItem :article="article" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>

        <section class="bg-green-50 py-12 md:py-16 rounded-lg my-10">
            <div class="container mx-auto px-6 md:px-12">
                <!-- Heading -->
                <div class="text-center mb-12">
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
                        What Our Customers Say
                    </h2>
                    <p class="text-gray-600 mt-2">
                        Real experiences from our valued customers.
                    </p>
                </div>

                <!-- Testimonials Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="(testimonial, index) in testimonials" :key="index"
                        class="bg-white shadow-lg rounded-xl p-6 flex flex-col">
                        <!-- Rating -->
                        <div class="flex items-center mb-4 text-yellow-400">
                            <i class="pi pi-star-fill" v-for="i in 5" :key="i"></i>
                        </div>

                        <!-- Quote -->
                        <p class="text-gray-600 flex-1">
                            "{{ testimonial . quote }}"
                        </p>

                        <!-- User Info -->
                        <div class="flex items-center mt-6">
                            <img :src="testimonial.image" alt="User Photo"
                                class="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <h4 class="font-semibold text-gray-800">
                                    {{ testimonial . name }}
                                </h4>
                                <p class="text-sm text-gray-500">
                                    {{ testimonial . role }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Us Section -->
        <About />
    </div>
</template>

<script setup>
    import {
        reactive
    } from 'vue'
    import About from '../pages/About.vue'
    import {
        Swiper,
        SwiperSlide
    } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import orderMedicineImg from '../assets/images/order-medicine.png'
    import BlogGridItem from "../components/BlogGridItem.vue";
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
            title: 'RedPharma BD',
            subtitle: 'Your Trusted Online Pharmacy in Bangladesh',
            description: 'Get genuine medicines delivered fast & safely across Bangladesh. Explore a wide range of medicines, healthcare products, and wellness solutions.',
            bg: 'https://img.freepik.com/free-photo/abstract-blur-shopping-mall_1203-8821.jpg'
        },
        {
            title: 'Expert Healthcare Services',
            subtitle: 'Consult Certified Doctors & Access Lab Tests from Home',
            description: 'Connect with qualified healthcare professionals and order lab tests online without leaving your home. Fast, safe, and reliable.',
            bg: 'https://img.freepik.com/free-photo/abstract-blur-defocused-pharmacy-drug-store_1203-9459.jpg'
        },
        {
            title: '24/7 Customer Care & Support',
            subtitle: 'We’re Always Here to Assist You',
            description: 'Our dedicated support team ensures smooth order placement, timely delivery, and professional advice for all your healthcare needs.',
            bg: 'https://img.freepik.com/free-photo/abstract-blur-shopping-mall_74190-5812.jpg'
        }
    ];



    const articles = [{
            title: "5 Tips for a Healthy Lifestyle",
            image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            link: "/blog/healthy-lifestyle",
            excerpt: "Simple tips to keep your body and mind in balance...",
        },
        {
            title: "The Importance of Regular Exercise",
            image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            link: "/blog/regular-exercise",
            excerpt: "Discover why exercise is crucial for long-term health...",
        },
        {
            title: "How Nutrition Impacts Your Wellbeing",
            image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            link: "/blog/nutrition-impact",
            excerpt: "Explore how good nutrition fuels your body...",
        },
        {
            title: "Managing Stress in Daily Life",
            image: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            link: "/blog/stress-management",
            excerpt: "Practical techniques to reduce stress...",
        },
    ];

    const testimonials = [{
            name: "Rahul Ahmed",
            role: "Dhaka",
            quote: "Very smooth experience! Medicines arrived on time and the packaging was secure. Highly recommend!",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            name: "Nusrat Jahan",
            role: "Chittagong",
            quote: "The consultation option is a life saver. Doctors are really helpful and friendly.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Tanvir Hossain",
            role: "Sylhet",
            quote: "Loved the quick delivery and the easy ordering process. Customer support was excellent.",
            image: "https://randomuser.me/api/portraits/men/65.jpg",
        },
    ];

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
    .swiper-button-prev,
    .swiper-button-next {
        position: absolute;
        top: 65%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background-color: #1cb94b;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        z-index: 30;
        transition: all 0.3s ease;
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
        background-color: #1cb94b;
    }

    .swiper-button-prev {
        left: 8px;
    }

    .swiper-button-next {
        right: 8px;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
        font-family: 'PrimeIcons';
        font-size: 1.2rem;
        color: white;
    }

    .swiper-button-prev::after {
        content: "\e900";
    }

    .swiper-button-next::after {
        content: "\e901";
    }

    /* Ripple effect */
    .ripple-btn::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        opacity: 0;
        transform: scale(0);
        animation: ripple 1s infinite;
        top: 0;
        left: 0;
    }

    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 0.6;
        }

        70% {
            transform: scale(2.5);
            opacity: 0;
        }

        100% {
            transform: scale(2.5);
            opacity: 0;
        }
    }
</style>
