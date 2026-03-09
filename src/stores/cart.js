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

    addToCart(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += product.quantity
      } else {
        this.items.push({ ...product })
      }
      this.saveCart()
    },

    removeFromCart(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveCart()
    },

    updateQuantity(id, qty) {
      const item = this.items.find(item => item.id === id)
      if (item) item.quantity = qty
      this.saveCart()
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
    discountRate: (state) => {
      const authStore = useAuthStore();
      
      const userDiscount = authStore.membershipInfo?.discount;
      return Number(userDiscount || state.baseDiscountRate) || 0;
    },
    membershipDiscount: (state) => {
      if (!state.applyDiscount) return 0;
      
      const discount = (state.cartSubtotal * state.discountRate) / 100;
      return Number(discount.toFixed(2)) || 0;
    },
    totalAmount: (state) => {
      const grandTotal = state.cartSubtotal - state.membershipDiscount + state.shippingRate;
      return Number(Math.ceil(grandTotal)) || 0;
    },
  }
})