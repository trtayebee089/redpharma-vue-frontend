<template>
    <Modal v-if="show" :isOpen="show" @close="() => emit('close')">
        <div class="flex items-center justify-center h-auto min-h-[500px]">
            <transition name="fade" mode="out-in">
                <div v-if="authStore.isAuthenticated" class="text-center">
                    <h2 class="text-3xl font-bold text-green-600 mb-2">
                        Welcome, {{ authStore.user?.name || "Customer" }}!
                    </h2>
                    <p class="text-gray-700 text-lg">You have successfully registered.</p>
                </div>

                <div v-else class="flex flex-col md:flex-row w-full">
                    <div class="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
                        <img src="https://img.freepik.com/premium-vector/online-registration-sign-up-login-account-mobile-app_530733-1649.jpg"
                            alt="Register Banner" class="rounded-lg shadow-md object-cover h-full w-full" />
                    </div>

                    <div class="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                        <div class="flex justify-center mb-6">
                            <img :src="mainLogo" alt="Brand Logo" class="h-12" />
                        </div>

                        <div class="space-y-4">
                            <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">
                                Create Your Account
                            </h2>

                            <input type="text" v-model="name" placeholder="Full Name"
                                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />

                            <div class="flex border rounded overflow-hidden">
                                <span
                                    class="flex items-center px-3 bg-gray-100 text-gray-600 text-sm border-r">+880</span>
                                <input type="text" v-model="mobile" placeholder="Enter your mobile number"
                                    class="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>

                            <input type="password" v-model="password" placeholder="Password"
                                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />

                            <input type="password" v-model="confirmPassword" placeholder="Confirm Password"
                                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />

                            <p class="text-xs text-gray-500 text-center">
                                By registering, you agree to our
                                <router-link to="/terms" class="text-green-500 hover:underline">Terms &
                                    Conditions</router-link>,
                                <router-link to="/privacy-and-policy" class="text-green-500 hover:underline">Privacy
                                    Policy</router-link>
                                &
                                <router-link to="/refund" class="text-green-500 hover:underline">Refund
                                    Policy</router-link>.
                            </p>

                            <p class="text-xs text-gray-500 text-center mt-2">
                                Already have an account?
                                <button @click="switchToLogin" class="text-green-500 hover:underline">
                                    Login
                                </button>
                            </p>

                            <button @click="submitRegister" :disabled="authStore.loading"
                                class="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold w-full transition disabled:opacity-50">
                                <span v-if="authStore.loading">Registering...</span>
                                <span v-else>Register</span>
                            </button>

                            <p v-if="authStore.error" class="text-red-500 text-center">
                                {{ authStore.error }}
                            </p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </Modal>
</template>

<script setup>
import { ref, watch } from "vue";
import Modal from "../common/Modal.vue";
import mainLogo from "@/assets/logo.png";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(["close", "open-login"]);

function switchToLogin() {
    emit("close");
    emit("open-login");
}

const authStore = useAuthStore();

const name = ref("Md Faisal Ahmed");
const mobile = ref("01688052518");
const password = ref("12345678");
const confirmPassword = ref("12345678");

// Submit registration
const submitRegister = async () => {
    if (password.value !== confirmPassword.value) {
        authStore.error = "Passwords do not match";
        return;
    }
    try {
        await authStore.register({
            name: name.value,
            phone_number: mobile.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
        });
    } catch (err) {
        console.error("Registration failed:", authStore.error);
    }
};

// Auto-close after register success
watch(
    () => authStore.isAuthenticated,
    (isAuth) => {
        if (isAuth) {
            setTimeout(() => emit("close"), 2000);
        }
    }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
