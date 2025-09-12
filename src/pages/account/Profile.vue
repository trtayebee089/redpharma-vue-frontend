<template>
    <div class="max-w-4xl mx-auto p-8 font-sans text-gray-800 space-y-8 pt-0">
        <!-- Header -->
        <header class="border-b border-green-200 pb-4 mb-6">
            <h2 class="text-3xl font-bold text-gray-900">Edit Profile</h2>
            <p class="text-gray-500 text-sm">Manage your personal information and account settings</p>
        </header>

        <!-- Profile Image -->
        <div class="flex items-center space-x-6">
            <div class="relative">
                <img :src="preview || user.avatar || defaultAvatar" alt="Profile Image"
                    class="w-28 h-28 rounded-full border object-cover shadow-sm" />
                <input type="file" accept="image/*" @change="onImageChange"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full" />
            </div>
            <div>
                <p class="font-semibold text-lg text-gray-800">{{ user . name }}</p>
                <p class="text-sm text-gray-500">Click the image to change your avatar</p>
            </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Username -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input v-model="user.name" type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input v-model="user.email" type="email"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>

                <!-- Phone -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input v-model="user.phone" type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>

                <!-- Age -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input v-model="user.age" type="number" min="0"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>

                <!-- Gender -->
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

                <!-- Address -->
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
    import {
        ref,
        reactive
    } from "vue";
    import {
        useAuthStore
    } from "@/stores/auth";

    const authStore = useAuthStore();
    const user = reactive({
        ...authStore.user
    }); // editable copy

    const defaultAvatar = "https://via.placeholder.com/150";
    const preview = ref(null);

    // image preview
    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            preview.value = event.target.result;
            user.avatar = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    // save
    const saveProfile = () => {
        authStore.user = {
            ...user
        };
        localStorage.setItem("user", JSON.stringify(authStore.user));
        alert("Profile updated successfully!");
    };
</script>
