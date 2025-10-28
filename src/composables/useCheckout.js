import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';
import api from "@/api/config";
import axios from 'axios';

export function useCheckout() {
    const cartStore = useCartStore();
    const loading = ref(false);
    const error = ref(null);
    const successMessage = ref(null);
    const order = ref({});   
    const tracking = ref({});
    const shippingZones = ref([]);

    const getOrderDetails = async (order_id) => {
        if (!order_id) return;

        try {
            const response = await api.get(`/orders/${order_id}`);
            
            if (response.data.success) {
                order.value = response.data.order;
                tracking.value = response.data.tracking || { histories: [] };
            } else {
                console.error("Failed to fetch order details:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const getShippingZones = async () => {
        try {
            const response = await api.get(`/shipping-zones`);
            if (response.data.success) {
                shippingZones.value = response.data.data;
            }
        } catch (err) {
            console.error("Error fetching zones:", err);
        }
    };

    const getShippingRate = (division, district) => {
        if (!division) return 0;

        const zones = shippingZones.value.filter(z => z.division === division);
        if (!zones.length) return null; // no service in this division

        if (!district) {
            const defaultZone = zones.find(z => !z.district || z.district === '');
            return defaultZone ? Number(defaultZone.rate) : 0;
        }

        const districtZone = zones.find(z => z.district === district);
        return districtZone ? Number(districtZone.rate) : null; // null if district not serviced
    };

    const submitOrder = async (checkoutForm) => {
        if (!cartStore.items.length) {
            error.value = 'Your cart is empty';
            return;
        }

        loading.value = true;
        error.value = null;
        successMessage.value = null;

        try {
            const authStore = useAuthStore();
            const membershipDiscountRate = authStore.membershipInfo?.discount || 0;
            const discountAmount = (cartStore.cartSubtotal * membershipDiscountRate) / 100;

            const payload = {
                user_id: 1,
                warehouse_id: checkoutForm.warehouseId,
                sale_status: 0,
                payment_status: 0,
                paid_amount: 0,
                customer: {
                    name: checkoutForm.fullName,
                    phone: checkoutForm.phone,
                    address: checkoutForm.address
                },
                sale_type: 'website',
                subtotal: cartStore.cartSubtotal,
                shipping_cost: cartStore.shippingRate,
                total: cartStore.totalAmount,
                order_discount_type: membershipDiscountRate > 0 ? 'percentage' : null,
                order_discount_value: membershipDiscountRate || 0,
                discount_value: discountAmount || 0,
                discount_applied: cartStore.applyDiscount,
                items: cartStore.items.map(item => ({
                    product_id: item.id,
                    qty: item.quantity,
                    net_unit_price: item.offerPrice ?? item.price,
                    discount: item.discount ?? 0,
                    tax_rate: item.taxRate ?? 0,
                    tax: ((item.taxRate ?? 0) / 100) * (item.offerPrice ?? item.price) * item.quantity,
                    total: (item.offerPrice ?? item.price) * item.quantity
                })),
                uniqueItems: cartStore.uniqueItems,
                total_qty: cartStore.totalQty
            };

            const response = await axios.post('http://localhost:8000/api/checkout', payload);

            successMessage.value = 'Order placed successfully!';
            cartStore.clearCart();

            return response.data;
        } catch (err) {
            console.error(err);
            error.value = err.response?.data?.message || 'Failed to place order';
        } finally {
            loading.value = false;
        }
    };

    const getTrackingDetails = async (tracking_code) => {
        if (!tracking_code) return;

        try {
            const response = await api.get(`/tracking/${tracking_code}`);
            
            if (response.data.success) {
                order.value = response.data.order;
                tracking.value = response.data.tracking || { histories: [] };
            } else {
                console.error("Failed to fetch tracking details:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching tracking details:", error);
        }
    }

    return {
        loading,
        error,
        successMessage,
        submitOrder,
        getOrderDetails,
        getTrackingDetails,
        order,
        tracking,
        shippingZones,
        getShippingZones,
        getShippingRate
    };
}
