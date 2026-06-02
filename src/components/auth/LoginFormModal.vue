<template>
    <Modal v-if="show" :isOpen="show" panelClass="max-w-[430px] rounded-2xl border border-gray-100 shadow-xl"
        @close="closeModal">
        <div class="flex min-h-[480px] items-center justify-center bg-white">
            <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95" mode="out-in">
                <div v-if="authStore.isAuthenticated" key="success"
                    class="w-full px-6 py-10 text-center sm:px-8">
                    <div
                        class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-1 ring-green-100">
                        <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>

                    <h2 class="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                        {{ t('auth.welcomeBackName', { name: authStore.user?.name || t('common.customer') }) }}
                    </h2>

                    <p class="mt-3 text-sm leading-6 text-gray-600">
                        {{ t('auth.signedInSuccess') }}
                    </p>

                    <div class="mt-6 flex justify-center">
                        <span
                            class="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700">
                            <span class="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            {{ t('auth.loginSuccessful') }}
                        </span>
                    </div>
                </div>

                <div v-else key="form" class="w-full px-5 py-8 sm:px-8 sm:py-10">
                    <div class="text-center">
                        <div
                            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 ring-1 ring-green-100">
                            <img :src="mainLogo" alt="RedPharma" class="h-9 w-9 object-contain" />
                        </div>
                        <h2 class="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                            {{ t('auth.welcomeBack') }}
                        </h2>
                        <p class="mt-2 text-sm text-gray-500">
                            {{ t('auth.loginSubtitle') }}
                        </p>
                    </div>

                    <form class="mt-8 space-y-5" @submit.prevent="submitLogin">
                        <div>
                            <label for="login-mobile" class="mb-2 block text-sm font-medium text-gray-700">
                                {{ t('auth.mobileNumber') }}
                            </label>
                            <div
                                class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/25">
                                <span
                                    class="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-600">
                                    +880
                                </span>
                                <input id="login-mobile" type="text" v-model="mobile" inputmode="tel"
                                    autocomplete="tel-national" :placeholder="t('auth.placeholders.mobile')"
                                    class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                            </div>
                        </div>

                        <div>
                            <div class="mb-2 flex items-center justify-between gap-3">
                                <label for="login-password" class="block text-sm font-medium text-gray-700">
                                    {{ t('auth.password') }}
                                </label>
                                <router-link to="/forgot-password" @click="closeModal"
                                    class="text-sm font-medium text-green-600 transition hover:text-green-700 hover:underline">
                                    {{ t('auth.forgotPassword') }}
                                </router-link>
                            </div>
                            <div
                                class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/25">
                                <input id="login-password" :type="showPassword ? 'text' : 'password'"
                                    v-model="password" autocomplete="current-password" :placeholder="t('auth.placeholders.password')"
                                    class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                                <button type="button" @click="showPassword = !showPassword"
                                    :aria-label="showPassword ? t('auth.aria.hidePassword') : t('auth.aria.showPassword')"
                                    class="flex items-center px-3 text-sm font-medium text-gray-500 transition hover:text-green-600 focus:outline-none">
                                    {{ showPassword ? t('common.hide') : t('common.show') }}
                                </button>
                            </div>
                        </div>

                        <p class="text-center text-xs leading-5 text-gray-500">
                            {{ t('auth.byContinuing') }}
                            <router-link to="/terms" @click="closeModal" class="font-medium text-green-600 hover:underline">
                                {{ t('auth.terms') }}
                            </router-link>,
                            <router-link to="/privacy-and-policy" @click="closeModal" class="font-medium text-green-600 hover:underline">
                                {{ t('auth.privacy') }}
                            </router-link>
                            {{ t('auth.and') }}
                            <router-link to="/refund-and-returns" @click="closeModal" class="font-medium text-green-600 hover:underline">
                                {{ t('auth.refund') }}
                            </router-link>.
                        </p>

                        <button type="submit" :disabled="authStore.loading"
                            class="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70">
                            <svg v-if="authStore.loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24"
                                fill="none" aria-hidden="true">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            <span>{{ authStore.loading ? t('auth.signingIn') : t('auth.login') }}</span>
                        </button>

                        <p v-if="authStore.error"
                            class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600"
                            role="alert">
                            {{ authStore.error }}
                        </p>
                    </form>

                    <div class="my-6 flex items-center gap-3">
                        <div class="h-px flex-1 bg-gray-200"></div>
                        <span class="text-xs font-medium uppercase tracking-wide text-gray-400">{{ t('common.or') }}</span>
                        <div class="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <p class="text-center text-sm text-gray-500">
                        {{ t('auth.dontHaveAccount') }}
                        <router-link to="/register" @click="closeModal"
                            class="font-semibold text-green-600 transition hover:text-green-700 hover:underline">
                            {{ t('auth.signUp') }}
                        </router-link>
                    </p>
                </div>
            </transition>
        </div>
    </Modal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Modal from "../common/Modal.vue";
import mainLogo from "@/assets/logo.png";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
    show: Boolean,
});
const emit = defineEmits(["close", "open-register"]);

const authStore = useAuthStore();
const route = useRoute();
const { t } = useI18n();
const mobile = ref("");
const password = ref("");
const showPassword = ref(false);

function resetForm() {
    mobile.value = "";
    password.value = "";
    showPassword.value = false;
    authStore.error = null;
}

function closeModal() {
    resetForm();
    emit("close");
}

function switchToRegister() {
    closeModal();
    emit("open-register");
}

const submitLogin = async () => {
    try {
        await authStore.login({
            phone_number: mobile.value,
            password: password.value,
        });
    } catch (err) {
        console.error(t("auth.errors.loginFailed"), authStore.error);
    }
};

watch(
    () => authStore.isAuthenticated,
    (isAuth) => {
        if (isAuth) {
            setTimeout(() => closeModal(), 2000);
        }
    }
);

watch(
    () => props.show,
    (isShown) => {
        if (!isShown) {
            resetForm();
        }
    }
);

watch(
    () => route.path,
    () => {
        if (props.show) {
            closeModal();
        }
    }
);
</script>
