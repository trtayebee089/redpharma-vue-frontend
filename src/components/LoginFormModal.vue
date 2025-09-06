<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                <!-- Close Button -->
                <button @click="$emit('close')"
                    class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold">&times;</button>

                <!-- Modal Title -->
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Login</h2>

                <!-- Login Form -->
                <form @submit.prevent="loginUser" class="flex flex-col space-y-4">
                    <div>
                        <label class="block mb-1 text-gray-600">Mobile Number</label>
                        <input type="text" v-model="mobile" placeholder="Enter your mobile number"
                            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>

                    <div>
                        <label class="block mb-1 text-gray-600">Password</label>
                        <input type="password" v-model="password" placeholder="Enter your password"
                            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>

                    <button type="submit"
                        class="bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition">Login</button>
                </form>

                <p class="mt-4 text-sm text-gray-600">
                    Don't have an account?
                    <router-link @click.native="$emit('close')" to="/register" class="text-red-500 hover:underline">
                        Register
                    </router-link>
                </p>
            </div>
        </div>
    </transition>
</template>

<script setup>
    import {
        ref
    } from 'vue';

    const props = defineProps({
        show: Boolean
    })

    const emit = defineEmits(['close']);

    const mobile = ref('');
    const password = ref('');

    function loginUser() {
        console.log('Logging in:', mobile.value, password.value);
        emit('close');
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
