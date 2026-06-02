<template>
    <div class="max-w-4xl mx-auto p-6 font-sans text-gray-800 space-y-6 relative leading-relaxed fade-up mb-16">
        <div
            class="max-w-5xl mx-auto text-center leading-relaxed bg-green-100 rounded-lg p-6 relative overflow-hidden mb-6">

            <div class="absolute inset-0 opacity-10 pointer-events-none">
                <svg class="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M20 0 L0 0 0 20" fill="none" stroke="#013302" stroke-width="1.0" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)"></rect>
                </svg>
            </div>

            <h1 class="text-3xl md:text-4xl font-bold text-green-600 leading-relaxed mb-2 relative z-10"
                :class="langStore.langClass">
                Settings
            </h1>

            <p class="text-gray-700 text-lg md:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto"
                :class="langStore.langClass">
                Manage your account preferences and security settings.
            </p>
        </div>

        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">Language</h2>
            <select v-model="langStore.lang" @change="langStore.setLanguage(langStore.lang)"
                class="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500">
                <option value="en">English</option>
                <option value="bn">Bangla</option>
            </select>
        </div>

        <div class="bg-white shadow rounded-lg p-6 space-y-3 fade-up">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">Change Password</h2>
            <div class="flex flex-col md:flex-row gap-3">
                <input v-model="currentPassword" type="password" placeholder="Current Password"
                    class="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500" />
                <input v-model="newPassword" type="password" placeholder="New Password"
                    class="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500" />
                <button @click="changePassword" :disabled="loading"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition">
                    <span v-if="loading">Updating...</span>
                    <span v-else>Change</span>
                </button>
            </div>
            <p v-if="passwordMsg" :class="{ 'text-green-600': passwordSuccess, 'text-red-500': !passwordSuccess }">
                {{ passwordMsg }}</p>
        </div>

        <div class="bg-white shadow rounded-lg p-6 space-y-2 fade-up">
            <h2 class="text-lg font-semibold text-gray-800 mb-3">Policies</h2>
            <router-link to="/privacy-and-policy" class="block text-green-600 hover:underline">Privacy
                Policy</router-link>
            <router-link to="/terms-and-conditions" class="block text-green-600 hover:underline">Terms &
                Conditions</router-link>
        </div>

        <div class="bg-white rounded-lg p-6 fade-up grid grid-cols-2 gap-5">
            <button @click="showModal = true" :disabled="loading"
                class="bg-orange-500 hover:bg-orange-800 text-white px-4 py-2 rounded font-semibold transition w-full disabled:opacity-50">
                <span v-if="loading">Processing...</span>
                <span v-else>Delete Account</span>
            </button>

            <button @click="logout"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition w-full">
                Logout
            </button>
        </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-red-50 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-bold mb-4">Confirm Account Deletion</h2>
            <div class="text-gray-700 mb-4 space-y-3 text-sm">
                <p>
                    Please review what will happen when your RedPharma account is deleted. This action is permanent and
                    cannot be reversed.
                </p>
                <p>
                    <strong>Orders & Prescriptions:</strong> Any active orders will be cancelled and your prescription
                    history will be queued for permanent deletion after 30 days.
                </p>
                <p>
                    <strong>Data:</strong> Your profile information and all associated data will be
                    queued for permanent deletion after 30 days.
                </p>
            </div>

            <!-- Issue selection -->
            <div class="mb-4">
                <p class="font-semibold mb-2">Reason for leaving:</p>
                <div class="flex flex-col gap-2">
                    <label v-for="option in issues" :key="option"
                        class="relative cursor-pointer flex items-center justify-between p-3 border rounded-lg transition-colors duration-200"
                        :class="selectedIssue === option ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'">
                        <span class="text-gray-800">{{ option }}</span>
                        <span
                            class="w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors duration-200"
                            :class="selectedIssue === option ? 'border-blue-500 bg-blue-500' : 'border-gray-400 bg-white'">
                            <span v-if="selectedIssue === option" class="block w-2 h-2 rounded-full bg-white"></span>
                        </span>
                        <input type="radio" :value="option" v-model="selectedIssue"
                            class="absolute opacity-0 w-0 h-0" />
                    </label>
                </div>
            </div>


            <!-- Comment field -->
            <div class="mb-4">
                <label class="block font-semibold mb-1">Additional Comments (optional):</label>
                <textarea v-model="comment" class="w-full border border-gray-300 rounded px-2 py-1" rows="3"
                    placeholder="Your comment..."></textarea>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-3">
                <button @click="showModal = false" :disabled="loading"
                    class="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100">
                    Cancel
                </button>
                <button @click="confirmDeletion" :disabled="loading || !selectedIssue"
                    class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
                    <span v-if="loading">Deleting...</span>
                    <span v-else>Confirm</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ref
} from "vue";
import {
    useAuthStore
} from "@/stores/auth";
import {
    useLanguageStore
} from "@/stores/language";
import {
    useRouter
} from "vue-router";

const authStore = useAuthStore();
const langStore = useLanguageStore();
const router = useRouter();
const currentPassword = ref("");
const newPassword = ref("");
const passwordMsg = ref("");
const passwordSuccess = ref(false);
const loading = ref(false);
const showModal = ref(false);

const issues = [
    'I no longer need the service',
    'Privacy concerns',
    'Found a better alternative',
    'Other'
];
const selectedIssue = ref('');
const comment = ref('');

const changePassword = async () => {
    if (!currentPassword.value || !newPassword.value) {
        passwordMsg.value = "Please enter both current and new passwords.";
        passwordSuccess.value = false;
        return;
    }

    loading.value = true;
    passwordMsg.value = "";
    passwordSuccess.value = false;

    try {
        await authStore.updatePassword({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
            confirmPassword: newPassword.value
        });

        passwordMsg.value = "Password changed successfully!";
        passwordSuccess.value = true;
        currentPassword.value = "";
        newPassword.value = "";
    } catch (err) {
        passwordMsg.value = authStore.error || "Failed to update password.";
        passwordSuccess.value = false;
    } finally {
        loading.value = false;
    }
};

const logout = () => {
    authStore.logout();
    router.push('/');
};

const confirmDeletion = async () => {
    if (!authStore.user) return;

    loading.value = true;

    try {
        await authStore.removeAccount({
            issue: selectedIssue.value,
            comment: comment.value,
            phone_number: authStore.user.phone_number
        });

        authStore.logout();
        alert('Your account deletion request has been submitted successfully.');
        router.push('/'); // redirect to home
        showModal.value = false;
    } catch (err) {
        console.error(err);
        alert('Failed to delete account. Please try again.');
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
a:hover {
    color: #059669;
}
</style>
