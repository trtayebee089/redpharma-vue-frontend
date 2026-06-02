<template>
    <div class="max-w-3xl mx-auto p-6">
        <div
            class="max-w-5xl mx-auto text-center leading-relaxed bg-red-100 rounded-lg p-6 relative overflow-hidden mb-6">

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

            <h1 class="text-3xl md:text-4xl font-bold text-red-600 leading-relaxed mb-2 relative z-10">
                Confirm Account Deletion
            </h1>

            <p class="text-gray-700 text-lg md:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto">
                Please review what will happen when your RedPharma account is deleted. This action is permanent and
                cannot be reversed.
            </p>
        </div>

        <div class="text-gray-700 mb-4 space-y-3 text-sm">
            <p>
                <strong>Orders & Prescriptions:</strong> Any active orders will be cancelled and your prescription
                history will be queued for permanent deletion after 30 days.
            </p>
            <p>
                <strong>Data:</strong> Your profile information and all associated data will be
                queued for permanent deletion after 30 days.
            </p>
        </div>

        <!-- Phone Number -->
        <div class="mb-4">
            <label class="block font-semibold mb-1">Phone Number</label>
            <input type="text" v-model="phone" class="w-full border border-gray-300 rounded px-2 py-1"
                placeholder="Enter your phone number" />
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

                    <input type="radio" :value="option" v-model="selectedIssue" class="absolute opacity-0 w-0 h-0" />
                </label>
            </div>
        </div>

        <!-- Comment -->
        <div class="mb-4">
            <label class="block font-semibold mb-1">Additional Comments (optional):</label>
            <textarea v-model="comment" class="w-full border border-gray-300 rounded px-2 py-1" rows="3"
                placeholder="Your comment..."></textarea>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3">
            <button @click="goBack" :disabled="loading"
                class="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100">
                Cancel
            </button>

            <button @click="confirmDeletion" :disabled="loading || !selectedIssue || !phone"
                class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
                <span v-if="loading">Deleting...</span>
                <span v-else>Confirm</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { push } from 'notivue'
import { useAuthStore } from "@/stores/auth";

const issues = [
    "I no longer need the service",
    "Privacy concerns",
    "Found a better alternative",
    "Other",
];

const phone = ref("");
const selectedIssue = ref("");
const comment = ref("");
const loading = ref(false);
const authStore = useAuthStore();

function goBack() {
    window.location.href = "/";
}

async function confirmDeletion() {
    if (!phone.value) {
        push.warning("Please enter your phone number.");
        return;
    }

    if (!confirm("Are you sure you want to permanently delete your account?")) { return; }

    const notification = push.promise("Submitting your deletion request...");

    loading.value = true;

    try {
        await authStore.removeAccount({
            issue: selectedIssue.value,
            comment: comment.value,
            phone_number: phone.value
        });

        notification.resolve("Your deletion request has been submitted.");
        window.location.href = "/";
    } catch (e) {
        console.log(e)
        notification.reject("Something went wrong. Please try again.");
    } finally {
        loading.value = false;
    }
}
</script>

<style></style>
