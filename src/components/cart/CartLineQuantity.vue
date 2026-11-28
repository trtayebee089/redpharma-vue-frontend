<template>
    <div class="cart-line-quantity">
        <select v-if="units.length > 1" :value="type" class="cart-unit-select"
            :aria-label="t('cart.selectUnitFor', { name: item.name })" @change="changeUnit">
            <option v-for="unit in units" :key="unit.type" :value="unit.type"
                :disabled="unit.type !== type && cartStore.maxLineQuantity(item, unit.type) === 0">
                {{ unit.type === 'piece' ? t('cart.units.piece') :
                    t('cart.packOption', { unit: t(`cart.units.${unit.type}`), count: n(unit.pieces) }) }}
            </option>
        </select>

        <div class="cart-quantity">
            <button type="button" @click="setQuantity(quantity - 1)" :disabled="quantity <= 1"
                :aria-label="t('cart.decreaseQuantity')">
                <i class="pi pi-minus" aria-hidden="true"></i>
            </button>
            <input type="number" :value="quantity" @change="changeQuantity"
                :aria-label="t('cart.table.thead.qty')" min="1" :max="max ?? undefined" />
            <button type="button" @click="setQuantity(quantity + 1)"
                :aria-label="t('cart.increaseQuantity')"
                :disabled="max != null && quantity >= max"
                :title="max != null && quantity >= max ? t('cart.maximumStock') : ''">
                <i class="pi pi-plus" aria-hidden="true"></i>
            </button>
        </div>
        <p v-if="type !== 'piece'" class="cart-stock">{{ t('cart.pieceTotal', { count: n(cartPieceQuantity(item)) }) }}</p>
        <p v-else-if="max != null" class="cart-stock">{{ t('cart.available', { count: n(max) }) }}</p>
    </div>
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
const quantity = computed(() => Number(props.item.quantity));
const units = computed(() => getProductUnits(props.item));
const max = computed(() => cartStore.maxLineQuantity(props.item));

function setQuantity(value, unit = type.value) {
    const result = cartStore.updateLine(props.item, value, unit);
    if (result.capped) push.warning(t("cart.maximumStock"));
    return result.actual_qty;
}

function changeQuantity(event) {
    event.target.value = setQuantity(event.target.value);
}

function changeUnit(event) {
    const next = event.target.value;
    const pieces = cartPieceQuantity(props.item);
    const nextSize = piecesPerUnit(props.item, next);
    // A saved quantity that makes an exact larger pack can be relabeled without changing its total.
    const nextQuantity = nextSize > piecesPerUnit(props.item) && pieces % nextSize === 0
        ? pieces / nextSize
        : quantity.value;
    setQuantity(nextQuantity, next);
    event.target.value = type.value;
}
</script>

<style scoped>
.cart-line-quantity {
    display: grid;
    justify-items: start;
    gap: 5px;
}

.cart-unit-select {
    width: 100%;
    max-width: 12rem;
    min-width: 0;
    min-height: 36px;
    padding: 4px 6px;
    border: 1px solid #c5d9cb;
    border-radius: 8px;
    background: #fff;
    color: #183c2a;
    font-size: .8125rem;
}

.cart-quantity {
    display: inline-grid;
    grid-template-columns: 33px 44px 33px;
    overflow: hidden;
    border: 1px solid #c5d9cb;
    border-radius: 8px;
    background: #fff;
    color: #183c2a;
}

.cart-quantity button {
    display: grid;
    height: 34px;
    place-items: center;
    background: #eaf5ed;
    color: #28563d;
    font-size: .75rem;
    cursor: pointer;
}

.cart-quantity button:hover:enabled {
    background: #d7eddf;
}

.cart-quantity button:disabled {
    background: #f3f6f4;
    color: #61786a;
    cursor: default;
}

.cart-quantity input {
    width: 100%;
    min-width: 0;
    border-inline: 1px solid #d9e7dd;
    border-radius: 0;
    appearance: textfield;
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
}

.cart-quantity input::-webkit-inner-spin-button,
.cart-quantity input::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}

.cart-line-quantity :is(button, input, select):focus-visible {
    outline: 2px solid #218158;
    outline-offset: -2px;
}

.cart-stock {
    color: #4e6658;
    font-size: .75rem;
}

@media (min-width: 768px) {
    .cart-line-quantity {
        justify-items: center;
    }

    .cart-unit-select {
        width: max-content;
    }
}

@media (max-width: 767px) {
    .cart-quantity {
        grid-template-columns: 44px 38px 44px;
    }

    .cart-quantity button,
    .cart-unit-select {
        min-height: 44px;
    }
}
</style>
