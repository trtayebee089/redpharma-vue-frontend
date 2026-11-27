<template>
    <ol v-if="events.length" class="delivery-timeline">
        <li v-for="(event, index) in events" :key="event.id ?? index"
            class="delivery-event" :aria-current="index === 0 ? 'step' : undefined">
            <span class="delivery-marker" :data-status="orderStatusKey(event.status)" aria-hidden="true">
                <i class="pi" :class="statusIcon(event.status)"></i>
            </span>
            <div class="delivery-content">
                <div class="delivery-event-heading">
                    <p class="delivery-event-name">{{ statusLabel(event.status) }}</p>
                    <time v-if="timestamp(event.changed_at)" :datetime="new Date(event.changed_at).toISOString()">
                        {{ formatDate(event.changed_at) }}
                    </time>
                </div>
                <p v-if="event.notes" class="delivery-note">{{ event.notes }}</p>
            </div>
        </li>
    </ol>
    <p v-else class="customer-muted text-sm">{{ t('tracking.noUpdates') }}</p>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { orderStatusKey, useOrderStatus } from "@/composables/useOrderStatus";

const props = defineProps({
    tracking: { type: Array, default: () => [] },
    formatDate: { type: Function, required: true },
});

const { t } = useI18n();
const statusLabel = useOrderStatus();
const timestamp = value => Date.parse(value) || 0;
const events = computed(() => [...(props.tracking || [])].filter(Boolean)
    .sort((a, b) => timestamp(b.changed_at) - timestamp(a.changed_at)));

const icons = {
    pending: "pi-clock",
    confirmed: "pi-check",
    processing: "pi-box",
    packed: "pi-box",
    picked_up: "pi-truck",
    in_transit: "pi-truck",
    out_for_delivery: "pi-map-marker",
    delivered: "pi-check",
    completed: "pi-check",
    on_hold: "pi-pause",
    cancelled: "pi-times",
    returned: "pi-replay",
    rejected: "pi-times",
};

const statusIcon = status => icons[orderStatusKey(status)] || "pi-info";
</script>

<style scoped>
.delivery-timeline {
    list-style: none;
}

.delivery-event {
    position: relative;
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 12px;
    padding-bottom: 14px;
}

.delivery-event:last-child {
    padding-bottom: 0;
}

.delivery-event:not(:last-child)::before {
    position: absolute;
    top: 30px;
    bottom: 0;
    inset-inline-start: 15px;
    width: 2px;
    background: #d6e6db;
    content: "";
}

.delivery-marker {
    z-index: 1;
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 1px solid #cedeeb;
    border-radius: 50%;
    background: #ecf4f9;
    color: #2b5971;
    font-size: .8125rem;
}

.delivery-marker[data-status="pending"],
.delivery-marker[data-status="on_hold"] {
    border-color: #eddda5;
    background: #fff4da;
    color: #795212;
}

.delivery-marker[data-status="cancelled"],
.delivery-marker[data-status="returned"],
.delivery-marker[data-status="rejected"] {
    border-color: #ecc7cc;
    background: #fbe9eb;
    color: #912e3b;
}

.delivery-marker[data-status="completed"],
.delivery-marker[data-status="delivered"] {
    border-color: #cae1d0;
    background: #e7f4eb;
    color: #185d3d;
}

.delivery-content {
    padding: 8px 11px 10px;
    border: 1px solid #e4ece6;
    border-radius: 8px;
    background: #fff;
    overflow-wrap: anywhere;
}

.delivery-event[aria-current="step"] .delivery-content {
    border-color: #c5decf;
    background: #f0f8f2;
}

.delivery-event-heading {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2px 12px;
    align-items: baseline;
}

.delivery-event-name {
    color: #183c2a;
    font-size: .9375rem;
    font-weight: 700;
}

.delivery-event-heading time,
.delivery-note {
    color: #4d6557;
    font-size: .8125rem;
}

.delivery-note {
    margin-top: 4px;
    white-space: pre-line;
}
</style>
