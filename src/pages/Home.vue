<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CategoryImage from '@/components/common/CategoryImage.vue';
import PrescriptionUpload from '@/components/common/PrescriptionUpload.vue';
import HeroSlider from '@/components/layout/HeroSlider.vue';
import HomeProductRail from '@/components/products/HomeProductRail.vue';
import { useCategories } from '@/composables/useCategories.js';
import { useCategoryNames } from '@/composables/useCategoryNames.js';
import { useProducts } from '@/composables/useProducts.js';

const { t } = useI18n();
const categoryName = useCategoryNames();
const { categories, loading, fetchCategoryDetails } = useCategories();
const { featured, bestSelling, fetchFeaturedProducts, fetchBestSellingProducts } =
  useProducts({ fetchOnMount: false });

const categoryProducts = reactive({});
const populatedCategories = computed(() => categories.value.filter(
  category => categoryProducts[category.slug]?.length > 3,
));
const animateCarousels = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const categoryBreakpoints = {
  540: { slidesPerView: 3, spaceBetween: 12 },
  768: { slidesPerView: 4, spaceBetween: 14 },
  1240: { slidesPerView: 6, spaceBetween: 16 },
};
const contacts = [
  { label: 'home.support.call', icon: 'pi-phone', href: 'tel:+8801997202010' },
  { label: 'WhatsApp', icon: 'pi-whatsapp', href: 'https://wa.me/8801997202010', external: true },
  { label: 'Facebook', icon: 'pi-facebook', href: 'https://www.facebook.com/redpharmabd/', external: true },
];

watch(categories, (list) => {
  for (const category of list) {
    const slug = category.slug;
    if (slug in categoryProducts) continue;
    categoryProducts[slug] = [];
    fetchCategoryDetails(slug).then(products => {
      categoryProducts[slug] = products ?? [];
    });
  }
}, { immediate: true });

onMounted(() => Promise.all([fetchBestSellingProducts(), fetchFeaturedProducts()]));
</script>

<template>
  <div class="store-home">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-intro">
        <h1 id="home-title">{{ t('home.welcome.title') }}</h1>
        <p>{{ t('home.welcome.description') }}</p>
        <div class="home-intro-actions">
          <RouterLink to="/categories" class="home-primary-action">
            {{ t('home.welcome.browse') }} <i class="pi pi-arrow-right" aria-hidden="true"></i>
          </RouterLink>
          <RouterLink to="/order-tracking" class="home-track-action">{{ t('header.buttons.track') }}</RouterLink>
        </div>
      </div>
      <HeroSlider :animate="animateCarousels" />
    </section>

    <section class="home-section" aria-labelledby="home-categories">
      <div class="home-section-heading">
        <h2 id="home-categories">{{ t('home.product_categories') }}</h2>
        <RouterLink to="/categories" class="home-section-link">
          {{ t('home.view_all') }} <i class="pi pi-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </div>

      <Swiper
        v-if="categories.length"
        class="home-category-carousel"
        :modules="[A11y, Autoplay, Navigation]"
        :slides-per-view="2"
        :space-between="10"
        :breakpoints="categoryBreakpoints"
        :loop="categories.length > 6"
        :navigation="true"
        :autoplay="animateCarousels && categories.length > 6
          ? { delay: 4200, disableOnInteraction: true, pauseOnMouseEnter: true }
          : false"
        :a11y="{ prevSlideMessage: t('home.carousel.previous'), nextSlideMessage: t('home.carousel.next') }"
      >
        <SwiperSlide v-for="category in categories" :key="category.id">
          <RouterLink :to="category.navigationPath" class="home-category-card">
            <span class="home-category-media">
              <CategoryImage :src="category.image" alt="" loading="lazy" decoding="async" />
            </span>
            <span class="home-category-name">{{ categoryName(category) }}</span>
          </RouterLink>
        </SwiperSlide>
      </Swiper>
      <p v-else-if="loading" class="home-category-status" role="status">{{ t('common.loading') }}</p>
    </section>

    <section class="home-services" :aria-label="t('home.support.title')">
      <PrescriptionUpload />
      <div class="home-support">
        <div>
          <h2>{{ t('home.support.title') }}</h2>
          <p>{{ t('home.support.description') }}</p>
        </div>
        <div class="home-contact-links">
          <a
            v-for="contact in contacts"
            :key="contact.href"
            :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined"
          >
            <i class="pi" :class="contact.icon" aria-hidden="true"></i>
            <span>{{ contact.external ? contact.label : t(contact.label) }}</span>
          </a>
        </div>
      </div>
    </section>

    <HomeProductRail
      :title="t('home.best_selling')"
      :products="bestSelling"
      :autoplay-delay="3200"
      :animate="animateCarousels"
    />
    <HomeProductRail
      :title="t('home.featured_products')"
      :products="featured"
      :autoplay-delay="3600"
      :animate="animateCarousels"
    />
    <HomeProductRail
      v-for="(category, index) in populatedCategories"
      :key="category.slug"
      :title="categoryName(category)"
      :image="category.image"
      :category-path="category.navigationPath"
      :products="categoryProducts[category.slug]"
      :autoplay-delay="3800 + (index % 5) * 300"
      :animate="animateCarousels"
    />
  </div>
</template>

<style scoped>
.store-home {
  --home-ink: #17382b;
  --home-muted: #526459;
  --home-line: #dce8e0;
  --home-green: #137346;
  width: 100%;
  max-width: 100rem;
  margin-inline: auto;
  padding: clamp(.75rem, 2vw, 1.5rem) clamp(.875rem, 3vw, 3rem) 1rem;
}

.home-hero {
  display: grid;
  gap: .75rem;
}

.home-intro {
  display: grid;
  align-content: center;
  justify-items: start;
  gap: .8rem;
  padding: clamp(1.15rem, 2.75vw, 2.5rem);
  border-radius: 1.125rem;
  background: linear-gradient(145deg, #102e23, #1b4d36);
  color: #f2fff8;
}

.home-intro h1 {
  max-width: 11ch;
  margin: 0;
  font-size: clamp(1.85rem, 3.4vw, 3.2rem);
  font-weight: 750;
  line-height: 1.08;
  letter-spacing: -.032em;
}

.home-intro h1:lang(bn) {
  max-width: none;
  letter-spacing: normal;
  line-height: 1.2;
}

.home-section-heading h2:lang(bn) {
  letter-spacing: normal;
  line-height: 1.35;
}

.home-intro p {
  max-width: 33ch;
  color: #d6ece0;
  font-size: clamp(.875rem, 1.2vw, 1rem);
  line-height: 1.55;
}

.home-intro-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .65rem 1rem;
}

.home-primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .55rem;
  min-height: 2.75rem;
  padding: .55rem .8rem;
  border-radius: .625rem;
  background: #d8f5e5;
  color: #164831;
  font-size: .875rem;
  font-weight: 700;
  white-space: nowrap;
}

.home-primary-action:hover {
  background: #fff;
}

.home-track-action {
  color: #f2fff8;
  font-size: .875rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: .22em;
}

.home-section,
.home-services {
  margin-block: clamp(1.35rem, 3vw, 2.65rem);
}

.home-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  margin-bottom: .8rem;
}

.home-section-heading h2 {
  color: var(--home-ink);
  font-size: clamp(1.25rem, 2.2vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -.022em;
  line-height: 1.2;
}

.home-section-link {
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  min-height: 2.5rem;
  color: var(--home-green);
  font-size: .875rem;
  font-weight: 650;
  white-space: nowrap;
}

.home-section-link:hover,
.home-contact-links a:hover {
  text-decoration: underline;
  text-underline-offset: .2em;
}

.home-category-card {
  display: grid;
  justify-items: center;
  gap: .45rem;
  min-height: 100%;
  padding: .55rem .5rem .7rem;
  border: 1px solid var(--home-line);
  border-radius: .8rem;
  background: #fff;
  color: var(--home-ink);
  text-align: center;
}

.home-category-card:hover {
  border-color: #91bfa6;
  background: #f7fbf8;
}

.home-category-media {
  position: relative;
  display: grid;
  width: 100%;
  aspect-ratio: 1.45;
  overflow: hidden;
  place-items: center;
  border-radius: .52rem;
  background: #f3f7f4;
}

.home-category-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.home-category-name {
  align-self: center;
  font-size: .875rem;
  font-weight: 650;
  line-height: 1.3;
}

.home-category-carousel :deep(.swiper-wrapper) {
  align-items: stretch;
}

.home-category-carousel :deep(.swiper-slide) {
  height: auto;
}

.home-category-carousel :deep(.swiper-button-next),
.home-category-carousel :deep(.swiper-button-prev) {
  width: 2rem;
  height: 2rem;
  padding: .4rem;
  border: 1px solid #ccdfd3;
  border-radius: 50%;
  background: #fff;
  color: var(--home-green);
}

.home-category-carousel :deep(.swiper-button-next::after),
.home-category-carousel :deep(.swiper-button-prev::after) {
  font-size: .8rem;
}

.home-category-status {
  padding-block: .85rem;
  color: var(--home-muted);
}

.home-services {
  display: grid;
  gap: .875rem;
}

.home-support {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: .75rem;
  padding: clamp(.95rem, 2vw, 1.4rem);
  border: 1px solid var(--home-line);
  border-radius: 1rem;
  background: #fff;
}

.home-support h2 {
  color: var(--home-ink);
  font-size: 1.08rem;
  font-weight: 700;
}

.home-support p {
  margin-top: .2rem;
  color: var(--home-muted);
  font-size: .875rem;
}

.home-contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}

.home-contact-links a {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  min-height: 2.55rem;
  padding: .4rem .65rem;
  border: 1px solid var(--home-line);
  border-radius: .55rem;
  background: #f6faf7;
  color: #20583b;
  font-size: .8125rem;
  font-weight: 650;
}

.store-home :deep(a:focus-visible),
.store-home :deep(button:focus-visible) {
  outline: 2px solid #22834f;
  outline-offset: 2px;
}

.home-intro a:focus-visible {
  outline-color: #c7f4d8;
}

@media (width >= 760px) {
  .home-services {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width >= 1180px) {
  .home-hero {
    grid-template-columns: minmax(16rem, 1fr) minmax(0, 2.65fr);
  }
}
</style>
