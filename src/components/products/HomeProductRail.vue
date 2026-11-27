<script setup>
import { ref, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CategoryImage from '@/components/common/CategoryImage.vue';
import ProductGridItem from '@/components/products/ProductGridItem.vue';

defineProps({
    title: { type: String, required: true },
    products: { type: Array, required: true },
    image: String,
    categoryPath: String,
    autoplayDelay: { type: Number, required: true },
    animate: Boolean,
});

const { t } = useI18n();
const carousel = shallowRef(null);
const canNavigate = ref(false);
const breakpoints = {
    680: { slidesPerView: 3, spaceBetween: 14 },
    1024: { slidesPerView: 3, spaceBetween: 16 },
    1240: { slidesPerView: 4, spaceBetween: 16 },
    1460: { slidesPerView: 5, spaceBetween: 18 },
};

function syncCarousel(swiper) {
    carousel.value = swiper;
    canNavigate.value = !swiper.isLocked;
}
</script>

<template>
    <section v-if="products.length" class="home-product-rail" :aria-label="title">
        <div class="rail-heading">
            <CategoryImage v-if="image" :src="image" alt="" class="rail-category-image" loading="lazy" />
            <h2>{{ title }}</h2>
            <div class="rail-actions">
                <RouterLink v-if="categoryPath" :to="categoryPath" class="rail-view-all">
                    {{ t('home.view_all') }} <i class="pi pi-arrow-right" aria-hidden="true"></i>
                </RouterLink>
                <button v-if="canNavigate" type="button" :aria-label="t('home.carousel.previous')"
                    class="rail-arrow" @click="carousel?.slidePrev()">
                    <i class="pi pi-chevron-left" aria-hidden="true"></i>
                </button>
                <button v-if="canNavigate" type="button" :aria-label="t('home.carousel.next')"
                    class="rail-arrow" @click="carousel?.slideNext()">
                    <i class="pi pi-chevron-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <Swiper
            class="product-carousel"
            :modules="[Autoplay]"
            :slides-per-view="2"
            :space-between="10"
            :breakpoints="breakpoints"
            :loop="products.length > 5"
            :autoplay="animate && products.length > 5
                ? { delay: autoplayDelay, disableOnInteraction: true, pauseOnMouseEnter: true }
                : false"
            @swiper="syncCarousel"
            @lock="syncCarousel"
            @unlock="syncCarousel"
        >
            <SwiperSlide v-for="product in products" :key="product.id">
                <ProductGridItem :product="product" class="home-product-card" />
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<style scoped>
.home-product-rail {
    margin-top: clamp(1.3rem, 2.9vw, 2.5rem);
    padding-top: clamp(.9rem, 2vw, 1.4rem);
    border-top: 1px solid #e3ece6;
}

.rail-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: .55rem;
    margin-bottom: .7rem;
}

.rail-heading h2 {
    flex: 1;
    margin: 0;
    color: #17382b;
    font-size: clamp(1.12rem, 2vw, 1.75rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -.018em;
}

.rail-category-image {
    width: 2rem;
    height: 2rem;
    border: 1px solid #e0ebe3;
    border-radius: .45rem;
    background: #f4f8f5;
    object-fit: cover;
}

.rail-actions {
    display: flex;
    align-items: center;
    gap: .35rem;
}

.rail-view-all {
    display: inline-flex;
    align-items: center;
    gap: .3rem;
    padding: .4rem .15rem;
    color: #137346;
    font-size: .8125rem;
    font-weight: 650;
    white-space: nowrap;
}

.rail-view-all:hover {
    text-decoration: underline;
    text-underline-offset: .22em;
}

.rail-arrow {
    display: grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border: 1px solid #dce8e0;
    border-radius: .5rem;
    background: #fff;
    color: #24583d;
    font-size: .7rem;
}

.rail-arrow:hover {
    border-color: #a4cbb4;
    background: #f1f8f3;
}

.product-carousel {
    padding: .2rem .125rem .5rem;
}

.product-carousel :deep(.swiper-wrapper) {
    align-items: stretch;
}

.product-carousel :deep(.swiper-slide) {
    height: auto;
}

.home-product-card {
    min-width: 0;
    border-color: #e0eae3;
    border-radius: .85rem;
    box-shadow: 0 1px 3px rgb(23 53 40 / 7%);
}

.product-carousel :deep(.home-product-card > a:first-of-type) {
    margin: .3rem .3rem 0;
    border-radius: .6rem;
    background: #f5f8f6;
}

.home-product-card :deep(h5) {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>
