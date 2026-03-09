<template>
    <div
        class="flex flex-col items-center justify-center text-center p-5 bg-gradient-to-br from-green-50 to-white">
        <!-- Lottie Animation -->
        <div ref="lottieContainer" class="w-[600px] h-[400px] mb-6"></div>

        <h2 class="text-3xl text-gray-800 mb-4 font-semibold">
            Page Not Found
        </h2>
        <p class="text-lg text-gray-600 mb-6 max-w-md">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily
            unavailable.
        </p>

        <!-- Go Home Button -->
        <router-link to="/"
            class="px-8 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105">
            Go Home
        </router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import lottie from 'lottie-web';
import animationData from '@/assets/files/404-not-found.json';

const lottieContainer = ref(null);

onMounted(() => {
    lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
    });
});
</script>
