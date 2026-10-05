<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ src: String });
const fallback = '/logo.png';
const source = ref(fallback);
const failed = ref(false);

watch(() => props.src, (src) => {
    source.value = src || fallback;
    failed.value = false;
}, { immediate: true });

function handleError() {
    if (source.value !== fallback) source.value = fallback;
    else failed.value = true;
}
</script>

<template>
    <img :src="source" :style="failed ? { visibility: 'hidden' } : undefined" @error="handleError" />
</template>
