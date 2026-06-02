<template>
    <PageTemplate>
        <div class="relative fade-up mb-16 container mx-auto max-w-5xl pt-6">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ t('helpCenter.title') }}</h1>
                <p class="text-gray-600">{{ t('helpCenter.subtitle') }}</p>
            </div>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index" class="bg-white shadow rounded-lg overflow-hidden">
                    <button @click="toggle(index)"
                        class="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium hover:bg-green-50 transition">
                        <span>{{ faq . question }}</span>
                        <i :class="['pi', openIndex === index ? 'pi-minus' : 'pi-plus', 'text-green-500']"></i>
                    </button>
                    <transition name="accordion">
                        <div v-show="openIndex === index" class="px-6 py-4 border-t border-gray-200 text-gray-700">
                            {{ faq . answer }}
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </PageTemplate>
</template>

<script setup>
    import {
        computed,
        ref
    } from "vue";
import { useI18n } from "vue-i18n";
import PageTemplate from "../components/layout/PageTemplate.vue";

    const { tm } = useI18n();
    const faqs = computed(() => tm("helpCenter.faqs"));

    // State to track which accordion is open
    const openIndex = ref(null);

    // Toggle accordion open/close
    const toggle = (index) => {
        openIndex.value = openIndex.value === index ? null : index;
    };
</script>

<style scoped>
    /* Smooth accordion transition */
    .accordion-enter-active,
    .accordion-leave-active {
        transition: all 0.3s ease;
    }

    .accordion-enter-from,
    .accordion-leave-to {
        max-height: 0;
        opacity: 0;
        padding-top: 0;
        padding-bottom: 0;
    }

    .accordion-enter-to,
    .accordion-leave-from {
        max-height: 500px;
        opacity: 1;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>
