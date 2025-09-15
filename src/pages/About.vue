<template>
    <section class="bg-gray-50 text-gray-800 space-y-12">

        <!-- Hero Section -->
        <div
            class="max-w-5xl mx-auto space-y-4 text-center leading-relaxed bg-green-50 rounded-lg p-6 relative overflow-hidden">
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
            <h1 class="text-3xl md:text-4xl font-bold text-green-600 leading-relaxed font-wb"
                :class="[langStore.langClass]">{{ $t('about.title') }}</h1>
            <p class="text-gray-700 text-lg md:text-xl leading-relaxed font-ws" :class="[langStore.langClass]">
                {{ $t('about.shortDescription') }}</p>
        </div>

        <!-- Benefits Section -->
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 leading-relaxed">

            <!-- Loop through why_us -->
            <div v-for="(section, index) in tm('about.why_us')" :key="index" class="space-y-4">

                <!-- Section Heading -->
                <h2 class="text-2xl font-semibold text-gray-800 font-wb" :class="[langStore.langClass]">
                    {{ section . heading }}</h2>

                <!-- List Type -->
                <ul v-if="section.type === 'list'" class="list-decimal list-inside space-y-2 text-gray-700">
                    <li v-for="(item, i) in section.items" :key="i"
                        :class="[langStore.langClass, 'font-ws']">{{ item }}</li>
                </ul>

                <!-- Paragraphs Type -->
                <div v-else-if="section.type === 'paragraphs'" class="space-y-4 text-gray-700">
                    <p v-for="(item, i) in section.items" :key="i"
                        :class="[langStore.langClass, 'font-ws']">{{ item }}</p>
                </div>

            </div>

        </div>


        <!-- Services Section -->
        <div class="max-w-6xl mx-auto space-y-6 leading-relaxed">
            <h2 class="text-2xl font-semibold text-gray-800 text-center font-wb" :class="[langStore.langClass]">
                {{ $t('about.services.title') }}</h2>
            <!-- Services Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-4">
                <div v-for="(service, index) in tm('about.services.items')" :key="index"
                    class="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow hover:shadow-lg transition border border-green-200 flex flex-col justify-between">
                    <h3 class="text-green-600 font-semibold text-lg sm:text-xl md:text-lg font-wb mb-2"
                        :class="[langStore.langClass]">
                        {{ service . title }}
                    </h3>
                    <p class="text-gray-700 text-sm sm:text-base md:text-sm mt-1 font-ws"
                        :class="[langStore.langClass]">
                        {{ service . description }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Best Selling Medicines Section -->
        <div class="max-w-6xl mx-auto leading-relaxed">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center font-wb" :class="[langStore.langClass]">
                {{ $t('about.best_selling.title') }}</h2>
            <p class="text-gray-700 text-sm text-center">
                Sergel 20 mg Capsule | Napa 500 mg Tablet | Ceevit 250 mg Chewable Tablet | Monas 10 10 mg Tablet |
                Pantonix 20 mg Tablet | Ecosprin 75 mg Tablet | SkinO Hydration Boost Gel 70ml | SkinO Daily Gel
                Moisturizer 70ml | Freyias Aloe Vera Gel 200ml | Caplino Niacinamide Serum 10% 30ml | SkinO Tea Tree
                Soothing Shower Gel 220ml | The Ordinary Niacinamide 10% Zinc 1% 30ml | Cerave Acne Control Cleanser
                237ml | APLB Glutathione Niacinamide Body Lotion 300ml | Dermamate Melasma Solution Facewash 100ml |
                Deconstruct Gel Sunscreen SPF 55+ PA+++ 50g | Pond's Hydra Miracle Hyaluronic Gel 100ml | Axis-Y Dark
                Spot Correcting Glow Serum 5ml | Pantene Miracles Moisture & Power Bond Repair Shampoo 440ml | Simple
                Refreshing Facial Wash 150ml
            </p>
        </div>

    </section>
</template>

<script setup>
    import {
        useI18n
    } from "vue-i18n";
    import {
        useLanguageStore
    } from "@/stores/language";
    const {
        t,
        tm
    } = useI18n();
    const langStore = useLanguageStore();
</script>

<style scoped>
    section>div {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s forwards;
        animation-delay: 0.2s;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
