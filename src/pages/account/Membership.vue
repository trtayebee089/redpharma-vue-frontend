<template>
    <div class="customer-page">
        <header class="customer-heading">
            <h1>{{ t('membership.title') }}</h1>
            <p>{{ t('membership.description') }}</p>
        </header>

        <section class="membership-overview customer-panel">
            <div class="membership-balance">
                <div>
                    <p>{{ t('membership.current_points') }}</p>
                    <strong>{{ n(points) }}</strong>
                </div>
                <div>
                    <p>{{ t('membership.current_tier') }}</p>
                    <strong>{{ currentTier?.name || t('membership.noTier') }}</strong>
                </div>
            </div>
            <p v-if="cardNumber" class="membership-number">{{ t('membership.memberNumber', { number: cardNumber }) }}</p>
            <div v-if="nextTier" class="membership-progress">
                <div>
                    <p>{{ t('membership.nextTierAt', { tier: nextTier.name, points: n(Number(nextTier.min_points)) }) }}</p>
                    <p>{{ t('membership.pointsRemaining', { count: n(Number(nextTier.min_points) - points) }) }}</p>
                </div>
                <progress :value="progress" max="100" :aria-label="t('membership.next_tier')"></progress>
            </div>
            <p v-else-if="currentTier" class="membership-number">{{ t('membership.highestTier') }}</p>
        </section>

        <section class="membership-section">
            <h2>{{ t('membership.other_cards') }}</h2>
            <p v-if="loading" class="customer-panel customer-empty" role="status">{{ t('membership.loading') }}</p>
            <p v-else-if="!tiers.length" class="customer-panel customer-empty">{{ t('membership.noTiers') }}</p>
            <div v-else class="membership-tiers">
                <MembershipCard v-for="tier in tiers" :key="tier.id ?? tier.name" :tier="tier"
                    :current="tier === currentTier" :locked="Number(tier.min_points) > points" />
            </div>
        </section>

        <section class="membership-section customer-panel">
            <h2>{{ t('membership.recent_usage') }}</h2>
            <p v-if="loading" class="customer-muted mt-2" role="status">{{ t('membership.loading') }}</p>
            <p v-else-if="!transactions.length" class="customer-muted mt-2">{{ t('membership.noActivity') }}</p>
            <ul v-else class="membership-activity">
                <li v-for="(tx, index) in transactions" :key="tx.id ?? index">
                    <div>
                        <p v-if="tx.note">{{ tx.note }}</p>
                        <p v-if="tx.date" class="customer-muted text-sm">{{ tx.date }}</p>
                    </div>
                    <strong v-if="tx.used != null">{{ t('membership.pointsUsed', { count: n(Number(tx.used) || 0) }) }}</strong>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import MembershipCard from "@/components/layout/MembershipCard.vue";
import "@/assets/customer-pages.css";

const { t, n } = useI18n();
const authStore = useAuthStore();
const loading = ref(true);
const points = computed(() => Number(authStore.user?.points) || 0);
const cardNumber = computed(() => authStore.user?.card_number);
const tiers = computed(() => Array.isArray(authStore.rewardPointTiers)
    ? [...authStore.rewardPointTiers].sort((a, b) => Number(a.min_points) - Number(b.min_points))
    : []);
const transactions = computed(() => Array.isArray(authStore.rewardPointUsages) ? authStore.rewardPointUsages : []);
const currentTier = computed(() => tiers.value.find(tier =>
    points.value >= Number(tier.min_points) && (tier.max_points == null || points.value <= Number(tier.max_points))
) || tiers.value.filter(tier => points.value >= Number(tier.min_points)).at(-1));
const nextTier = computed(() => tiers.value.find(tier => points.value < Number(tier.min_points)));
const progress = computed(() => {
    if (!nextTier.value) return currentTier.value ? 100 : 0;
    const minimum = Number(currentTier.value?.min_points) || 0;
    return Math.max(0, Math.min(100, 100 * (points.value - minimum) / (Number(nextTier.value.min_points) - minimum)));
});

onMounted(async () => {
    try {
        await authStore.fetchRewardPointTiers();
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.membership-overview {
    border-color: #224f39;
    background: #1d4d37;
    color: #fff;
}

.membership-balance {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.membership-balance p,
.membership-number {
    color: #d5ebdc;
    font-size: .875rem;
}

.membership-balance strong {
    font-size: clamp(1.25rem, 3vw, 1.8rem);
    font-weight: 750;
}

.membership-number {
    margin-top: 10px;
}

.membership-progress {
    margin-top: 17px;
    padding-top: 13px;
    border-top: 1px solid #548067;
}

.membership-progress > div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px 12px;
    font-size: .875rem;
}

.membership-progress progress {
    display: block;
    width: 100%;
    height: 9px;
    margin-top: 10px;
    overflow: hidden;
    border: 0;
    border-radius: 999px;
    background: #48755c;
    color: #a8e4bd;
}

.membership-progress progress::-webkit-progress-bar {
    background: #48755c;
}

.membership-progress progress::-webkit-progress-value,
.membership-progress progress::-moz-progress-bar {
    background: #a8e4bd;
}

.membership-section {
    margin-top: 20px;
}

.membership-section > h2 {
    margin-bottom: 10px;
    font-size: 1.125rem;
    font-weight: 750;
}

.membership-tiers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
    gap: 12px;
}

.membership-activity li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid #e4ebe6;
    font-size: .875rem;
}
</style>
