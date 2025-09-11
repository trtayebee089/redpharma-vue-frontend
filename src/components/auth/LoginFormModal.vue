<!-- src/components/LoginFormModal.vue -->
<template>
    <Modal :isOpen="show" @close="$emit('close')">
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

                <!-- Step 1: Mobile Input -->
                <div v-if="step === 'mobile'" class="space-y-4">
                    <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">Login / Register</h2>
                    <div class="flex border rounded overflow-hidden">
                        <span class="flex items-center px-3 bg-gray-100 text-gray-600 text-sm border-r">+880</span>
                        <input type="text" v-model="mobile" placeholder="Enter your mobile number"
                            class="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <p class="text-xs text-gray-500 text-center">
                        By continuing, you agree to our
                        <router-link to="/terms" class="text-green-500 hover:underline">Terms &
                            Conditions</router-link>,
                        <router-link to="/privacy" class="text-green-500 hover:underline">Privacy Policy</router-link>
                        &
                        <router-link to="/refund" class="text-green-500 hover:underline">Refund Policy</router-link>.
                    </p>

                    <button @click="sendOtp"
                        class="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold w-full transition">
                        SEND OTP
                    </button>
                </div>

                <!-- Step 2: OTP Verification -->
                <div v-else-if="step === 'otp'" class="space-y-4">
                    <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">Verify OTP</h2>

                    <div class="flex justify-center gap-2">
                        <input v-for="(digit, index) in otpInputs" :key="index" type="text" maxlength="1"
                            v-model="otp[index]" @input="moveFocus(index)"
                            class="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <p class="text-sm text-gray-500 text-center">
                        OTP has been sent to <span class="font-semibold">{{ mobile }}</span>
                    </p>

                    <button @click="verifyOtp"
                        class="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold w-full transition">
                        VERIFY
                    </button>

                    <p class="text-xs text-gray-500 text-center mt-2">
                        Didn’t receive the OTP? <button @click="resendOtp"
                            class="text-green-500 hover:underline">Resend</button>
                    </p>
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

    const step = ref("mobile");
    const mobile = ref("");
    const otp = ref(["", "", "", "", "", ""]);
    const otpInputs = Array(6).fill("");

    function sendOtp() {
        if (!mobile.value) return alert("Please enter a mobile number");
        step.value = "otp";
        console.log("Sending OTP to", mobile.value);
    }

    function verifyOtp() {
        const otpCode = otp.value.join("");
        if (otpCode.length === 6) {
            alert("OTP Verified!");
            emit("close");
        } else alert("Please enter a valid 6-digit OTP.");
    }

    function resendOtp() {
        console.log("Resending OTP to", mobile.value);
    }

    function moveFocus(index) {
        if (otp.value[index].length === 1 && index < 5) {
            const nextInput = document.querySelectorAll("input[type='text']")[index + 1];
            nextInput.focus();
        }
    }
</script>
