<template>
    <div class="max-w-4xl mx-auto p-8 font-sans text-gray-800 space-y-8 relative fade-up pt-6">
        <!-- Header -->
        <div
            class="max-w-5xl mx-auto text-center leading-relaxed bg-green-100 rounded-lg p-6 relative overflow-hidden mb-6">
            <!-- Decorative background pattern -->
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

            <!-- Title -->
            <h1 class="text-3xl md:text-4xl font-bold text-green-600 leading-relaxed mb-2 relative z-10"
                :class="langStore.langClass">
                Edit Profile
            </h1>

            <!-- Subtitle -->
            <p class="text-gray-700 text-lg md:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto"
                :class="langStore.langClass">
                Manage your personal information and account settings
            </p>
        </div>

        <!-- Profile Image -->
        <div class="flex items-center space-x-6">
            <div class="relative">
                <img :src="preview || user.avator || defaultAvatar" alt="Profile Image"
                    class="w-28 h-28 rounded-full border object-cover shadow-sm" />
                <input type="file" accept="image/*" @change="onImageChange"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full" />
            </div>
            <div>
                <p class="font-semibold text-lg text-gray-800">{{ user.name }}</p>
                <p class="text-sm text-gray-500">Click the image to change your avatar</p>
            </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input v-model="user.name" type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input v-model="user.email" type="email"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input v-model="user.phone_number" type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select v-model="user.gender"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea v-model="user.address" rows="3"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                </div>
            </div>

            <!-- Save Button -->
            <div class="pt-6 flex justify-center">
                <button type="submit"
                    class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm transition">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/language";

const { t, tm } = useI18n();
const authStore = useAuthStore();
const langStore = useLanguageStore();
const user = reactive({ ...authStore.user });

const defaultAvatar = "https://placehold.co/150";
const preview = ref(null);

const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ keep raw File for upload
    user.avatar = file;

    // ✅ generate base64 for preview only
    const reader = new FileReader();
    reader.onload = (event) => {
        preview.value = event.target.result;
    };
    reader.readAsDataURL(file);
};

// Save profile
const saveProfile = async () => {
    try {
        const payload = {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            age: user.age,
            gender: user.gender,
            address: user.address,
        };

        if (preview.value) {
            payload.avatar = user.avatar;
        }

        await authStore.updateProfile(payload);
        alert("Profile updated successfully!");
    } catch (err) {
        alert("Failed to update profile. Check console for errors.");
        console.error(err);
    }
};
</script>
