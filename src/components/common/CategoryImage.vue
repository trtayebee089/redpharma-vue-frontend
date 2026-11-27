<script setup>
import { computed, ref, watch } from 'vue';
import { categoryImageSources } from '@/utils/categoryImage.js';

const props = defineProps({ src: String });
const fallback = '/logo.png';
const candidateIndex = ref(0);
const choices = computed(() => [...categoryImageSources(props.src), fallback]);
const source = computed(() => choices.value[candidateIndex.value]);

watch(() => props.src, () => {
    candidateIndex.value = 0;
}, { flush: 'sync' });

function handleError(event) {
    if (event.currentTarget.getAttribute('src') === source.value) {
        candidateIndex.value += 1;
    }
}
</script>

<template>
    <img
        v-if="source"
        :key="source"
        :src="source"
        :style="source === fallback ? { objectFit: 'contain' } : undefined"
        @error="handleError"
    />
</template>
