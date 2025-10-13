import { ref } from "vue";
import axios from "axios";
import api from "@/api/config";

export function useServices() {
    const brandLogo = ref(null);
    const about = ref(null);
    const testimonials = ref([]);
    const privacyPolicy = ref(null);
    const contact = ref({});
    const deliveryAreas = ref([]);
    const returnRefunds = ref(null);
    const rewardPointTiers = ref([]);

    const loading = ref(false);
    const error = ref(null);

    // 🔹 Generic fetcher
    const fetchData = async (endpoint, targetRef) => {
        try {
            loading.value = true;
            error.value = null;
            const { data } = await axios.get(`/api/${endpoint}`);
            targetRef.value = data;
        } catch (err) {
            error.value = err.response?.data?.message || err.message;
        } finally {
            loading.value = false;
        }
    };

    // 🔹 Specific functions
    const getBrandLogo = () => fetchData("brand/logo", brandLogo);
    const getAbout = () => fetchData("about", about);
    const getTestimonials = () => fetchData("testimonials", testimonials);
    const getPrivacyPolicy = () => fetchData("policies/privacy", privacyPolicy);
    const getContact = () => fetchData("contact", contact);
    const getDeliveryAreas = () => fetchData("delivery-areas", deliveryAreas);
    const getReturnRefunds = () => fetchData("returns", returnRefunds);

    const getRewardPointTiers = async () => {
        try {
            const response = await api.get("/reward-point-tiers");
            
            if (response.status === 200) {
                rewardPointTiers.value = response.data.data;
            } else {
                rewardPointTiers.value = [];
            }
        } catch (error) {
            console.error("Failed to load reward tiers:", error);
            rewardPointTiers.value = [];
        }
    };

    return {
        brandLogo,
        about,
        testimonials,
        privacyPolicy,
        contact,
        deliveryAreas,
        returnRefunds,
        loading,
        error,
        getBrandLogo,
        getAbout,
        getTestimonials,
        getPrivacyPolicy,
        getContact,
        getDeliveryAreas,
        getReturnRefunds,
        rewardPointTiers,
        getRewardPointTiers,
    };
}
