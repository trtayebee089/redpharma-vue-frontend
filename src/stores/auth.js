// stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";
import api from "@/api/config"
import { computed } from "vue";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
        orders: [],
        order: null,
        points: 0,
        membership: null,
        rewardPointTiers: [],
        rewardPointSettings: [],
        rewardPointUsages: [],
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        ordersByStatus: (state) => (status) => {
            if (status === "all") return state.orders;
            return state.orders.filter(o => o.status.toLowerCase() === status.toLowerCase());
        },
        membershipInfo: (state) => {
            if (!state.user || !state.user.points || !state.rewardPointTiers.length) return null;

            const points = state.user.points;
            const tiers = state.rewardPointTiers;

            let current = tiers.find(t => points >= t.min_points && points <= t.max_points);

            if (!current) {
                current = {
                    name: "No Tier Yet",
                    min_points: 0,
                    max_points: tiers[0]?.min_points || 100,
                    discount_rate: 0,
                    colorClass: "bg-gray-200 text-gray-800",
                    bgColor: "#C2A68C",
                };
            }

            const next = tiers.find(t => points < t.min_points) || current;

            const currMin = current.min_points || 0;
            const currMax = current.max_points || currMin + 1;

            let progress = 0;
            if (points < currMin) progress = (points / currMax) * 100;
            else if (points >= currMax) progress = 100;
            else progress = ((points - currMin) / (currMax - currMin)) * 100;

            return {
                points,
                currentTier: current,
                nextTier: next,
                progress: Math.min(progress, 100),
                discount: current.discount_rate || 0,
            };
        }
    },

    actions: {
        async fetchRewardPointTiers() {
            try {
                const response = await api.get("/reward-point-tiers");

                if (response.status === 200) {
                    this.rewardPointTiers = response.data.tiers || [];
                    this.rewardPointSettings = response.data.settings || {};
                    this.rewardPointUsages = response.data.usages || [];
                } else {
                    this.rewardPointTiers = [];
                }
            } catch (error) {
                console.error("Failed to load reward tiers:", error);
                this.rewardPointTiers = [];
            }
        },

        setRewardPointTiers(tiers) {
            this.rewardPointTiers = tiers || [];
        },

        async login({ phone_number, password }) {
            this.loading = true;
            this.error = null;

            try {
                const { data } = await api.post("/customer/login", { phone_number, password });

                if (!data.token || !data.user) {
                    throw new Error("Invalid response from server");
                }

                this.user = data.user;
                this.token = data.token;

                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            } catch (err) {
                this.error = err.response?.data?.message || "Login failed";
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async register({ name, phone_number, password, confirmPassword }) {
            this.loading = true;
            this.error = null;

            try {
                const { data } = await api.post("/customer/register", {
                    name,
                    phone_number,
                    password,
                    password_confirmation: confirmPassword
                });
                console.log(data)
                this.user = data.data.user;
                this.token = data.data.token;

                localStorage.setItem("user", JSON.stringify(data.data.user));
                localStorage.setItem("token", data.data.token);

                axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`;
            } catch (err) {
                this.error = err.response?.data?.message || "Registration failed";
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchUser() {
            if (!this.token) return;

            try {
                const { data } = await axios.get("/customer/profile", {
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                this.user = data;
                localStorage.setItem("user", JSON.stringify(data));
            } catch (err) {
                console.warn("Failed to refresh user after checkout:", err);
            }
        },

        async updateProfile(profileData) {
            this.loading = true;
            this.error = null;

            try {
                const formData = new FormData();
                formData.append("id", this.user.id);

                for (const key in profileData) {
                    if (profileData[key] !== undefined && profileData[key] !== null) {
                        if (key === "avatar") {
                            console.log(profileData[key] instanceof File)
                            if (profileData[key] instanceof File) {
                                formData.append("avatar", profileData[key]);
                            }
                        } else {
                            formData.append(key, profileData[key]);
                        }
                    }
                }

                console.log("Avatar value:", profileData.avatar, profileData.avatar instanceof File);

                const { data } = await api.post("/customer/profile/update", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                this.user = data.data;
                localStorage.setItem("user", JSON.stringify(this.user));
            } catch (err) {
                this.error = err.response?.data?.errors || "Profile update failed";
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchOrders() {
            this.loading = true;
            this.error = null;

            try {
                const token = localStorage.getItem("token");
                const { data } = await api.get("/customer/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (data.success) {
                    this.orders = data.data;
                    return this.orders;
                } else {
                    this.error = "Failed to fetch orders";
                    return [];
                }
            } catch (err) {
                this.error = err.response?.data?.message || "Failed to fetch orders";
                return [];
            } finally {
                this.loading = false;
            }
        },

        async fetchOrderDetail(orderId) {
            this.loading = true;
            this.error = null;

            try {
                const token = localStorage.getItem("token");

                // Use template literal to insert orderId
                const { data } = await api.get(`/customer/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (data.success) {
                    this.order = data.data;
                    return this.order;
                } else {
                    this.error = "Failed to fetch order details";
                    return null;
                }
            } catch (err) {
                this.error = err.response?.data?.message || "Failed to fetch order details";
                return null;
            } finally {
                this.loading = false;
            }
        },

        async updatePassword({ currentPassword, newPassword, confirmPassword }) {
            this.loading = true;
            this.error = null;

            try {
                const token = this.token || localStorage.getItem("token");

                const { data } = await api.post(
                    "/customer/profile/update-password",
                    {
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                return data;
            } catch (err) {
                this.error =
                    err.response?.data?.message ||
                    err.response?.data?.errors ||
                    "Failed to update password";
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async removeAccount({ issue = null, comment = null, phone_number = null } = {}) {
            try {
                const response = await api.post('/account-removal-request', {
                    phone_number: phone_number ?? this.user.phone_number,
                    issue: issue,
                    comment: comment,
                });
                return response.data;
            } catch (err) {
                console.error("Error removing account:", err);
                throw err;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
        },
    },
});
