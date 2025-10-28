<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import CategorySidebar from './components/layout/CategorySidebar.vue'
import 'primeicons/primeicons.css'
import CartOffCanvas from './components/cart/CartOffCanvas.vue'
import PrimeVue from 'primevue/config'
import { useI18n } from "vue-i18n";
import { Notivue, Notification, push } from 'notivue'
import { useLanguageStore } from "@/stores/language";
import { watch, ref, onMounted, onUnmounted } from "vue";
import MobileFooter from './components/layout/MobileFooter.vue'
import FloatingChat from './components/common/FloatingChat.vue'
import { useRoute } from 'vue-router'

const { locale } = useI18n();
const langStore = useLanguageStore();
const route = useRoute()

watch(
    () => langStore.lang,
    (newLang) => {
        locale.value = newLang;
    }, {
    immediate: true
}
);

const windowWidth = ref(window.innerWidth)

onMounted(() => {
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
})
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white">
        <Header />

        <div class="flex flex-1 relative">
            <!-- Sidebar -->
            <CategorySidebar class="hidden lg:block" />

            <!-- Main Content -->
            <main :class="[
                route.name !== 'Home'
                    ? (windowWidth >= 1024 ? 'container mx-auto flex-1 p-4 md:p-6' : 'w-full p-4 md:p-6')
                    : '',
                'mb-18 mt-28 md:mt-16 lg:mt-22 relative fade-up main-content'
            ]">
                <router-view />
            </main>
        </div>


        <Footer />

        <CartOffCanvas />

        <MobileFooter />

        <FloatingChat />
    </div>

    <Notivue v-slot="item">
        <Notification :item="item" />
    </Notivue>
</template>

<style>
.fade-up {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.main-content {
    min-height: calc(100vh - 70px);
    width: calc(100% - 16rem);
}

@media (max-width: 1024px) {
    .main-content {
        width: 100%;
    }
}
</style>
