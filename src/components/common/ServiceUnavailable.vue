<script setup>
import logo from '@/assets/logo.png';
defineProps({ initial: Boolean, checking: Boolean });
</script>

<template>
    <main class="availability-page" aria-live="polite" :aria-busy="checking">
        <section class="availability-card">
            <img :src="logo" alt="RedPharma" class="availability-logo" />
            <div class="availability-symbol" aria-hidden="true">+</div>
            <h1>{{ initial ? 'Connecting to RedPharma' : "We're temporarily unavailable" }}</h1>
            <p>{{ initial ? 'Please wait a moment while we connect you.' : 'Our services are currently unavailable. Please try again shortly.' }}</p>
            <div class="availability-status">
                <span class="availability-dot" :class="{ checking }" aria-hidden="true"></span>
                {{ checking ? 'Checking availability…' : 'We’ll reconnect you automatically.' }}
            </div>
        </section>
    </main>
</template>

<style scoped>
.availability-page { min-height: 100vh; min-height: 100dvh; display: grid; place-items: center; padding: 24px; background: #f0fdf4; color: #1f2937; }
.availability-card { width: 100%; max-width: 560px; padding: 48px 32px; text-align: center; background: white; border: 1px solid #dcfce7; border-radius: 24px; box-shadow: 0 12px 40px rgb(22 101 52 / 6%); }
.availability-logo { height: 52px; max-width: 100%; object-fit: contain; margin: 0 auto 36px; }
.availability-symbol { margin: 0 auto 24px; display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; background: #fef2f2; color: #dc2626; font-size: 44px; font-weight: 500; }
h1 { font-size: clamp(24px, 5vw, 32px); font-weight: 700; line-height: 1.25; margin: 0 0 16px; }
p { color: #6b7280; line-height: 1.7; margin: 0; }
.availability-status { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 32px; font-size: 13px; color: #15803d; }
.availability-dot { width: 8px; height: 8px; flex-shrink: 0; border-radius: 50%; background: #22c55e; }
.checking { animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: .3; } }
@media (prefers-reduced-motion: reduce) { .checking { animation: none; } }
@media (max-width: 480px) { .availability-card { padding: 32px 20px; } }
</style>
