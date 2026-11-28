<template>
    <select v-if="units.length > 1" :value="type" class="cart-unit-select"
        :aria-label="t('cart.selectUnitFor', { name: item.name })" @change="changeUnit">
        <option v-for="unit in units" :key="unit.type" :value="unit.type"
            :disabled="unit.type !== type && cartStore.maxLineQuantity(item, unit.type) === 0">
            {{ unit.type === 'piece' ? t('cart.units.piece') :
                t('cart.packOption', { unit: t(`cart.units.${unit.type}`), count: n(unit.pieces) }) }}
        </option>
    </select>
    <span v-else class="cart-unit-label">{{ t('cart.units.piece') }}</span>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { usePush } from "notivue";
import { useCartStore } from "@/stores/cart";
import { cartPieceQuantity, cartUnit, getProductUnits, piecesPerUnit } from "@/utils/cartUnits";

const props = defineProps({ item: { type: Object, required: true } });
const { t, n } = useI18n();
const cartStore = useCartStore();
const push = usePush();
const type = computed(() => cartUnit(props.item));
const units = computed(() => getProductUnits(props.item));

function changeUnit(event) {
    const next = event.target.value;
    const pieces = cartPieceQuantity(props.item);
    const nextSize = piecesPerUnit(props.item, next);
    // Preserve the piece total when an existing quantity is an exact larger pack.
    const nextQuantity = nextSize > piecesPerUnit(props.item) && pieces % nextSize === 0
        ? pieces / nextSize
        : props.item.quantity;
    const result = cartStore.updateLine(props.item, nextQuantity, next);
    if (result.capped) push.warning(t("cart.maximumStock"));
    event.target.value = type.value;
}
</script>

<style scoped>
.cart-unit-select,
.cart-unit-label {
    font-size: .8125rem;
    color: #183c2a;
}

.cart-unit-select {
    width: 100%;
    min-width: 0;
    min-height: 36px;
    padding: 4px 6px;
    border: 1px solid #c5d9cb;
    border-radius: 8px;
    background: #fff;
}

.cart-unit-select:focus-visible {
    outline: 2px solid #218158;
    outline-offset: 2px;
}

@media (max-width: 767px) {
    .cart-unit-select {
        min-height: 44px;
    }

    .cart-unit-label {
        display: flex;
        min-height: 44px;
        align-items: center;
    }
}
</style>
