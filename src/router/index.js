import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Cart from '../pages/Cart.vue'
import RequestOrder from '../pages/RequestOrder.vue'
import Contact from '../pages/Contact.vue'
import Category from '../pages/Category.vue'
import PrivacyPolicy from '../pages/PrivacyPolicy.vue'
import DeliveryCoverage from '../pages/DeliveryCoverage.vue'
import OrderTracking from '../pages/OrderTracking.vue'

const routes = [
{ path: '/', name: 'Home', component: Home, meta: { title: 'Home - RedPharma BD' } },
{ path: '/about', name: 'About', component: About, meta: { title: 'About Us - RedPharma BD' } },
{ path: '/request-order', name: 'Request Order', component: RequestOrder, meta: { title: 'Request Order - RedPharma BD' } },
{ path: '/cart', name: 'Cart', component: Cart, meta: { title: 'Cart - RedPharma BD' } },
{ path: '/contact', name: 'Contact Us', component: Contact, meta: { title: 'Contact Us - RedPharma BD' } },
{ path: '/category/:slug', name: 'Category', component: Category, meta: { title: 'Category - RedPharma BD' } },
{ path: '/privacy-and-policy', name: 'Privacy & Policy', component: PrivacyPolicy, meta: { title: 'Privacy & Policy - RedPharma BD' } },
{ path: '/delivery-coverage', name: 'Delivery Coverage', component: DeliveryCoverage, meta: { title: 'Delivery Coverage - RedPharma BD' } },
{ path: '/order-tracking', name: 'Order Tracking', component: OrderTracking, meta: { title: 'Track Order - RedPharma BD' } },
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
