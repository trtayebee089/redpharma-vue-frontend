<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import CategorySidebar from './components/layout/CategorySidebar.vue'
import 'primeicons/primeicons.css'
import CartOffCanvas from './components/cart/CartOffCanvas.vue'
import PrimeVue from 'primevue/config'
import { useI18n } from "vue-i18n";
import { Notivue, Notification, push } from 'notivue'
import {
    useLanguageStore
} from "@/stores/language";
import {
    watch
} from "vue";
import FloatingCartButton from './components/cart/FloatingCartButton.vue'
import MobileFooter from './components/layout/MobileFooter.vue'
import FloatingChat from './components/common/FloatingChat.vue'

const { locale } = useI18n();
const langStore = useLanguageStore();

watch(
    () => langStore.lang,
    (newLang) => {
        locale.value = newLang;
    }, {
    immediate: true
}
);
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white">
        <Header />

        <div class="flex flex-1 relative">
            <CategorySidebar class="hidden md:block" />

            <main class="container mx-auto flex-1 p-4 md:p-6 mb-18 mt-28 md:mt-16 relative fade-up main-content">
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
    /* padding-top: 70px; */
    min-height: calc(100vh - 70px);
    width: calc(100% - 16rem);
}
</style>
