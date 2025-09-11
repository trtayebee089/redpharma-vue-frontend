<!-- src/components/LoginFormModal.vue -->
<template>
    <Modal :isOpen="show" @close="() => { console.log('LoginFormModal got close'); emit('close'); }">
        <div class="flex flex-col md:flex-row w-full">
            <!-- Left Promo Banner -->
            <div class="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
                <img src="https://img.pikbest.com/templates/20240729/health-and-medical-promotion-website-banner-design_10686814.jpg!sw800"
                    alt="Promo Banner" class="rounded-lg shadow-md object-cover h-full w-full" />
            </div>

            <!-- Right Content -->
            <div class="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                <!-- Brand Logo -->
                <div class="flex justify-center mb-6">
                    <img :src="mainLogo" alt="Brand Logo" class="h-12" />
                </div>

                <!-- Login / Register Step -->
                <div class="space-y-4">
                    <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">Login / Register</h2>

                    <!-- Mobile Input -->
                    <div class="flex border rounded overflow-hidden">
                        <span class="flex items-center px-3 bg-gray-100 text-gray-600 text-sm border-r">+880</span>
                        <input type="text" v-model="mobile" placeholder="Enter your mobile number"
                            class="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <!-- Password Input -->
                    <div class="flex border rounded overflow-hidden mt-2">
                        <input type="password" v-model="password" placeholder="Enter your password"
                            class="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <!-- Terms & Conditions -->
                    <p class="text-xs text-gray-500 text-center">
                        By continuing, you agree to our
                        <router-link to="/terms" class="text-green-500 hover:underline">Terms &
                            Conditions</router-link>,
                        <router-link to="/privacy" class="text-green-500 hover:underline">Privacy Policy</router-link>
                        &
                        <router-link to="/refund" class="text-green-500 hover:underline">Refund Policy</router-link>.
                    </p>

                    <!-- Submit Button -->
                    <button @click="login"
                        class="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold w-full transition">
                        LOGIN / REGISTER
                    </button>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
    import {
        ref
    } from "vue";
    import Modal from "../common/Modal.vue";
    import mainLogo from "@/assets/logo.png";

    const props = defineProps({
        show: Boolean
    });
    const emit = defineEmits(["close"]);
    const mobile = ref("");
</script>
