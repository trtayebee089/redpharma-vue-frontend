import { defineStore } from 'pinia'
import { useAuthStore } from "@/stores/auth";

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
      const item = this.items.find(i => i.id === productId);
      return item ? item.quantity : 0;
    },

    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.items))
    },

    /**
     * Add a product to cart, respecting its stock_qty.
     * Returns { capped: boolean, stock_qty: number|null } so the
     * caller (component) can show a toast when stock is the limit.
     */
    addToCart(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        const stockQty = existing.stock_qty ?? product.stock_qty ?? null;
        const newQty = existing.quantity + (product.quantity || 1);
        existing.quantity = stockQty !== null ? Math.min(newQty, stockQty) : newQty;
        this.saveCart()
        return { capped: stockQty !== null && newQty > stockQty, stock_qty: stockQty };
      } else {
        const stockQty = product.stock_qty ?? null;
        const qty = stockQty !== null ? Math.min(product.quantity || 1, stockQty) : (product.quantity || 1);
        this.items.push({ ...product, quantity: qty })
        this.saveCart()
        return { capped: stockQty !== null && (product.quantity || 1) > stockQty, stock_qty: stockQty };
      }
    },

    removeFromCart(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveCart()
    },

    /**
     * Update quantity, capped at stock_qty if known.
     * Returns { capped: boolean, actual_qty: number }.
     */
    updateQuantity(id, qty) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        const stockQty = item.stock_qty ?? null;
        const safeQty = stockQty !== null ? Math.min(Math.max(1, qty), stockQty) : Math.max(1, qty);
        item.quantity = safeQty;
        this.saveCart()
        return { capped: stockQty !== null && qty > stockQty, actual_qty: safeQty };
      }
      return { capped: false, actual_qty: qty };
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
    totalQty: state => state.items.reduce((acc, i) => acc + i.quantity, 0),
    uniqueItems: state => state.items.length,
    cartSubtotal: (state) => {
      const subtotal = state.items.reduce((sum, item) => {
        const price = Number(item.offerPrice ?? item.price) || 0;
        const qty = Number(item.quantity) || 1;
        return sum + price * qty;
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