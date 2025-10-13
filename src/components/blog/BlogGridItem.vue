<template>
    <div class="bg-white rounded-lg hover:shadow-lg transition flex flex-col h-full relative border border-gray-300">
        <!-- Article Image -->
        <img :src="article.image" alt="Blog Image"
            class="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-lg bg-gray-200" />

        <!-- Content -->
        <div class="p-4 flex flex-col flex-1">
            <!-- Article Title (fixed height for equal card size) -->
            <h3 class="font-semibold text-gray-800 text-base sm:text-lg md:text-xl line-clamp-2 min-h-[3.5rem]">
                {{ article . title }}
            </h3>

            <!-- Article Excerpt -->
            <p class="text-sm text-gray-600 mt-2 flex-1 line-clamp-3">
                {{ article . excerpt }}
            </p>

            <!-- Read More Button -->
            <router-link :to="article.link" class="btn-read-more w-full sm:w-auto mt-6 text-center">
                Read More
            </router-link>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        article: {
            type: Object,
            required: true,
        },
    });
</script>

<style scoped>
    .btn-read-more {
        border-radius: 30px;
        font-family: Inter, sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        letter-spacing: -0.2px;
        line-height: 1.5rem;
        padding: 8px 20px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        background-color: #1cb94b;
        /* Tailwind red-500 */
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .btn-read-more:hover {
        background-color: #169c3e;
        /* Tailwind red-600 */
        transform: translateY(-2px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }

    .btn-read-more::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.4s ease, height 0.4s ease;
        z-index: 0;
    }

    .btn-read-more:hover::after {
        width: 200%;
        height: 500%;
    }

    .btn-read-more>* {
        position: relative;
        z-index: 1;
    }
</style>
