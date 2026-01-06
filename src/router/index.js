import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Cart from '../pages/Cart.vue'
import RequestOrder from '../pages/RequestOrder.vue'
import Contact from '../pages/Contact.vue'
import Category from '../pages/shop/Category.vue'
import PrivacyPolicy from '../pages/PrivacyPolicy.vue'
import RefundReturn from '../pages/RefundReturn.vue'
import DeliveryCoverage from '../pages/DeliveryCoverage.vue'
import OrderTracking from '../pages/OrderTracking.vue'
import Profile from '../pages/account/Profile.vue'
import Orders from '../pages/account/Orders.vue'
import Membership from '../pages/account/Membership.vue'
import HelpCenter from '../pages/HelpCenter.vue'
import Settings from '../pages/account/Settings.vue'
import OrderDetail from '../pages/account/OrderDetail.vue'
import ProductDetail from '../pages/shop/ProductDetail.vue';
import CategoryGrid from '../pages/shop/CategoryGrid.vue';
import OrderConfirmation from '@/pages/shop/OrderConfirmation.vue';
import RemoveAccount from '../pages/RemoveAccount.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Home - RedPharma BD' } }, //✅
    { path: '/about', name: 'About', component: About, meta: { title: 'About Us - RedPharma BD' } }, //✅
    { path: '/request-order', name: 'Request Order', component: RequestOrder, meta: { title: 'Request Order - RedPharma BD' } }, //✅
    { path: '/cart', name: 'Cart', component: Cart, meta: { title: 'Cart - RedPharma BD' } }, 
    { path: '/contact', name: 'Contact Us', component: Contact, meta: { title: 'Contact Us - RedPharma BD' } }, //✅
    { path: '/categories', name: 'CategoryList', component: CategoryGrid, meta: { title: 'Categories - RedPharma BD' } }, 
    { path: '/category/:slug', name: 'Category', component: Category, meta: { title: 'Category - RedPharma BD' } }, 
    { path: '/privacy-and-policy', name: 'Privacy & Policy', component: PrivacyPolicy, meta: { title: 'Privacy & Policy - RedPharma BD' } }, //✅
    { path: '/refund-and-returns', name: 'RefundReturn', component: RefundReturn, meta: { title: 'Refund & Returns - RedPharma BD' } }, //✅
    { path: '/delivery-coverage', name: 'Delivery Coverage', component: DeliveryCoverage, meta: { title: 'Delivery Coverage - RedPharma BD' } }, //✅
    { path: '/order-tracking', name: 'Order Tracking', component: OrderTracking, meta: { title: 'Track Order - RedPharma BD' } }, //✅
    { path: '/upload-prescription', name: 'Upload Prescription', component: OrderTracking, meta: { title: 'Upload Prescription - RedPharma BD' } }, //✅
    { path: '/blog', name: 'Health Articles', component: OrderTracking, meta: { title: 'Health Articles - RedPharma BD' } }, //✅
    { path: '/blog/:slug', name: 'Health Articles', component: OrderTracking, meta: { title: 'Health Articles - RedPharma BD' } }, //✅
    { path: '/products/:slug', name: 'ProductDetails', component: ProductDetail, meta: { title: 'Product Details - RedPharma BD' } }, //✅
    { path: '/account-removal-request', name: 'RemoveAccount', component: RemoveAccount, meta: { title: 'Delete Account - RedPharma BD' } }, //✅
    { path: "/order-confirmation/:order_id", name: "OrderConfirmation", component: () => OrderConfirmation, props: true }, //✅

    { path: '/profile', name: 'Profile', component: Profile, meta: { title: 'Edit Profile - RedPharma BD', requiresAuth: true } }, 
    { path: '/orders', name: 'Orders', component: Orders, meta: { title: 'My Orders - RedPharma BD', requiresAuth: true } },
    { path: '/orders/:orderId', name: 'order-detail', component: OrderDetail, meta: { title: 'Order Detail - RedPharma BD', requiresAuth: true } },
    { path: '/membership', name: 'Membership', component: Membership, meta: { title: 'Membership - RedPharma BD', requiresAuth: true } },
    { path: '/settings', name: 'Settings', component: Settings, meta: { title: 'Settings - RedPharma BD', requiresAuth: true } }, //✅
    { path: '/help-center', name: 'HelpCenter', component: HelpCenter, meta: { title: 'Help Center (FAQ) - RedPharma BD' } },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { title: '404 - Page Not Found' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } 
        
        return { top: 0, left: 0, behavior: 'smooth' };
    },
});

// Global guard for auth
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.title) {
        document.title = to.meta.title;
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ path: '/' });
    } else {
        next();
    }
});

export default router;