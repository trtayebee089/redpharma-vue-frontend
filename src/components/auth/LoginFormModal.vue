<template>
    <Modal v-if="show" :isOpen="show" @close="() => emit('close')">
        <div class="flex items-center justify-center h-100">
            <transition name="fade" mode="out-in">
                <div v-if="authStore.isAuthenticated" class="text-center">
                    <h2 class="text-3xl font-bold text-green-600 mb-2">
                        Welcome, {{ authStore.user?.name || "Customer" }}!
                    </h2>
                    <p class="text-gray-700 text-lg">You are logged in successfully.</p>
                </div>

                <div v-else class="flex flex-col md:flex-row w-full">
                    <div class="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
                        <img :src="loginBg" alt="Promo Banner" class="rounded-lg shadow-md object-cover w-full" />
                    </div>

                    <div class="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                        <div class="flex justify-center mb-6">
                            <img :src="mainLogo" alt="Brand Logo" class="h-12" />
                        </div>

                        <div class="space-y-4">
                            <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">
                                Login
                            </h2>

                            <div class="flex border rounded overflow-hidden">
                                <span
                                    class="flex items-center px-3 bg-gray-100 text-gray-600 text-sm border-r">+880</span>
                                <input type="text" v-model="mobile" placeholder="Enter your mobile number"
                                    class="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>

                            <div class="flex border rounded overflow-hidden mt-2">
                                <input type="password" v-model="password" placeholder="Enter your password"
                                    class="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>

                            <p class="text-xs text-gray-500 text-center mb-2">
                                By continuing, you agree to our <br>
                                <router-link to="/terms" class="text-green-500 hover:underline">Terms &
                                    Conditions</router-link>,
                                <router-link to="/privacy-and-policy" class="text-green-500 hover:underline">Privacy
                                    Policy</router-link>
                                &
                                <router-link to="/refund" class="text-green-500 hover:underline">Refund
                                    Policy</router-link>.
                            </p>
                            
                            <p class="text-xs text-gray-500 text-center">
                                Don't Have An Account?
                                <button @click="switchToRegister" class="text-green-500 hover:underline">
                                    Create an Account
                                </button>
                            </p>

                            <button @click="submitLogin" :disabled="authStore.loading"
                                class="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold w-full transition disabled:opacity-50">
                                <span v-if="authStore.loading">Please wait...</span>
                                <span v-else>Login</span>
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
import loginBg from "@/assets/images/login-bg1.jpg";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
    show: Boolean,
});
const emit = defineEmits(["close", "open-register"]);

const authStore = useAuthStore();
const mobile = ref("");
const password = ref("");

function switchToRegister() {
    emit("close");
    emit("open-register");
}

const submitLogin = async () => {
    try {
        await authStore.login({
            phone_number: mobile.value,
            password: password.value,
        });
    } catch (err) {
        console.error("Login failed:", authStore.error);
    }
};

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
