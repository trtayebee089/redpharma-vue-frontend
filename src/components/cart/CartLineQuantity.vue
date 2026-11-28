<template>
    <div class="cart-line-quantity">
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
        <p v-if="type !== 'piece'" class="cart-piece-total">
            {{ t('cart.pieceTotal', { count: n(cartPieceQuantity(item)) }) }}
        </p>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { usePush } from "notivue";
import { useCartStore } from "@/stores/cart";
import { cartPieceQuantity, cartUnit } from "@/utils/cartUnits";

const props = defineProps({ item: { type: Object, required: true } });
const { t, n } = useI18n();
const cartStore = useCartStore();
const push = usePush();
const type = computed(() => cartUnit(props.item));
const quantity = computed(() => Number(props.item.quantity));
const max = computed(() => cartStore.maxLineQuantity(props.item));

function setQuantity(value) {
    const result = cartStore.updateLine(props.item, value);
    if (result.capped) push.warning(t("cart.maximumStock"));
    return result.actual_qty;
}

function changeQuantity(event) {
    event.target.value = setQuantity(event.target.value);
}

</script>

<style scoped>
.cart-line-quantity {
    display: grid;
    justify-items: start;
    gap: 5px;
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

.cart-line-quantity :is(button, input):focus-visible {
    outline: 2px solid #218158;
    outline-offset: -2px;
}

.cart-piece-total {
    color: #4e6658;
    font-size: .75rem;
}

@media (min-width: 768px) {
    .cart-line-quantity {
        justify-items: center;
    }

}

@media (max-width: 767px) {
    .cart-quantity {
        grid-template-columns: 44px 38px 44px;
    }

    .cart-quantity button {
        min-height: 44px;
    }
}
</style>
