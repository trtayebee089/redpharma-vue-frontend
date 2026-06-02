<template>
    <main class="flex min-h-[calc(100vh-96px)] items-center justify-center bg-gray-50">
        <section class="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div class="text-center">
                <div class="mx-auto flex h-14 w-30 items-center justify-center rounded-2xl bg-green-50">
                    <img :src="mainLogo" alt="RedPharma" class="h-9 w-full object-contain" />
                </div>
                <h1 class="mt-5 text-2xl font-bold tracking-tight text-gray-900">Forgot Password</h1>
                <p class="mt-2 text-sm text-gray-500">
                    {{ step === "lookup" ? "Find your account" : "Enter OTP and reset password" }}
                </p>
            </div>

            <form v-if="step === 'lookup'" class="mt-8 space-y-5" @submit.prevent="submitForgotPassword">
                <div>
                    <label for="forgot-email" class="mb-2 block text-sm font-medium text-gray-700">
                        Email (Optional)
                    </label>
                    <input id="forgot-email" v-model="email" type="email" autocomplete="email"
                        placeholder="Email (optional)"
                        class="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                </div>

                <div>
                    <label for="forgot-mobile" class="mb-2 block text-sm font-medium text-gray-700">
                        Mobile number
                    </label>
                    <div
                        class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                        <span
                            class="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-600">
                            +880
                        </span>
                        <input id="forgot-mobile" v-model="mobile" type="text" inputmode="tel"
                            autocomplete="tel-national" placeholder="Enter your mobile number"
                            class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm focus:outline-none focus:ring-0" />
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70">
                    {{ loading ? "Searching..." : "Find Account" }}
                </button>
            </form>

            <form v-else class="mt-8 space-y-5" @submit.prevent="submitResetPassword">
                <div
                    class="flex flex-col gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700 sm:flex-row sm:items-center sm:justify-between">
                    <span>OTP has been sent to your email.</span>
                    <button type="button" @click="resendOtp" :disabled="loading || resendSeconds > 0"
                        class="text-sm font-semibold text-green-700 transition hover:text-green-800 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline">
                        {{ resendSeconds > 0 ? `Resend OTP in ${formattedResendTime}` : "Resend OTP" }}
                    </button>
                </div>

                <div>
                    <label for="reset-mobile" class="mb-2 block text-sm font-medium text-gray-700">
                        Mobile number
                    </label>
                    <div class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-gray-50">
                        <span
                            class="flex items-center border-r border-gray-200 bg-gray-100 px-3 text-sm font-medium text-gray-600">
                            +880
                        </span>
                        <input id="reset-mobile" :value="mobile" type="text" readonly
                            class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-700 focus:outline-none focus:ring-0" />
                    </div>
                </div>

                <div>
                    <label for="reset-otp" class="mb-2 block text-sm font-medium text-gray-700">
                        OTP
                    </label>
                    <input id="reset-otp" v-model="otp" type="text" inputmode="numeric" autocomplete="one-time-code"
                        placeholder="Enter OTP"
                        class="h-12 w-full rounded-xl border border-gray-300 px-3 text-center text-sm tracking-[0.35em] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                </div>

                <div>
                    <label for="reset-password" class="mb-2 block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div
                        class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                        <input id="reset-password" v-model="password" :type="showPassword ? 'text' : 'password'"
                            autocomplete="new-password" placeholder="Enter new password"
                            class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm focus:outline-none focus:ring-0" />
                        <button type="button" @click="showPassword = !showPassword"
                            class="px-3 text-sm font-medium text-gray-500 hover:text-green-600">
                            {{ showPassword ? "Hide" : "Show" }}
                        </button>
                    </div>
                </div>

                <div>
                    <label for="reset-confirm-password" class="mb-2 block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div
                        class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                        <input id="reset-confirm-password" v-model="confirmPassword"
                            :type="showConfirmPassword ? 'text' : 'password'" autocomplete="new-password"
                            placeholder="Confirm new password"
                            class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm focus:outline-none focus:ring-0" />
                        <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                            class="px-3 text-sm font-medium text-gray-500 hover:text-green-600">
                            {{ showConfirmPassword ? "Hide" : "Show" }}
                        </button>
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70">
                    {{ loading ? "Resetting..." : "Reset Password" }}
                </button>

                <button type="button" @click="backToLookup"
                    class="w-full text-sm font-semibold text-gray-500 transition hover:text-green-600 hover:underline">
                    Change email or mobile
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-gray-500">
                <router-link to="/login" class="font-semibold text-green-600 hover:underline">Back to Login</router-link>
            </p>
        </section>
    </main>
</template>

<script setup>
import { computed, onUnmounted, ref } from "vue";
import api from "@/api/config";
import mainLogo from "@/assets/logo.png";

const step = ref("lookup");
const email = ref("");
const mobile = ref("");
const otp = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const message = ref("");
const isSuccess = ref(false);
const resendSeconds = ref(0);
let resendTimer = null;

const formattedResendTime = computed(() => {
    const minutes = Math.floor(resendSeconds.value / 60);
    const seconds = String(resendSeconds.value % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
});

function setMessage(text, success = false) {
    message.value = text;
    isSuccess.value = success;
}

function resetPasswordFields() {
    mobile.value = "";
    otp.value = "";
    password.value = "";
    confirmPassword.value = "";
    showPassword.value = false;
    showConfirmPassword.value = false;
}

function stopResendTimer() {
    if (resendTimer) {
        clearInterval(resendTimer);
        resendTimer = null;
    }
}

function startResendTimer() {
    stopResendTimer();
    resendSeconds.value = 120;

    resendTimer = setInterval(() => {
        if (resendSeconds.value <= 1) {
            resendSeconds.value = 0;
            stopResendTimer();
            return;
        }

        resendSeconds.value -= 1;
    }, 1000);
}

function backToLookup() {
    step.value = "lookup";
    resetPasswordFields();
    stopResendTimer();
    resendSeconds.value = 0;
    setMessage("", false);
}

const submitForgotPassword = async () => {
    setMessage("", false);

    if (!email.value && !mobile.value) {
        setMessage("Please enter your email or mobile number.");
        return;
    }

    loading.value = true;

    try {
        const { data } = await api.post("/customer/forget-password", {
            email: email.value || undefined,
            mobile: mobile.value || undefined,
        });

        step.value = "otp";
        startResendTimer();
        setMessage(data?.message || "OTP has been sent to your email.", true);
    } catch (err) {
        setMessage(err.response?.data?.message || "We could not find an account with those details.");
    } finally {
        loading.value = false;
    }
};

const resendOtp = async () => {
    if (resendSeconds.value > 0) return;

    setMessage("", false);
    loading.value = true;

    try {
        const { data } = await api.post("/customer/forget-password", {
            email: email.value || undefined,
            mobile: mobile.value || undefined,
        });

        startResendTimer();
        setMessage(data?.message || "OTP has been resent to your email.", true);
    } catch (err) {
        setMessage(err.response?.data?.message || "Unable to resend OTP. Please try again.");
    } finally {
        loading.value = false;
    }
};

const submitResetPassword = async () => {
    setMessage("", false);

    if (!otp.value) {
        setMessage("Please enter the OTP from your email.");
        return;
    }

    if (!password.value || !confirmPassword.value) {
        setMessage("Please enter and confirm your new password.");
        return;
    }

    if (password.value !== confirmPassword.value) {
        setMessage("Passwords do not match.");
        return;
    }

    loading.value = true;

    try {
        const { data } = await api.post("/customer/verify-otp", {
            email: email.value || undefined,
            mobile: mobile.value || undefined,
            otp: otp.value,
            password: password.value,
            password_confirmation: confirmPassword.value,
        });

        resetPasswordFields();
        setMessage(data?.message || "Password reset successful. You can now login with your new password.", true);
    } catch (err) {
        setMessage(err.response?.data?.message || "Unable to reset password. Please check the OTP and try again.");
    } finally {
        loading.value = false;
    }
};

onUnmounted(() => {
    stopResendTimer();
});
</script>
