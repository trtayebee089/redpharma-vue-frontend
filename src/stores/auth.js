// // stores/auth.js
// import { defineStore } from "pinia";
// import axios from "axios";

// export const useAuthStore = defineStore("auth", {
//     state: () => ({
//         user: JSON.parse(localStorage.getItem("user")) || null,
//         token: localStorage.getItem("token") || null,
//         loading: false,  // <-- global login loading
//         error: null,
//     }),

//     getters: {
//         isAuthenticated: (state) => !!state.token,
//     },

//     actions: {
//         async login({ mobile, password }) {
//             this.loading = true;
//             this.error = null;

//             try {
//                 const { data } = await axios.post("/api/login", {
//                     mobile,
//                     password,
//                 });

//                 // assuming API returns { user, token }
//                 this.user = data.user;
//                 this.token = data.token;

//                 localStorage.setItem("user", JSON.stringify(data.user));
//                 localStorage.setItem("token", data.token);

//                 axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
//             } catch (err) {
//                 this.error = err.response?.data?.message || "Login failed";
//                 throw err;
//             } finally {
//                 this.loading = false;  // <-- release loading
//             }
//         },

//         async fetchUser() {
//             if (!this.token) return;

//             try {
//                 const { data } = await axios.get("/api/me", {
//                 headers: { Authorization: `Bearer ${this.token}` },
//                 });

//                 this.user = data;
//                 localStorage.setItem("user", JSON.stringify(data));
//             } catch (err) {
//                 this.logout();
//             }
//         },

//         logout() {
//             this.user = null;
//             this.token = null;
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//             delete axios.defaults.headers.common["Authorization"];
//         },
//     },
// });

// // Initialize axios with token if available WITH FAKE API
// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login({ mobile, password }) {
            this.loading = true;
            this.error = null;

            try {
                // --- Fake Authentication ---
                if (mobile === "01765649100" && password === "password") {
                    const fakeUser = {
                        id: 1,
                        name: "Test User",
                        mobile: "01765649100",
                        avatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                    };
                    const fakeToken = "fake-jwt-token-123";

                    this.user = fakeUser;
                    this.token = fakeToken;

                    localStorage.setItem("user", JSON.stringify(fakeUser));
                    localStorage.setItem("token", fakeToken);

                    // Set fake header for axios if needed later
                    // axios.defaults.headers.common["Authorization"] = `Bearer ${fakeToken}`;
                } else {
                    throw new Error("Invalid mobile or password");
                }
            } catch (err) {
                this.error = err.message || "Login failed";
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchUser() {
            if (!this.token) return;

            try {
                // Fake fetching user
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) {
                    this.user = user;
                } else {
                    this.logout();
                }
            } catch (err) {
                this.logout();
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            // delete axios.defaults.headers.common["Authorization"];
        },
    },
});
