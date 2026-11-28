<script setup>
import { useI18n } from 'vue-i18n';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slider1 from '@/assets/images/slide-1.jpg';
import slider2 from '@/assets/images/slide-2.jpg';
import slider3 from '@/assets/images/slide-3.jpg';
import healthEssentials from '@/assets/images/redpharma_hero_banner_04.png';
import dailyWellness from '@/assets/images/redpharma_hero_banner_05.png';
import pharmacyOffers from '@/assets/images/redpharma_hero_banner_06.png';

defineProps({ animate: Boolean });
const { t } = useI18n();
const slides = [
    { image: slider1, alt: 'home.carousel.shop' },
    { image: slider2, alt: 'home.carousel.app' },
    { image: slider3, alt: 'home.carousel.platform' },
    { image: healthEssentials, alt: 'home.carousel.healthEssentials' },
    { image: dailyWellness, alt: 'home.carousel.dailyWellness' },
    { image: pharmacyOffers, alt: 'home.carousel.pharmacyOffers' },
];
</script>

<template>
    <div class="home-promotion" :aria-label="t('home.carousel.promotions')" role="region">
        <Swiper
            class="promotion-carousel"
            :modules="[A11y, Autoplay, Navigation, Pagination]"
            :slides-per-view="1"
            :loop="true"
            :navigation="true"
            :pagination="{ clickable: true }"
            :autoplay="animate ? { delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true } : false"
            :a11y="{
                prevSlideMessage: t('home.carousel.previous'),
                nextSlideMessage: t('home.carousel.next'),
                paginationBulletMessage: t('home.carousel.goToSlide', { index: '{{index}}' }),
            }"
        >
            <SwiperSlide v-for="(slide, index) in slides" :key="slide.image">
                <img
                    :src="slide.image"
                    :alt="t(slide.alt)"
                    width="1400"
                    height="480"
                    :loading="index === 0 ? 'eager' : 'lazy'"
                    :fetchpriority="index === 0 ? 'high' : undefined"
                    decoding="async"
                />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped>
.home-promotion {
    display: grid;
    align-content: center;
    min-width: 0;
    overflow: hidden;
    border: 1px solid #dce8e0;
    border-radius: 1.125rem;
    background: #f3f8f4;
}

.promotion-carousel {
    width: 100%;
    padding-bottom: 1.35rem;
}

.promotion-carousel img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1400 / 480;
    object-fit: contain;
}

.promotion-carousel :deep(.swiper-button-next),
.promotion-carousel :deep(.swiper-button-prev) {
    width: clamp(1.55rem, 3vw, 2.25rem);
    height: clamp(1.55rem, 3vw, 2.25rem);
    padding: .35rem;
    border: 1px solid #d3e4d9;
    border-radius: 50%;
    background: #fff;
    color: #137346;
}

.promotion-carousel :deep(.swiper-button-next::after),
.promotion-carousel :deep(.swiper-button-prev::after) {
    font-size: .8rem;
}

.promotion-carousel :deep(.swiper-pagination) {
    bottom: 0;
}

.promotion-carousel :deep(.swiper-pagination-bullet-active) {
    background: #137346;
}
</style>
