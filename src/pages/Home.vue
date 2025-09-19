<template>
    <div>
        <!-- Banner Slider -->
        <!-- <section class="relative fade-up">
            <div class=" rounded-xl overflow-hidden">
                <Swiper :modules="[Pagination, Navigation, Autoplay]" :slides-per-view="1" :loop="true"
                    :autoplay="{ delay: 4500, disableOnInteraction: false }"
                    class="w-full h-[40vh] sm:h-[35vh] md:h-[45vh] lg:h-[50vh] xl:h-[60vh] relative rounded-xl overflow-hidden shadow-xl">
                    <SwiperSlide v-for="(slide, index) in slides" :key="index" class="relative w-full h-full">
                        
                        <div class="absolute inset-0 bg-cover bg-center rounded-xl filter brightness-75"
                            :style="{ backgroundImage: `url(${slide.bg})` }" />
                        <div
                            class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 rounded-xl" />
                        <div
                            class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-12">
                            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-2xl mb-4 leading-tight animate-fade-in-down"
                                :class="[langStore.langClass]">
                                {{ slide . title }}
                            </h1>

                            <h4 class="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-gray-100 mb-4 max-w-xs sm:max-w-md md:max-w-2xl animate-fade-in-up"
                                :class="[langStore.langClass]">
                                {{ slide . subtitle }}
                            </h4>

                            <p v-if="slide.description"
                                class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 mb-6 max-w-xs sm:max-w-md md:max-w-2xl animate-fade-in-up delay-150"
                                :class="[langStore.langClass]">
                                {{ slide . description }}
                            </p>

                            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4">
                                <a :href="`tel:${slide.phone}`"
                                    class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg flex items-center justify-center text-sm sm:text-base md:text-lg"
                                    :class="[langStore.langClass]">
                                    <i class="pi pi-phone mr-2 text-sm sm:text-base md:text-lg"></i>
                                    {{ slide . buttons . call }}
                                </a>
                                <a :href="slide.whatsapp" target="_blank"
                                    class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg flex items-center justify-center text-sm sm:text-base md:text-lg"
                                    :class="[langStore.langClass]">
                                    <i class="pi pi-whatsapp mr-2 text-sm sm:text-base md:text-lg"></i>
                                    {{ slide . buttons . whatsapp }}
                                </a>
                            </div>

                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section> -->

        <!-- Banner Slider -->
        <section class="relative pt-6">
            <div class="rounded-xl overflow-hidden border border-red-100">
                <Swiper :modules="[Pagination, Navigation, Autoplay]" :slides-per-view="1" :loop="true"
                    :autoplay="{ delay: 4500, disableOnInteraction: false }"
                    class="w-full relative rounded-xl overflow-hidden shadow-xl" style="aspect-ratio: 1400/480;">
                    <SwiperSlide v-for="(slide, index) in slides" :key="index" class="relative w-full h-full ">
                        <!-- Background Image -->
                        <img :src="slide.bg" alt="slide image" class="w-full h-full object-contain "
                            style="object-position: center;" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
        
        <!-- Categories Slider -->
        <section class="mt-10 relative  fade-up">
            <div class="category-slider">
                <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
                    :class="[langStore.langClass]">
                    {{ $t('home.product_categories') }}
                    <span class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"></span>
                </h2>

                <!-- Custom Navigation Buttons -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>

                <Swiper :modules="[Navigation, Pagination]" :slides-per-view="2" :space-between="16"
                    :breakpoints="{
                        640: { slidesPerView: 3, spaceBetween: 16 },
                        768: { slidesPerView: 4, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 24 },
                        1280: { slidesPerView: 6, spaceBetween: 24 }
                    }"
                    :loop="true"
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
        <section class="mt-10 relative  fade-up">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                <router-link to="/upload-prescription" class="block h-full">
                    <div
                        class="bg-gradient-to-r border border-green-600 from-green-50 via-green-00 to-green-50 rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-4 hover:shadow-lg transition transform hover:scale-101 cursor-pointer relative overflow-hidden text-center md:text-left">

                        <!-- Icon -->
                        <div
                            class="text-green-600 text-8xl z-10 p-5 bg-green-100 w-20 h-20 rounded-lg flex items-center justify-center border border-green-600">
                            <i class="pi pi-upload text-3xl"></i>
                        </div>

                        <!-- Text Content -->
                        <div class="flex-1 z-10">
                            <h3 class="text-xl font-bold mb-2 text-gray-800 relative inline-block"
                                :class="[langStore.langClass]">
                                {{ t('home.cta_section.upload.title') }}
                            </h3>
                            <p class="text-gray-600 mb-4 font-ws" :class="[langStore.langClass]">
                                {{ t('home.cta_section.upload.description') }}
                            </p>
                            <span
                                class="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow inline-block"
                                :class="[langStore.langClass]">{{ t('home.cta_section.upload.button') }}</span>
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
                        <h3 class="text-xl font-bold text-gray-800 mb-4 font-wb" :class="[langStore.langClass]">
                            {{ t('home.cta_section.how_it_works.title') }}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                            <p v-for="(step, index) in tm('home.cta_section.how_it_works.steps')"
                                :key="index" class="flex items-start gap-2 font-ws"
                                :class="[langStore.langClass]">
                                <span
                                    class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                                    {{ index + 1 }}
                                </span>
                                {{ step }}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Quick Action Buttons CTA -->
        <section
            class="bg-white relative flex flex-col md:flex-row items-center justify-center gap-8 transition my-10 fade-up">
            <a v-for="(btn, index) in tm('home.quick_actions')" :key="index" :href="btn.link"
                :class="`${btn.bg} ${btn.textColor} ${langStore.langClass} font-wb flex-1 px-6 py-4 font-semibold rounded-full shadow-lg text-center hover:bg-green-600 hover:text-white transform hover:scale-105 transition`">
                <i :class="btn.icon"></i>
                {{ btn . text }}
            </a>
        </section>

        <!-- How to Order Medicines Section -->
        <section class="mt-10 relative overflow-hidden rounded-xl fade-up">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-lg bg-green-100 p-6 rounded-xl">

                <!-- Left Column: Steps -->
                <div class="md:col-span-8 flex flex-col justify-center">
                    <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
                        :class="[langStore.langClass]">{{ t('home.how_to_order.title') }}</h2>
                    <div class="space-y-4 text-gray-700">
                        <p v-for="(step, index) in tm('home.how_to_order.steps')" :key="index"
                            class="flex items-start gap-3 font-ws" :class="[langStore.langClass]">
                            <span
                                class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold">{{ index + 1 }}</span>
                            {{ step }}
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
        <section class="mt-10 relative featured-product-slider fade-up">
            <div class="category-slider">
                <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
                    :class="[langStore.langClass]">{{ $t('home.featured_products') }}</h2>

                <Swiper :modules="[Navigation, Pagination]" :slides-per-view="2" :space-between="16"
                    :breakpoints="{
                        0: { slidesPerView: 1, spaceBetween: 16 }, // mobile <640px
                        640: { slidesPerView: 2, spaceBetween: 16 }, // sm >=640px
                        768: { slidesPerView: 3, spaceBetween: 20 }, // md >=768px
                        1024: { slidesPerView: 3, spaceBetween: 24 }, // lg >=1024px
                        1280: { slidesPerView: 5, spaceBetween: 24 } // xl >=1280px
                    }"
                    :loop="true"
                    :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }" class="pb-4 pt-5">
                    <SwiperSlide v-for="product in products" :key="product.id" class="overflow-visible">
                        <ProductGridItem :product="product" />
                    </SwiperSlide>
                </Swiper>

            </div>
        </section>

        <!-- Health Articles Section -->
        <section class="my-12   fade-up">
            <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
                :class="[langStore.langClass]">
                {{ $t('home.health_articles') }}
            </h2>

            <Swiper :slides-per-view="1" :space-between="20"
                :breakpoints="{
                    0: { slidesPerView: 1, spaceBetween: 16 }, // mobile <640px
                    768: { slidesPerView: 2, spaceBetween: 20 }, // md >=768px
                    1280: { slidesPerView: 3, spaceBetween: 24 } // xl >=1280px
                }"
                :loop="true" :pagination="{ clickable: true }" :navigation="true" class="pb-10">
                <!-- Loop through your blog posts -->
                <SwiperSlide v-for="(article, index) in articles" :key="index">
                    <BlogGridItem :article="article" />
                </SwiperSlide>
            </Swiper>
        </section>

        <section class="bg-green-50 py-12 md:py-16 rounded-lg my-10 fade-up">
            <div class="container mx-auto px-6 md:px-12">
                <!-- Heading -->
                <div class="text-center mb-12">
                    <h2 class="text-2xl md:text-3xl font-bold mb-2 text-gray-800 relative inline-block"
                        :class="[langStore.langClass]">
                        {{ $t('home.testimonials.title') }}
                    </h2>
                    <p class="text-gray-600 mt-0 font-ws" :class="[langStore.langClass]">
                        {{ $t('home.testimonials.description') }}
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
    import About from '../pages/About.vue'
    import {
        Swiper,
        SwiperSlide
    } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'
    import orderMedicineImg from '../assets/images/order-medicine.png'
    import BlogGridItem from "../components/blog/BlogGridItem.vue";
    import {
        Pagination,
        Navigation,
        Autoplay
    } from 'swiper/modules'
    import ProductGridItem from '@/components/products/ProductGridItem.vue'
    import {
        categories
    } from '../data/categories'
    import {
        products
    } from '../data/products'
    import {
        useI18n
    } from "vue-i18n";
    import {
        useLanguageStore
    } from "@/stores/language";
    import {
        computed
    } from "vue";
    import slider1 from "@/assets/images/slide-1.jpg"
    import slider2 from "@/assets/images/slide-2.jpg"
    import slider3 from "@/assets/images/slide-3.jpg"

    const {
        t,
        tm
    } = useI18n();
    const langStore = useLanguageStore();

    const backgrounds = [
        slider1,
        slider2,
        slider3,
    ];

    const phoneNumber = "+880123456789";

    const slides = computed(() => {
        const data = tm("home.hero_section.slides") || [];
        return data.map((s, i) => ({
            ...s,
            bg: backgrounds[i],
            phone: phoneNumber,
            whatsapp: `https://wa.me/${phoneNumber.replace("+", "")}`
        }));
    });

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
