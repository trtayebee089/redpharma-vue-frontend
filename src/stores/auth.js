// stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";
import api from "@/api/config"
export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
        orders: []
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        ordersByStatus: (state) => (status) => {
            if (status === "all") return state.orders;
            return state.orders.filter(o => o.status.toLowerCase() === status.toLowerCase());
        },
    },

    actions: {
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
                this.logout();
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

                // Optionally, you can show a success message
                return data; // contains server response, e.g., success message
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

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
        },
    },
});
