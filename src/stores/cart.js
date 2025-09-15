import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    isCartOpen: false // <-- add this for offcanvas toggle
  }),
  actions: {
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
    totalQty: state => state.items.reduce((acc, i) => acc + i.quantity, 0)
  }
})
