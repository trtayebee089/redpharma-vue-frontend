<template>
    <div class="max-w-4xl mx-auto p-6 font-sans text-gray-800 space-y-6 pt-0">
        <!-- Page Header -->
        <div class="fade-up">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p class="text-gray-600">Manage your account preferences and security settings.</p>
        </div>

        <!-- Language Change -->
        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">Language</h2>
            <select v-model="langStore.lang" @change="langStore.setLanguage(langStore.lang)"
                class="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500">
                <option value="en">English</option>
                <option value="bn">Bangla</option>
            </select>
        </div>

        <!-- Password Change -->
        <div class="bg-white shadow rounded-lg p-6 space-y-3 fade-up">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">Change Password</h2>
            <div class="flex flex-col md:flex-row gap-3">
                <input v-model="currentPassword" type="password" placeholder="Current Password"
                    class="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500" />
                <input v-model="newPassword" type="password" placeholder="New Password"
                    class="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500" />
                <button @click="changePassword"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition">
                    Change
                </button>
            </div>
            <p v-if="passwordMsg" :class="{ 'text-green-600': passwordSuccess, 'text-red-500': !passwordSuccess }">
                {{ passwordMsg }}</p>
        </div>

        <!-- Mobile Number Change -->
        <div class="bg-white shadow rounded-lg p-6 space-y-3 fade-up">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">Mobile Number</h2>
            <div class="flex flex-col md:flex-row gap-3">
                <input v-model="mobile" type="text" placeholder="Enter new mobile number"
                    class="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500" />
                <button @click="changeMobile"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition">
                    Update
                </button>
            </div>
            <p v-if="mobileMsg" :class="{ 'text-green-600': mobileSuccess, 'text-red-500': !mobileSuccess }">
                {{ mobileMsg }}</p>
        </div>

        <!-- Policy Links -->
        <div class="bg-white shadow rounded-lg p-6 space-y-2 fade-up">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">Policies</h2>
            <router-link to="/privacy-and-policy" class="block text-green-600 hover:underline">Privacy
                Policy</router-link>
            <router-link to="/terms-and-conditions" class="block text-green-600 hover:underline">Terms &
                Conditions</router-link>
        </div>

        <!-- Logout -->
        <div class="bg-white shadow rounded-lg p-6 fade-up">
            <button @click="logout"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition w-full">
                Logout
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useAuthStore } from "@/stores/auth";
    import { useLanguageStore } from "@/stores/language";
    import { useRouter } from 'vue-router'

    const authStore = useAuthStore();
    const langStore = useLanguageStore();

    // Password change
    const currentPassword = ref("");
    const newPassword = ref("");
    const passwordMsg = ref("");
    const passwordSuccess = ref(false);
    const changePassword = () => {
        if (currentPassword.value && newPassword.value) {
            passwordMsg.value = "Password changed successfully!";
            passwordSuccess.value = true;
            currentPassword.value = "";
            newPassword.value = "";
        } else {
            passwordMsg.value = "Please enter both current and new passwords.";
            passwordSuccess.value = false;
        }
    };

    // Mobile change
    const mobile = ref(authStore.user?.mobile || "");
    const mobileMsg = ref("");
    const mobileSuccess = ref(false);
    const changeMobile = () => {
        if (mobile.value) {
            // fake update
            mobileMsg.value = "Mobile number updated successfully!";
            mobileSuccess.value = true;
            authStore.user.mobile = mobile.value;
        } else {
            mobileMsg.value = "Please enter a valid mobile number.";
            mobileSuccess.value = false;
        }
    };

    // Logout
    const logout = () => {
        authStore.logout();
        router.push('/');
    };
</script>

<style scoped>
    a:hover {
        color: #059669;
    }
</style>
