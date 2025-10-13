<template>
    <div>
        <!-- WhatsApp Link Card -->
        <a :href="whatsappLink" target="_blank" rel="noopener noreferrer"
            class="block bg-gradient-to-r border border-green-600 from-green-50 via-green-00 to-green-50 rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-4 hover:shadow-lg transition transform hover:scale-101 cursor-pointer relative overflow-hidden text-center md:text-left">
            
            <!-- Icon -->
            <div
                class="text-green-600 text-8xl z-10 p-5 bg-green-100 w-20 h-20 rounded-lg flex items-center justify-center border border-green-600">
                <i class="pi pi-whatsapp text-3xl"></i>
            </div>

            <!-- Text Content -->
            <div class="flex-1 z-10">
                <h3 class="text-xl font-bold mb-2 text-gray-800">
                    {{ t('home.cta_section.upload.title') }}
                </h3>
                <p class="text-gray-600 mb-4 font-ws">
                    {{ t('home.cta_section.upload.description') }}
                </p>
                <span class="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow inline-block">
                    {{ t('home.cta_section.upload.button') }}
                </span>
            </div>
        </a>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const phoneNumber = "8801997202010";
const message = "Hello, I would like to upload my prescription."; 

// Encode message for URL
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
</script>
