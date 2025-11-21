<template>
    <section class="bg-gradient-to-b from-white via-red-100 to-white text-gray-800 space-y-20 py-12 overflow-hidden">
        <div class="mx-auto text-center relative px-6">
            <h1 class="max-w-4xl text-3xl md:text-5xl font-extrabold tracking-tight font-wb mb-4 m-auto 
                    bg-gradient-to-l from-red-700 via-red-500 to-red-700 
                    text-transparent bg-clip-text" :class="[langStore.langClass]">
                {{ $t('about.title') }}
            </h1>
            <p class="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-ws"
                :class="[langStore.langClass]">
                {{ $t('about.shortDescription') }}
            </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-start container mx-auto px-4 md:px-6">
            <div v-for="(section, index) in tm('about.why_us')" :key="index"
                class="glass-card p-8 transition-all duration-300 hover:shadow-xl">

                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 bg-green-100/40 text-green-600 flex items-center justify-center rounded-full">
                        <i class="pi pi-check-circle text-xl"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 font-wb" :class="[langStore.langClass]">
                        {{ section.heading }}
                    </h2>
                </div>

                <ul v-if="section.type === 'list'" class="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
                    <li v-for="(item, i) in section.items" :key="i" :class="[langStore.langClass, 'font-ws']">
                        {{ item }}
                    </li>
                </ul>

                <div v-else-if="section.type === 'paragraphs'" class="space-y-3 text-gray-700 leading-relaxed font-ws">
                    <p v-for="(item, i) in section.items" :key="i" :class="[langStore.langClass]">
                        {{ item }}
                    </p>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 md:px-6">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-10 font-wb relative"
                :class="[langStore.langClass]">
                {{ $t('about.services.title') }}
                <span class="block mx-auto mt-3 w-20 h-1 bg-green-500 rounded-full"></span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="(service, index) in tm('about.services.items')" :key="index"
                    class="glass-card group relative bg-white border border-green-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <!-- <div class="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-2xl -z-10"></div> -->

                    <div class="flex items-center justify-start">
                        <div
                            class="flex items-center justify-center w-14 h-14 mr-4 bg-green-100 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition">
                            <i class="pi pi-bolt text-2xl"></i>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-2 font-wb" :class="[langStore.langClass]">
                                {{ service.title }}
                            </h3>
                            <p class="text-gray-600 text-sm leading-relaxed font-ws m-0" :class="[langStore.langClass]">
                                {{ service.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/language";
const { t, tm } = useI18n();
const langStore = useLanguageStore();
</script>

<style scoped>
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(25px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

section>div {
    animation: fadeInUp 0.8s ease forwards;
}
</style>
