import { defineStore } from 'pinia'
import { useAuthStore } from "@/stores/auth";
import {
  aggregateCartLines, cartLineKey, cartPiecePrice, cartPieceQuantity, cartStock,
  cartUnit, getProductUnits, piecesPerUnit,
} from "@/utils/cartUnits";

const sameProduct = (a, b) => String(a.id) === String(b.id);
const wholeQuantity = qty => Number.isFinite(Number(qty)) ? Math.max(1, Math.floor(Number(qty))) : 1;

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    isCartOpen: false,
    shippingRate: 0,
    applyDiscount: true,
    baseDiscountRate: 5,
  }),
  actions: {
    setShippingRate(rate) {
      this.shippingRate = Number(rate) || 0;
    },

    getQuantity(productId) {
      const item = this.items.find(i => sameProduct(i, { id: productId }) && cartUnit(i) === "piece");
      return Number(item?.quantity) || 0;
    },

    getProductPieceQuantity(productId) {
      return this.orderItems.find(item => sameProduct(item, { id: productId }))?.quantity ?? 0;
    },

    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.items))
    },

    /**
     * Add a product to cart, respecting its stock_qty.
     * Returns { capped: boolean, stock_qty: number|null } so the
     * caller (component) can show a toast when stock is the limit.
     */
    addToCart(product, type = "piece") {
      const productLines = this.items.filter(item => sameProduct(item, product));
      const [firstLine] = productLines;
      const stockQty = cartStock(product) ?? (firstLine ? cartStock(firstLine) : null);
      // Keep the price consistent across the units of the same product.
      const details = {
        ...product,
        price: firstLine?.price ?? product.price,
        offerPrice: firstLine ? firstLine.offerPrice : product.offerPrice,
        piece_qty: product.piece_qty ?? firstLine?.piece_qty,
        stripe_qty: product.stripe_qty ?? firstLine?.stripe_qty,
        stock_qty: stockQty,
      };
      const unit = getProductUnits(details).find(entry => entry.type === type);
      const requested = wholeQuantity(product.quantity);
      const usedStock = productLines.reduce((sum, item) => sum + cartPieceQuantity(item), 0);
      const available = stockQty === null ? requested : Math.max(0, Math.floor((stockQty - usedStock) / (unit?.pieces ?? 1)));
      const addedQuantity = unit ? Math.min(requested, available) : 0;

      if (addedQuantity > 0) {
        for (const item of productLines) {
          item.stock_qty = stockQty;
          item.piece_qty ??= details.piece_qty;
          item.stripe_qty ??= details.stripe_qty;
        }
        const existing = productLines.find(item => cartUnit(item) === type);
        if (existing) {
          existing.quantity = Number(existing.quantity) + addedQuantity;
        } else {
          this.items.push({ ...details, cartUnit: type, quantity: addedQuantity });
        }
        this.saveCart();
      }
      return { capped: addedQuantity < requested, stock_qty: stockQty, addedQuantity };
    },

    maxLineQuantity(item, type = cartUnit(item)) {
      const stockQty = cartStock(item);
      if (stockQty === null) return null;
      const key = cartLineKey(item);
      const usedByOtherLines = this.items.reduce((sum, line) =>
        sameProduct(line, item) && cartLineKey(line) !== key ? sum + cartPieceQuantity(line) : sum, 0);
      return Math.max(0, Math.floor((stockQty - usedByOtherLines) / piecesPerUnit(item, type)));
    },

    updateLine(item, qty, type = cartUnit(item)) {
      const max = this.maxLineQuantity(item, type);
      if (max === 0 || !getProductUnits(item).some(unit => unit.type === type)) {
        return { capped: true, actual_qty: Number(item.quantity) };
      }
      const requested = wholeQuantity(qty);
      const quantity = max == null ? requested : Math.min(requested, max);
      const target = this.items.find(line => line !== item && sameProduct(line, item) && cartUnit(line) === type);
      if (target) {
        target.quantity = Number(target.quantity) + quantity;
        this.removeLine(item);
      } else {
        item.cartUnit = type;
        item.quantity = quantity;
        this.saveCart();
      }
      return { capped: quantity < requested, actual_qty: quantity };
    },

    removeLine(item) {
      this.items = this.items.filter(line => cartLineKey(line) !== cartLineKey(item));
      this.saveCart();
    },

    removeFromCart(id) {
      const item = this.items.find(line => sameProduct(line, { id }) && cartUnit(line) === "piece");
      if (item) this.removeLine(item);
    },

    /**
     * Update quantity, capped at stock_qty if known.
     * Returns { capped: boolean, actual_qty: number }.
     */
    updateQuantity(id, qty) {
      const item = this.items.find(line => sameProduct(line, { id }) && cartUnit(line) === "piece");
      return item ? this.updateLine(item, qty) : { capped: false, actual_qty: qty };
    },

    applyStockLimit(id, availableStock) {
      const stock = Math.max(0, Math.floor(Number(availableStock) || 0));
      let remaining = stock;
      this.items = this.items.filter(item => {
        if (!sameProduct(item, { id })) return true;
        const pieces = piecesPerUnit(item);
        item.stock_qty = stock;
        item.quantity = Math.min(Number(item.quantity), Math.floor(remaining / pieces));
        remaining -= item.quantity * pieces;
        return item.quantity > 0;
      });
      this.saveCart();
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },

    toggleCart(open) {
      this.isCartOpen = open ?? !this.isCartOpen
    }
  },
  getters: {
    orderItems: state => aggregateCartLines(state.items),
    totalQty() {
      return this.orderItems.reduce((sum, item) => sum + item.quantity, 0);
    },
    uniqueItems() {
      return this.orderItems.length;
    },
    cartSubtotal: (state) => {
      const subtotal = state.items.reduce((sum, item) => {
        return sum + cartPiecePrice(item) * cartPieceQuantity(item);
      }, 0);
      return Number(subtotal.toFixed(2)) || 0;
    },
    discountRate(state) {
      const authStore = useAuthStore();
      const meetsCriteria = authStore.isAuthenticated &&
        authStore.membershipInfo &&
        authStore.rewardPointSettings?.minimum_amount <= this.cartSubtotal &&
        authStore.membershipInfo?.discount > 0;

      if (!meetsCriteria) return state.baseDiscountRate;

      return Number(authStore.membershipInfo?.discount) || state.baseDiscountRate;
    },
    membershipDiscount(state) {
      if (!state.applyDiscount) return 0;

      const discount = (this.cartSubtotal * this.discountRate) / 100;
      return Number(discount.toFixed(2)) || 0;
    },
    totalAmount(state) {
      const grandTotal = this.cartSubtotal - this.membershipDiscount + state.shippingRate;
      return Number(Math.ceil(grandTotal)) || 0;
    },
  }
})
