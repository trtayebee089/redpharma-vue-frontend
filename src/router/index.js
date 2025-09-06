import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Shop from '../pages/Shop.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import RequestOrder from '../pages/RequestOrder.vue'
import Contact from '../pages/Contact.vue'
import Category from '../pages/Category.vue'

const routes = [
{ path: '/', name: 'Home', component: Home, meta: { title: 'Home - RedPharma BD' } },
{ path: '/about', name: 'About', component: About, meta: { title: 'About Us - RedPharma BD' } },
{ path: '/request-order', name: 'Request Order', component: RequestOrder, meta: { title: 'Request Order - RedPharma BD' } },
{ path: '/shop', name: 'Shop', component: Shop, meta: { title: 'Shop - RedPharma BD' } },
{ path: '/cart', name: 'Cart', component: Cart, meta: { title: 'Cart - RedPharma BD' } },
{ path: '/checkout', name: 'Checkout', component: Checkout, meta: { title: 'Checkout - RedPharma BD' } },
{ path: '/login', name: 'Checkout', component: Checkout, meta: { title: 'Login - RedPharma BD' } },
{ path: '/register', name: 'Checkout', component: Checkout, meta: { title: 'Registration - RedPharma BD' } },
{ path: '/contact', name: 'Contact Us', component: Contact, meta: { title: 'Contact Us - RedPharma BD' } },
{ path: '/category/:slug', name: 'Category', component: Category, meta: { title: 'Category - RedPharma BD' } },
]

const router = createRouter({
history: createWebHistory(),
routes,
})

// 🔹 Update document.title on route change
router.afterEach((to) => {
if (to.meta?.title) {
document.title = to.meta.title
} else {
document.title = 'RedPharma BD'
}
})

export default router
