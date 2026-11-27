<template>
    <article class="customer-panel membership-tier" :class="{ 'membership-tier-current': current }">
        <div class="membership-tier-heading">
            <h3>{{ tier.name }}</h3>
            <span v-if="current || locked" class="customer-status" :data-status="current ? 'completed' : 'pending'">
                {{ t(current ? 'membership.current_tier' : 'membership.locked') }}
            </span>
        </div>
        <dl class="membership-tier-facts">
            <div>
                <dt>{{ t('membership.points_needed') }}</dt>
                <dd>{{ n(Number(tier.min_points) || 0) }}</dd>
            </div>
            <div v-if="tier.discount_rate != null">
                <dt>{{ t('membership.discount') }}</dt>
                <dd>{{ n((Number(tier.discount_rate) || 0) / 100, { style: 'percent', maximumFractionDigits: 2 }) }}</dd>
            </div>
        </dl>
        <ul v-if="benefits.length" class="membership-benefits">
            <li v-for="(benefit, index) in benefits" :key="index">
                <i class="pi pi-check" aria-hidden="true"></i>
                {{ benefit }}
            </li>
        </ul>
    </article>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    tier: { type: Object, required: true },
    current: Boolean,
    locked: Boolean,
});

const { t, n } = useI18n();
const benefits = computed(() => {
    const raw = props.tier.benefits;
    const parts = Array.isArray(raw) ? raw : String(raw ?? "").split(",");
    return parts.filter(part => typeof part === "string").map(part => part.trim()).filter(Boolean);
});
</script>

<style scoped>
.membership-tier-current {
    border-color: #90c3a4;
    background: #f6fbf7;
}

.membership-tier-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
}

.membership-tier-heading h3 {
    font-weight: 750;
    font-size: 1.05rem;
}

.membership-tier-facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-top: 14px;
}

.membership-tier-facts dt {
    color: #4d6557;
    font-size: .75rem;
}

.membership-tier-facts dd {
    font-weight: 750;
}

.membership-benefits {
    display: grid;
    gap: 6px;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #dce8e0;
    font-size: .875rem;
}

.membership-benefits li {
    display: flex;
    align-items: baseline;
    gap: 8px;
}

.membership-benefits i {
    color: #176742;
    font-size: .7rem;
}
</style>
