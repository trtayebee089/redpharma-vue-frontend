<template>
    <div class="max-w-4xl mx-auto p-6 font-sans text-gray-800 space-y-6 relative leading-relaxed fade-up mb-16">
        <!-- Page Header -->
        <div
            class="max-w-5xl mx-auto text-center leading-relaxed bg-green-100 rounded-lg p-6 relative overflow-hidden mb-6">
            <!-- Decorative background pattern -->
            <div class="absolute inset-0 opacity-10 pointer-events-none">
                <svg class="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M20 0 L0 0 0 20" fill="none" stroke="#013302" stroke-width="1.0" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)"></rect>
                </svg>
            </div>

            <!-- Title -->
            <h1 class="text-3xl md:text-4xl font-bold text-green-600 leading-relaxed mb-2 relative z-10"
                :class="langStore.langClass">
                {{ $t('membership.title') }}
            </h1>

            <!-- Subtitle -->
            <p class="text-gray-700 text-lg md:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto"
                :class="langStore.langClass">
                {{ $t('membership.description') }}
            </p>
        </div>

        <!-- User Points & Tier -->
        <div
            class="bg-white shadow rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 border border-green-200">
            <div>
                <h2 class="text-xl font-semibold text-gray-900">
                    {{ $t('membership.current_tier') }}:
                    <span v-if="currentTier.name !== 'No Tier Yet'"
                        :class="['px-3 py-1 rounded-full font-semibold', currentTier.colorClass]">
                        {{ currentTier.name }}
                    </span>
                    <span v-else class="text-gray-500 italic">Not qualified yet</span>
                </h2>
                <p class="text-gray-600 mt-1">{{ $t('membership.points') }}: <span class="font-medium">{{
                    authStore.user?.points || 0
                        }}</span>
                </p>
                <p class="text-gray-500 text-sm">{{ $t('membership.next_tier') }}: {{ nextTier.name }} at {{
                    nextTier.min_points }} points</p>
            </div>
            <div class="w-full md:w-1/2">
                <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-4 rounded-full transition-all duration-500" :style="{
                        width: progress + '%',
                        backgroundColor: currentTier.color_code
                            ? (currentTier.color_code.startsWith('#') ? currentTier.color_code : '#' + currentTier.color_code)
                            : '#A7F3D0' // default mint green fallback
                    }"></div>
                </div>
                <p class="text-right text-gray-500 text-sm mt-1">{{ progress.toFixed(0) }}% completed to next tier</p>
            </div>
        </div>

        <!-- Tier Cards -->
        <div v-if="Array.isArray(authStore.rewardPointTiers) && authStore.rewardPointTiers.length"
            class="grid md:grid-cols-3 gap-8">
            <div v-for="tier in authStore.rewardPointTiers" :key="tier.name"
                :class="['relative group bg-white shadow-md rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl', tier.color_class]">
                <!-- Icon -->
                <div class="absolute top-4 left-4 text-4xl transition-transform duration-500 group-hover:scale-110">
                    <template v-if="tier.name.toLowerCase() === 'bronze'">🥉</template>
                    <template v-else-if="tier.name.toLowerCase() === 'silver'">🥈</template>
                    <template v-else-if="tier.name.toLowerCase() === 'gold'">🥇</template>
                    <template v-else-if="tier.name.toLowerCase() === 'platinum'">💎</template>
                    <template v-else>⭐</template>
                </div>

                <!-- Content -->
                <div class="relative p-6 flex flex-col justify-between h-full">
                    <!-- Tier header -->
                    <div class="ml-10">
                        <h3 class="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-green-900">
                            {{ tier.name }}
                        </h3>
                        <p class="text-gray-600 mb-3">
                            <span class="font-medium text-green-700">{{ $t('membership.discount') }}</span>:
                            {{ tier.discount_rate }}%
                        </p>
                        <p class="text-gray-500 text-sm">
                            {{ $t('membership.points_needed') }}:
                            <span class="font-semibold text-gray-700">
                                {{ tier.min_points }}
                            </span>
                            –
                            <span class="font-semibold text-gray-700">
                                {{ tier.max_points }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Transaction Info -->
        <div class="mt-8 bg-white shadow rounded-lg p-6 border border-green-200"
            v-if="authStore.rewardPointUsages.length > 0">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('membership.recent_usage') }}</h3>
            <div v-if="transactions.length">
                <ul class="space-y-2 text-gray-700">
                    <li v-for="(tx, index) in authStore.rewardPointUsages" :key="index">
                        <span class="font-medium">{{ tx.date }}</span>: Used <span class="text-red-500 font-semibold">{{
                            tx.used
                            }} pts</span> for {{ tx.note }}
                    </li>
                </ul>
            </div>
            <p v-else class="text-gray-500">No recent usage.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useLanguageStore } from "@/stores/language";

const { t, tm } = useI18n();
const langStore = useLanguageStore();
const authStore = useAuthStore();
const points = computed(() => authStore.user?.points || 0);

const currentTier = computed(() => {
    const tiersList = Array.isArray(authStore.rewardPointTiers) ? authStore.rewardPointTiers : [];
    if (!tiersList.length) return {};

    let tier = tiersList.find(t => points.value >= t.min_points && points.value <= t.max_points);

    if (points.value < tiersList[0]?.min_points) {
        return {
            name: "No Tier Yet",
            colorClass: "bg-gray-200 text-gray-700",
            bgColor: "#ccc",
            min_points: 0,
            max_points: tiersList[0].min_points,
        };
    }

    if (points.value > tiersList[tiersList.length - 1].max_points) {
        return tiersList[tiersList.length - 1];
    }

    return tier || tiersList[0];
});

const nextTier = computed(() => {
    const tiersList = Array.isArray(authStore.rewardPointTiers) ? authStore.rewardPointTiers : [];
    if (!tiersList.length) return {};

    const next = tiersList.find(t => points.value < t.min_points);
    return next || currentTier.value;
});

const progress = computed(() => {
    const currMin = currentTier.value?.min_points || 0;
    const nextMin = nextTier.value?.min_points || currMin + 1;

    if (points.value < currMin) return (points.value / nextMin) * 100;
    if (points.value >= nextMin) return 100;
    const progress = ((points.value - currMin) / (nextMin - currMin)) * 100;
    return progress;
});

onMounted(async () => {
    await authStore.fetchRewardPointTiers();
    points.value = authStore.user ? authStore.user.points : 0;
});
</script>

<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.badge-bronze {
    background-color: #fff0e2;
    border: 1px solid #b87333;
    color: #1b0606;
}

.badge-silver {
    background-color: #e7e7e7;
    border: 1px solid #aaa9ad;
    color: #1b0606;
}

.badge-gold {
    background-color: #fffadf;
    border: 1px solid #ffcc00;
    color: #1b0606;
}

.badge-platinum {
    background-color: #e5e4e2;
    border: 1px solid #d4d4d4;
    color: #1b0606;
}
</style>
