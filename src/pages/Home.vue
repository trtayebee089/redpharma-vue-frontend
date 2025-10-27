<template>
    <!-- Banner Slider -->
    <section class="relative pt-6 container mx-auto px-4 md:px-6">
        <div class="rounded-xl overflow-hidden border border-red-100">
            <Swiper :modules="[Pagination, Navigation, Autoplay]" :slides-per-view="1" :loop="true"
                :autoplay="{ delay: 4500, disableOnInteraction: false }"
                class="swiper-container w-full relative rounded-xl overflow-hidden shadow-xl"
                style="aspect-ratio: 1400/480;">
                <SwiperSlide v-for="(slide, index) in backgrounds" :key="index"
                    class="relative w-full h-full shine-effect">
                    <img :src="slide" alt="slide image" class="w-full h-full object-contain "
                        style="object-position: center;" />
                </SwiperSlide>
            </Swiper>
        </div>
    </section>

    <!-- Categories Slider -->
    <section class="mt-4 md:mt-10 relative fade-up container mx-auto px-4 md:px-6">
        <div class="category-slider">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
                :class="[langStore.langClass]">
                {{ $t('home.product_categories') }}
                <span class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"></span>
            </h2>

            <div v-if="!loading && categories.length">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>

                <Swiper :modules="[Navigation, Pagination]" :slides-per-view="2" :space-between="16" :breakpoints="{
                    640: { slidesPerView: 3, spaceBetween: 16 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                    1280: { slidesPerView: 6, spaceBetween: 24 }
                }" :loop="true" :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }"
                    class="pt-5 pb-5">
                    <SwiperSlide v-for="(category, index) in loading ? Array(6) : categories" :key="index"
                        class="overflow-visible">
                        <router-link v-if="!loading" :to="`/category/${category.slug}`"
                            class="bg-white rounded-lg p-4 text-center flex flex-col items-center hover:shadow-lg transition border-gray-300 border">
                            <img :src="category.image" alt="" class="h-16 mx-auto mb-2 object-contain" loading="lazy" />
                            <p class="text-sm font-medium text-gray-800">{{ category.name }}</p>
                        </router-link>

                        <!-- Placeholder / Skeleton -->
                        <div v-else
                            class="bg-gray-200 rounded-lg p-4 h-32 animate-pulse flex items-center justify-center">
                            <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <!-- Loading placeholder -->
            <div v-else class="text-center py-10 text-gray-500">
                <svg class="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                    </circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                    </path>
                </svg>
            </div>
        </div>
    </section>

    <!-- Best Selling Products Slider -->
    <section class="mt-10 relative featured-product-slider fade-up container mx-auto px-4 md:px-6">
        <div class="category-slider">
            <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
                :class="[langStore.langClass]">{{ $t('home.best_selling') }}<span
                    class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"></span></h2>

            <Swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="2" :space-between="16" :breakpoints="{
                0: { slidesPerView: 2, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 24 }
            }" :loop="true" :autoplay="{
                delay: 2800,
                disableOnInteraction: false,
            }" :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }" class="pb-4 pt-5">
                <SwiperSlide v-for="product in bestSelling" :key="product.id" class="overflow-visible">
                    <ProductGridItem :product="product" />
                </SwiperSlide>
            </Swiper>

        </div>
    </section>

    <!-- CTA SECTION -->
    <section class="mt-10 relative fade-up container mx-auto px-4 md:px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

            <PrescriptionUpload />

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
                        <p v-for="(step, index) in tm('home.cta_section.how_it_works.steps')" :key="index"
                            class="flex items-start gap-2 font-ws" :class="[langStore.langClass]">
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
        class="bg-white relative flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-8 my-10 fade-up transition container mx-auto px-4 md:px-6">
        <a v-for="(btn, index) in tm('home.quick_actions')" :key="index" :href="btn.link" :class="`
      ${btn.bg} ${btn.textColor} ${langStore.langClass}
      font-wb flex items-center justify-center
      px-4 sm:px-5 md:px-6 py-3 sm:py-4 font-semibold
      rounded-full shadow-md sm:shadow-lg text-center
      hover:bg-green-600 hover:text-white transform hover:scale-105 transition

      /* 📱 Responsive width behavior */
      w-[48%] sm:w-[45%] md:w-auto
    `">
            <i :class="btn.icon + ' mr-2 text-lg sm:text-xl'"></i>
            {{ btn.text }}
        </a>
    </section>

    <!-- Products Slider -->
    <section class="mt-10 relative featured-product-slider fade-up container mx-auto px-4 md:px-6">
        <div class="category-slider">
            <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
                :class="[langStore.langClass]">{{ $t('home.featured_products') }}<span
                    class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"></span></h2>

            <Swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="2" :space-between="16" :breakpoints="{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 24 }
            }" :loop="true" :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }" :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }" class="pb-4 pt-5">
                <SwiperSlide v-for="product in featured" :key="product.id" class="overflow-visible">
                    <ProductGridItem :product="product" />
                </SwiperSlide>
            </Swiper>

        </div>
    </section>

    <!-- How to Order Medicines Section -->
    <section class="mt-10 relative overflow-hidden rounded-xl fade-up container mx-auto px-4 md:px-6">
        <div
            class="grid grid-cols-1 md:grid-cols-12 gap-6 shadow-lg bg-red-50 pb-0 p-6 py-4 rounded-xl relative items-center">
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

            <!-- Left Column: Steps -->
            <div class="md:col-span-8 flex flex-col justify-center">
                <h2 class="text-2xl md:text-3xl font-bold mb-4 text-gray-800 relative inline-block"
                    :class="[langStore.langClass]">
                    {{ t('home.how_to_order.title') }}
                </h2>
                <div class="space-y-3 text-gray-700">
                    <p v-for="(step, index) in tm('home.how_to_order.steps')" :key="index"
                        class="flex items-start gap-3 font-ws text-base leading-relaxed" :class="[langStore.langClass]">
                        <span
                            class="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-semibold shrink-0 hover:bg-green-600 transition">
                            {{ index + 1 }}
                        </span>
                        {{ step }}
                    </p>
                </div>
            </div>

            <!-- Right Column: Image -->
            <div class="md:col-span-4 flex items-center justify-center">
                <img :src="orderMedicineImg" alt="Order Medicines" class="max-h-[320px] w-auto object-contain"
                    loading="lazy" />
            </div>
        </div>
    </section>

    <!-- Top Products By Category Section -->
    <section class="mt-10 relative fade-up">
        <div v-for="(item, index) in layoutItems" :key="index" :class="[
            'mb-12 transition-all duration-300',
            index % 2 === 0
                ? ''
                : 'bg-white'
        ]">
            <div v-if="item.type === 'category'" class="p-5 md:p-8 rounded-xl container mx-auto px-4 md:px-6">
                <div class="flex items-center gap-3 mb-5">
                    <div class="flex items-center gap-3">
                        <img v-if="item.category.image" :src="item.category.image" :alt="item.category.name"
                            class="w-8 h-8 object-cover rounded-sm border border-gray-200 shadow-sm p-1 bg-white" />
                        <h2 class="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
                            {{ item.category?.name }}
                            <span class="absolute left-0 bottom-0 w-16 h-1 rounded-full" :style="{
                                backgroundColor: item.category?.bg_color
                                    ? '#' + item.category.bg_color.replace('#', '')
                                    : '#16a34a' // default color (green)
                            }"></span>
                        </h2>
                    </div>
                    <router-link :to="`/category/${item.category.slug}`"
                        class="ml-auto text-green-800 font-medium hover:underline">
                        {{ $t('home.view_all') }}
                    </router-link>
                </div>

                <!-- Product Swiper -->
                <Swiper :modules="[Navigation, Pagination, Autoplay]" :slides-per-view="2" :space-between="16"
                    :breakpoints="{
                        0: { slidesPerView: 1, spaceBetween: 16 },
                        640: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                        1280: { slidesPerView: 5, spaceBetween: 24 }
                    }" :loop="true" :autoplay="getAutoplay(index)" class="pb-4 pt-5">
                    <SwiperSlide v-for="product in categoryProducts[item.category.slug]" :key="product.id"
                        class="overflow-visible">
                        <ProductGridItem :product="product" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </section>


    <section
        class="bg-gradient-to-br from-green-100 to-white py-12 relative overflow-hidden container mx-auto px-4 md:px-6 rounded-xl">
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

        <div class="mx-auto px-4 text-center">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-10">
                {{ t('home.impact_counter') }}
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div v-for="(stat, index) in stats" :key="index" ref="statRefs"
                    class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
                    <p class="text-3xl md:text-4xl font-bold text-green-600 mb-2">

                    </p>
                    <p class="text-gray-700 font-medium"></p>
                    <div class="flex items-center justify-start">
                        <div
                            class="flex items-center justify-center w-14 h-14 mr-4 bg-green-100 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition">
                            <i class="pi pi-bolt text-2xl"></i>
                        </div>

                        <div class="text-left">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2 font-wb" :class="[langStore.langClass]">
                                {{ stat.displayValue }}
                            </h3>
                            <p class="text-gray-600 text-sm leading-relaxed font-ws m-0" :class="[langStore.langClass]">
                                {{ stat.label }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- optional floating gradient animation overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-green-100/0 via-green-100/30 to-green-100/0 animate-shine">
        </div>
    </section>

    <!-- Health Articles Section -->
    <section class="my-12 fade-up hidden container mx-auto px-4 md:px-6">
        <h2 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
            :class="[langStore.langClass]">
            {{ $t('home.health_articles') }}
        </h2>

        <Swiper :slides-per-view="1" :space-between="20" :breakpoints="{
            0: { slidesPerView: 1, spaceBetween: 16 }, // mobile <640px
            768: { slidesPerView: 2, spaceBetween: 20 }, // md >=768px
            1280: { slidesPerView: 3, spaceBetween: 24 } // xl >=1280px
        }" :loop="true" :pagination="{ clickable: true }" :navigation="true" class="pb-10">
            <!-- Loop through your blog posts -->
            <SwiperSlide v-for="(article, index) in articles" :key="index">
                <BlogGridItem :article="article" />
            </SwiperSlide>
        </Swiper>
    </section>

    <!-- Testimonials -->
    <section class="bg-red-50 py-12 md:py-16 rounded-lg my-10 fade-up container mx-auto px-4 md:px-6">
        <div class="container mx-auto px-6 md:px-12">
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
                        "{{ testimonial.quote }}"
                    </p>

                    <!-- User Info -->
                    <div class="flex items-center mt-6">
                        <img :src="testimonial.image" alt="User Photo"
                            class="w-12 h-12 rounded-full object-cover mr-4" />
                        <div>
                            <h4 class="font-semibold text-gray-800">
                                {{ testimonial.name }}
                            </h4>
                            <p class="text-sm text-gray-500">
                                {{ testimonial.role }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <About />
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
import 'swiper/css/autoplay';
import orderMedicineImg from '../assets/images/4307049.png'
import BlogGridItem from "../components/blog/BlogGridItem.vue";
import {
    Pagination,
    Navigation,
    Autoplay
} from 'swiper/modules'
import ProductGridItem from '@/components/products/ProductGridItem.vue'
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/language";
import {
    computed,
    onMounted, reactive, ref
} from "vue";
import {
    useCategories
} from "@/composables/useCategories.js";
import {
    useProducts
} from "@/composables/useProducts";
import slider1 from "@/assets/images/slide-1.jpg"
import slider2 from "@/assets/images/slide-2.jpg"
import slider3 from "@/assets/images/slide-3.jpg"
import PrescriptionUpload from '../components/common/PrescriptionUpload.vue'

const {
    categories,
    products,
    loading,
    error,
    fetchCategories,
    fetchCategoryDetails
} = useCategories();
const {
    featured,
    bestSelling,
    fetchFeaturedProducts,
    fetchBestSellingProducts
} = useProducts();

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
    role: "Rajshahi",
    quote: "Very smooth experience! Medicines arrived on time and the packaging was secure. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
},
{
    name: "Md Mizanur Rahman",
    role: "Dhaka",
    quote: "The consultation option is a life saver. Doctors are really helpful and friendly.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
},
{
    name: "Tanvir Hossain",
    role: "Rajshahi",
    quote: "Loved the quick delivery and the easy ordering process. Customer support was excellent.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
},
];

function hexToRgba(hex, opacity = 1) {
    if (!hex || typeof hex !== 'string') return `rgba(22, 163, 74, ${opacity})`;
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(h => h + h).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const categoryProducts = reactive({});

const layoutItems = ref([]);

const getAutoplay = (index) => ({
    delay: Math.floor(Math.random() * (4000 - 2500 + 1)) + 2500,
    disableOnInteraction: false,
});

const stats = ref([
    { value: 972756, label: 'Reg. Users', displayValue: 0 },
    { value: 140545, label: 'Orders Delivered', displayValue: 0 },
    { value: 10134, label: 'Operating Hours', displayValue: 0 },
    { value: 2345134, label: 'Cost Saved', displayValue: 0 },
    { value: 5000, label: 'Medicines Available', displayValue: 0 },
])

onMounted(async () => {
    try {
        loading.value = true;
        await fetchCategories();
        await fetchFeaturedProducts();
        await fetchBestSellingProducts();
        layoutItems.value = [];

        categories.value.forEach((cat, index) => {
            layoutItems.value.push({ type: 'category', category: cat });
            fetchCategoryDetails(cat.slug).then(products => {
                categoryProducts[cat.slug] = products;
            });
        });
    } finally {
        loading.value = false;
    }

    stats.value.forEach((stat) => {
        let start = 0
        const end = stat.value
        const duration = 1500
        const increment = end / (duration / 16)

        const counter = setInterval(() => {
            start += increment
            if (start >= end) {
                stat.displayValue = end.toLocaleString()
                clearInterval(counter)
            } else {
                stat.displayValue = Math.floor(start).toLocaleString()
            }
        }, 16)
    })
});

</script>

<style scoped>
@keyframes shineX {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.animate-shine {
    animation: shineX 8s linear infinite;
}

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 10s linear infinite;
}

.shine-effect::after {
    content: "";
    position: absolute;
    top: 0;
    left: -80%;
    width: 60%;
    height: 100%;
    background: linear-gradient(120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 35%,
            rgba(255, 255, 255, 0.25) 50%,
            rgba(255, 255, 255, 0.05) 65%,
            rgba(255, 255, 255, 0) 100%);
    transform: skewX(-20deg);
    animation: shine 6s infinite;
    pointer-events: none;
}

@keyframes shine {
    0% {
        left: -80%;
    }

    50% {
        left: 130%;
    }

    100% {
        left: 130%;
    }
}


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

.swiper-container {
    aspect-ratio: 1400 / 480;
}

/* Custom Swiper Navigation Buttons */
.swiper-button-prev,
.swiper-button-next {
    position: absolute;
    top: 75%;
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

@media (max-width: 768px) {

    .swiper-button-prev,
    .swiper-button-next {
        width: 30px;
        height: 30px;
        top: 70%;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
        font-size: 14px;
        /* optional: smaller arrow icons */
    }

    .swiper-button-prev {
        left: -10px !important;
    }

    .swiper-button-next {
        right: -10px !important;
    }
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
