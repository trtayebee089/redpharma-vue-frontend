<template>
    <PageTemplate>
        <div class="relative fade-up mb-16 container mx-auto max-w-5xl pt-6">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
                <p class="text-gray-600">Find answers to the most frequently asked questions.</p>
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
        ref
    } from "vue";
import PageTemplate from "../components/layout/PageTemplate.vue";

    // FAQ data
    const faqs = [{
            question: "How to place an order?",
            answer: "Browse our medicines or products, add them to your cart, and proceed to checkout. You can pay via multiple payment methods.",
        },
        {
            question: "How to contact with a doctor?",
            answer: "You can contact our partnered doctors via the consultation section. Fill out the form and a doctor will reach out to you.",
        },
        {
            question: "How to use my points?",
            answer: "Points earned from previous purchases can be redeemed at checkout for discounts according to your membership tier.",
        },
        {
            question: "How to know about available doctors?",
            answer: "Our website lists all available doctors with their specialties and reviews. You can filter based on your needs.",
        },
        {
            question: "How to track my order?",
            answer: "Use the Order Tracking page and enter your order ID to get the latest updates on your delivery.",
        },
    ];

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
