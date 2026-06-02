<template>
    <main class="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <article class="mx-auto max-w-5xl rounded-2xl bg-white p-6 leading-relaxed shadow-sm md:p-10">
            <header class="mb-8 border-b border-gray-100 pb-6 text-center">
                <p v-if="eyebrow" class="mb-2 text-sm font-semibold uppercase tracking-wide text-green-600">
                    {{ eyebrow }}
                </p>
                <h1 class="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                    {{ title }}
                </h1>
                <p v-if="description" class="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
                    {{ description }}
                </p>
            </header>

            <div class="policy-content">
                <slot />
            </div>
        </article>
    </main>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    eyebrow: {
        type: String,
        default: "",
    },
});
</script>

<style scoped>
.policy-content :deep(section) {
    margin-bottom: 2rem;
}

.policy-content :deep(h2) {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
    color: #1f2937;
}

.policy-content :deep(p) {
    margin-bottom: 1rem;
    color: #4b5563;
    line-height: 1.75;
}

.policy-content :deep(ul) {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    list-style-position: inside;
    list-style-type: disc;
    color: #4b5563;
}

.policy-content :deep(li) {
    margin-bottom: 0.35rem;
    line-height: 1.75;
}

.policy-content :deep(a) {
    color: #dc2626;
    font-weight: 500;
}

.policy-content :deep(a:hover) {
    text-decoration: underline;
}
</style>
