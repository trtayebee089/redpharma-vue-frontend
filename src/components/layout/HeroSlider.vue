<template>
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
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import slider1 from "@/assets/images/slide-1.jpg"
import slider2 from "@/assets/images/slide-2.jpg"
import slider3 from "@/assets/images/slide-3.jpg"

const backgrounds = [
    slider1,
    slider2,
    slider3,
];
</script>

<style></style>