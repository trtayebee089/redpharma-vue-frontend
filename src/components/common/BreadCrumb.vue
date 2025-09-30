<template>
    <section class="relative fade-up" v-if="title">
        <div class="rounded-xl overflow-hidden border border-green-100 shadow-sm p-5">
            <!-- Breadcrumb -->
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

            <!-- Title and Description -->
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
