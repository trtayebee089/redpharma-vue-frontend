<template>
    <section class="relative fade-up bg-red-50 rounded-xl overflow-hidden border border-red-100 shadow-sm" v-if="title">
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <svg class="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M20 0 L0 0 0 20" fill="none" stroke="#E62727" stroke-width="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"></rect>
            </svg>
        </div>
        <div class="p-5">
            <nav class="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
                <ol class="list-reset flex space-x-2">
                    <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
                        <template v-if="crumb.to">
                            <router-link :to="crumb.to" class="hover:text-green-600">
                                {{ crumb . label }}
                            </router-link>
                        </template>
                        <template v-else>
                            <span
                                :class="index === crumbs.length - 1 ? 'text-gray-800 font-semibold' : 'hover:text-green-600'">
                                {{ crumb . label }}
                            </span>
                        </template>
                        <span v-if="index < crumbs.length - 1" class="mx-2">/</span>
                    </li>
                </ol>
            </nav>
            
            <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                    {{ title }}
                </h1>
                <p v-if="subtitle" class="text-gray-600 text-sm md:text-base">
                    {{ subtitle }}
                </p>
            </div>

            <p v-if="description" class="mt-3 text-gray-700 text-sm md:text-base max-w-3xl">
                {{ description }}
            </p>
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        crumbs: {
            type: Array,
            required: true,
            default: () => [],
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
    });
</script>
