<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import App from '../App.vue';
import MaintenancePage from './MaintenancePage.vue';
import api from '../api/config';
import { isApiReachable, RETRY_INTERVAL_MS } from '../api/availability';

// Connectivity is deliberately not persisted in storage or cookies.
const available = ref(null);
let interval;
let checking = false;
let disposed = false;

async function checkAvailability() {
    if (checking) return;
    checking = true;
    const reachable = await isApiReachable(api.defaults.baseURL);
    if (!disposed) available.value = reachable;
    checking = false;
}

onMounted(() => {
    checkAvailability();
    interval = window.setInterval(checkAvailability, RETRY_INTERVAL_MS);
    window.addEventListener('online', checkAvailability);
});

onUnmounted(() => {
    disposed = true;
    window.clearInterval(interval);
    window.removeEventListener('online', checkAvailability);
});
</script>

<template>
    <App v-if="available === true" />
    <MaintenancePage v-else-if="available === false" />
    <div v-else class="min-h-screen flex items-center justify-center" role="status">
        Connecting to RedPharma…
    </div>
</template>
