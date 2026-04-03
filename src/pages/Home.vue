<template>
  <!-- Banner Slider -->
  <HeroSlider />

  <!-- Categories Slider -->
  <section
    class="mt-4 md:mt-10 relative fade-up container mx-auto px-4 md:px-6"
  >
    <div class="category-slider">
      <h2
        class="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
        :class="[langStore.langClass]"
      >
        {{ $t("home.product_categories") }}
        <span
          class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"
        ></span>
      </h2>

      <div v-if="!loading && categories.length">
        <Swiper
          :modules="[Pagination, Autoplay]"
          :slides-per-view="2"
          :space-between="16"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
          }"
          class="pt-5 pb-10"
        >
          <SwiperSlide
            v-for="(category, index) in loading ? Array(6) : categories"
            :key="index"
            class="overflow-visible flex justify-center"
          >
            <!-- Loaded Category -->
            <router-link
              v-if="!loading"
              :to="`/category/${category.slug}`"
              class="group block bg-white rounded-xl overflow-hidden hover:shadow-lg transition border border-gray-200"
            >
              <div class="w-full aspect-square bg-gray-50">
                <img
                  :src="category.image"
                  alt=""
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </router-link>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Loading placeholder -->
      <div v-else class="text-center text-gray-300">
        <Swiper
          :modules="[Pagination, Autoplay]"
          :slides-per-view="2"
          :space-between="16"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
          }"
          class="pt-5 pb-10"
        >
          <SwiperSlide
            v-for="(category, index) in Array(6)"
            :key="index"
            class="overflow-visible flex justify-center"
          >
            <div
              class="w-full aspect-square bg-gray-200 rounded-xl overflow-hidden relative"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"
              ></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section
    class="mt-8 md:mt-10 relative fade-up container mx-auto px-4 md:px-6"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
      <PrescriptionUpload />

      <!-- Quick Contact / Social Stack -->
      <div class="flex flex-col gap-3 h-full md:max-h-[198px]">
        <!-- Row 1 -->
        <div
          class="grid grid-cols-3 gap-2 sm:gap-3 flex-1 min-h-[50px] md:min-h-[64px]"
        >
          <!-- Call (Blue) -->
          <a
            href="tel:+8801997202010"
            class="group rounded-xl shadow-sm border border-blue-200 
             bg-gradient-to-r from-blue-50 to-blue-100/40
             p-2 sm:px-3 sm:py-2 flex items-center justify-center gap-2 
             transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 
             hover:border-blue-300 text-center overflow-hidden"
          >
            <div
              class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 
                  flex items-center justify-center 
                  group-hover:bg-blue-600 group-hover:text-white transition"
            >
              <i class="pi pi-phone text-sm"></i>
            </div>
            <h3
              class="font-bold text-gray-800 text-xs sm:text-sm group-hover:text-blue-700"
            >
              Call Us
            </h3>
          </a>

          <!-- WhatsApp (Green brand) -->
          <a
            href="https://wa.me/8801997202010"
            target="_blank"
            class="group rounded-xl shadow-sm border border-green-200 
             bg-gradient-to-r from-green-50 to-green-100/40
             p-2 sm:px-3 sm:py-2 flex items-center justify-center gap-2 
             transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 
             hover:border-green-300 text-center overflow-hidden"
          >
            <div
              class="w-8 h-8 rounded-full bg-green-100 text-green-600 
                  flex items-center justify-center 
                  group-hover:bg-green-600 group-hover:text-white transition"
            >
              <i class="pi pi-whatsapp text-sm"></i>
            </div>
            <h3
              class="font-bold text-gray-800 text-xs sm:text-sm group-hover:text-green-700"
            >
              WhatsApp
            </h3>
          </a>

          <!-- Facebook (Brand blue) -->
          <a
            href="https://www.facebook.com/redpharmabd/"
            target="_blank"
            class="group rounded-xl shadow-sm border border-[#1877F2]/30 
             bg-gradient-to-r from-[#E7F0FE] to-[#F5F9FF]
             p-2 sm:px-3 sm:py-2 flex items-center justify-center gap-2 
             transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 
             hover:border-[#1877F2]/50 text-center overflow-hidden"
          >
            <div
              class="w-8 h-8 rounded-full bg-[#E7F0FE] text-[#1877F2] 
                  flex items-center justify-center 
                  group-hover:bg-[#1877F2] group-hover:text-white transition"
            >
              <i class="pi pi-facebook text-sm"></i>
            </div>
            <h3
              class="font-bold text-gray-800 text-xs sm:text-sm group-hover:text-[#1877F2]"
            >
              Facebook
            </h3>
          </a>
        </div>

        <!-- Row 2: Message Box (keep green but refined) -->
        <div
          class="flex-1 rounded-xl border border-orange-200 
         bg-gradient-to-r from-orange-50 to-orange-100/40
         p-2 sm:p-3 flex flex-col justify-center items-center 
         text-center shadow-sm"
        >
          <div class="flex items-center gap-2 mb-1">
            <i class="pi pi-info-circle text-orange-600 text-sm"></i>
            <span class="text-sm font-bold text-gray-800">
              Need Medicines Urgently?
            </span>
          </div>
          <p class="text-md text-gray-600 leading-snug lg:max-w-[80%]">
            Call us directly to order or message us on WhatsApp
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Best Selling Products Slider -->
  <section
    class="mt-10 relative featured-product-slider fade-up container mx-auto px-4 md:px-6"
  >
    <div class="category-slider">
      <h2
        class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
        :class="[langStore.langClass]"
      >
        {{ $t("home.best_selling")


        }}<span
          class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"
        ></span>
      </h2>

      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="2"
        :space-between="16"
        :breakpoints="{
          0: { slidesPerView: 2, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }"
        :loop="true"
        :autoplay="{
          delay: 2800,
          disableOnInteraction: false,
        }"
        :navigation="{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }"
        class="pb-4 pt-5"
      >
        <SwiperSlide
          v-for="product in bestSelling"
          :key="product.id"
          class="overflow-visible"
        >
          <ProductGridItem :product="product" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <!-- Products Slider -->
  <section
    class="mt-10 relative featured-product-slider fade-up container mx-auto px-4 md:px-6"
  >
    <div class="category-slider">
      <h2
        class="text-2xl md:text-3xl font-bold mb-5 text-gray-800 relative inline-block"
        :class="[langStore.langClass]"
      >
        {{ $t("home.featured_products")


        }}<span
          class="absolute left-0 bottom-0 w-16 h-1 bg-green-500 rounded-full"
        ></span>
      </h2>

      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="2"
        :space-between="16"
        :breakpoints="{
          0: { slidesPerView: 2, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }"
        :loop="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :navigation="{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }"
        class="pb-4 pt-5"
      >
        <SwiperSlide
          v-for="product in featured"
          :key="product.id"
          class="overflow-visible"
        >
          <ProductGridItem :product="product" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <!-- Top Products By Category Section -->
  <section class="mt-10 relative fade-up">
    <div
      v-for="(item, index) in layoutItems"
      :key="index"
      :class="[
        'transition-all duration-300',
        index % 2 === 0 ? '' : 'bg-white',
      ]"
    >
      <div
        v-if="
          item.type === 'category' &&
          categoryProducts[item.category.slug]?.length > 3
        "
        class="p-5 md:p-8 rounded-xl container mx-auto px-4 md:px-6"
      >
        <div class="flex items-center gap-3 mb-5">
          <div class="flex items-center gap-3">
            <img
              v-if="item.category.image"
              :src="item.category.image"
              :alt="item.category.name"
              class="w-8 h-8 object-cover rounded-sm border border-gray-200 shadow-sm p-1 bg-white"
            />
            <h2
              class="text-xl md:text-2xl font-bold text-gray-800 relative inline-block"
            >
              {{ item.category?.name }}
              <span
                class="absolute left-0 bottom-0 w-16 h-1 rounded-full"
                :style="{
                  backgroundColor: item.category?.bg_color
                    ? '#' + item.category.bg_color.replace('#', '')
                    : '#16a34a', // default color (green)
                }"
              ></span>
            </h2>
          </div>
          <router-link
            :to="`/category/${item.category.slug}`"
            class="ml-auto text-green-800 font-medium hover:underline"
          >
            {{ $t("home.view_all") }}
          </router-link>
        </div>

        <!-- Product Swiper -->
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="2"
          :space-between="16"
          :breakpoints="{
            0: { slidesPerView: 2, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }"
          :loop="true"
          :autoplay="getAutoplay(index)"
          class="pb-4 pt-5"
        >
          <SwiperSlide
            v-for="product in categoryProducts[item.category.slug]"
            :key="product.id"
            class="overflow-visible"
          >
            <ProductGridItem :product="product" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import About from "../pages/About.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import orderMedicineImg from "../assets/images/app-mockuo.png";
import BlogGridItem from "../components/blog/BlogGridItem.vue";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import ProductGridItem from "@/components/products/ProductGridItem.vue";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/language";
import { computed, onMounted, reactive, ref } from "vue";
import { useCategories } from "@/composables/useCategories.js";
import { useProducts } from "@/composables/useProducts";
import slider1 from "@/assets/images/slide-1.jpg";
import slider2 from "@/assets/images/slide-2.jpg";
import slider3 from "@/assets/images/slide-3.jpg";
import PrescriptionUpload from "../components/common/PrescriptionUpload.vue";
import HeroSlider from "@/components/layout/HeroSlider.vue";

const {
  categories,
  products,
  loading,
  error,
  fetchCategories,
  fetchCategoryDetails,
} = useCategories();
const {
  featured,
  bestSelling,
  fetchFeaturedProducts,
  fetchBestSellingProducts,
} = useProducts();

const { t, tm } = useI18n();
const langStore = useLanguageStore();

const articles = [
  {
    title: "5 Tips for a Healthy Lifestyle",
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    link: "/blog/healthy-lifestyle",
    excerpt: "Simple tips to keep your body and mind in balance...",
  },
  {
    title: "The Importance of Regular Exercise",
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    link: "/blog/regular-exercise",
    excerpt: "Discover why exercise is crucial for long-term health...",
  },
  {
    title: "How Nutrition Impacts Your Wellbeing",
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    link: "/blog/nutrition-impact",
    excerpt: "Explore how good nutrition fuels your body...",
  },
  {
    title: "Managing Stress in Daily Life",
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    link: "/blog/stress-management",
    excerpt: "Practical techniques to reduce stress...",
  },
];

const testimonials = [
  {
    name: "Rahul Ahmed",
    role: "Rajshahi",
    quote:
      "Very smooth experience! Medicines arrived on time and the packaging was secure. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    name: "Md Mizanur Rahman",
    role: "Dhaka",
    quote:
      "The consultation option is a life saver. Doctors are really helpful and friendly.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Tanvir Hossain",
    role: "Rajshahi",
    quote:
      "Loved the quick delivery and the easy ordering process. Customer support was excellent.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

function hexToRgba(hex, opacity = 1) {
  if (!hex || typeof hex !== "string") return `rgba(22, 163, 74, ${opacity})`;
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((h) => h + h)
      .join("");
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
  { value: 972756, label: "Reg. Users", displayValue: 0 },
  { value: 140545, label: "Orders Delivered", displayValue: 0 },
  { value: 10134, label: "Operating Hours", displayValue: 0 },
  { value: 2345134, label: "Cost Saved", displayValue: 0 },
  { value: 5000, label: "Medicines Available", displayValue: 0 },
]);

onMounted(async () => {
  try {
    loading.value = true;
    await fetchCategories();
    await fetchFeaturedProducts();
    await fetchBestSellingProducts();
    layoutItems.value = [];

    categories.value.forEach((cat, index) => {
      layoutItems.value.push({ type: "category", category: cat });
      fetchCategoryDetails(cat.slug).then((products) => {
        categoryProducts[cat.slug] = products;
      });
    });
  } finally {
    // loading.value = false;
    loading.value = true;
  }

  stats.value.forEach((stat) => {
    let start = 0;
    const end = stat.value;
    const duration = 1500;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        stat.displayValue = end.toLocaleString();
        clearInterval(counter);
      } else {
        stat.displayValue = Math.floor(start).toLocaleString();
      }
    }, 16);
  });
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

/* Shimmer effect */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    rgba(229, 229, 229, 1) 0%,
    rgba(209, 209, 209, 1) 50%,
    rgba(229, 229, 229, 1) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
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
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 35%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.05) 65%,
    rgba(255, 255, 255, 0) 100%
  );
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
