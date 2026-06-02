<template>
    <Modal v-if="show" :isOpen="show" panelClass="max-w-md rounded-2xl border border-gray-100 shadow-xl"
        @close="closeModal">
        <div class="flex min-h-[560px] items-center justify-center bg-white">
            <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95" mode="out-in">
                <div v-if="authStore.isAuthenticated" key="success" class="w-full px-6 py-10 text-center sm:px-8">
                    <div
                        class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-1 ring-green-100">
                        <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>

                    <h2 class="mt-5 text-2xl font-bold tracking-tight text-gray-900">
                        {{ t('auth.welcomeName', { name: authStore.user?.name || t('common.customer') }) }}
                    </h2>

                    <p class="mt-3 text-sm leading-6 text-gray-600">
                        {{ t('auth.accountCreatedSuccess') }}
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
                            {{ t('auth.createAccount') }}
                        </h2>
                        <p class="mt-2 text-sm text-gray-500">
                            {{ t('auth.registerSubtitle') }}
                        </p>
                    </div>

                    <form class="mt-8 space-y-5" @submit.prevent="submitRegister">
                        <div>
                            <label for="register-name" class="mb-2 block text-sm font-medium text-gray-700">{{ t('auth.name') }}</label>
                            <input id="register-name" type="text" v-model="name" :placeholder="t('auth.placeholders.name')"
                                class="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                        </div>

                        <div>
                            <label for="register-email" class="mb-2 block text-sm font-medium text-gray-700">{{ t('auth.email') }}</label>
                            <input id="register-email" type="email" v-model="email" :placeholder="t('auth.placeholders.emailOptional')"
                                class="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                        </div>

                        <div>
                            <label for="register-mobile" class="mb-2 block text-sm font-medium text-gray-700">
                                {{ t('auth.mobileNumberTitle') }}
                            </label>
                            <div
                                class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                                <span
                                    class="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-600">
                                    +880
                                </span>
                                <input id="register-mobile" type="text" v-model="mobile" inputmode="tel"
                                    autocomplete="tel-national" :placeholder="t('auth.placeholders.mobile')"
                                    class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                            </div>
                        </div>

                        <div>
                            <label for="register-password" class="mb-2 block text-sm font-medium text-gray-700">
                                {{ t('auth.password') }}
                            </label>
                            <div
                                class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                                <input id="register-password" :type="showPassword ? 'text' : 'password'"
                                    v-model="password" autocomplete="new-password" :placeholder="t('auth.placeholders.password')"
                                    class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                                <button type="button" @click="showPassword = !showPassword"
                                    :aria-label="showPassword ? t('auth.aria.hidePassword') : t('auth.aria.showPassword')"
                                    class="flex items-center px-3 text-sm font-medium text-gray-500 transition hover:text-green-600 focus:outline-none">
                                    {{ showPassword ? t('common.hide') : t('common.show') }}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label for="register-confirm-password" class="mb-2 block text-sm font-medium text-gray-700">
                                {{ t('auth.confirmPassword') }}
                            </label>
                            <div
                                class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                                <input id="register-confirm-password" :type="showConfirmPassword ? 'text' : 'password'"
                                    v-model="confirmPassword" autocomplete="new-password" :placeholder="t('auth.placeholders.confirmPassword')"
                                    class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                    :aria-label="showConfirmPassword ? t('auth.aria.hideConfirmPassword') : t('auth.aria.showConfirmPassword')"
                                    class="flex items-center px-3 text-sm font-medium text-gray-500 transition hover:text-green-600 focus:outline-none">
                                    {{ showConfirmPassword ? t('common.hide') : t('common.show') }}
                                </button>
                            </div>
                        </div>

                        <p class="text-center text-xs leading-5 text-gray-500">
                            {{ t('auth.byRegistering') }}
                            <router-link to="/terms" @click="closeModal"
                                class="font-medium text-green-600 hover:underline">
                                {{ t('auth.terms') }}
                            </router-link>,
                            <router-link to="/privacy-and-policy" @click="closeModal"
                                class="font-medium text-green-600 hover:underline">
                                {{ t('auth.privacy') }}
                            </router-link>
                            {{ t('auth.and') }}
                            <router-link to="/refund-and-returns" @click="closeModal"
                                class="font-medium text-green-600 hover:underline">
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
                            <span>{{ authStore.loading ? t('auth.registering') : t('auth.register') }}</span>
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
                        {{ t('auth.alreadyHaveAccount') }}
                        <button type="button" @click="switchToLogin"
                            class="font-semibold text-green-600 transition hover:text-green-700 hover:underline">
                            {{ t('auth.login') }}
                        </button>
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

const emit = defineEmits(["close", "open-login"]);

const authStore = useAuthStore();
const route = useRoute();
const { t } = useI18n();

const name = ref("");
const email = ref("");
const mobile = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function resetForm() {
    name.value = "";
    email.value = "";
    mobile.value = "";
    password.value = "";
    confirmPassword.value = "";
    showPassword.value = false;
    showConfirmPassword.value = false;
    authStore.error = null;
}

function closeModal() {
    resetForm();
    emit("close");
}

function switchToLogin() {
    closeModal();
    emit("open-login");
}

const submitRegister = async () => {
    if (password.value !== confirmPassword.value) {
        authStore.error = t("auth.errors.passwordsDoNotMatch");
        return;
    }
    try {
        await authStore.register({
            name: name.value,
            email: email.value,
            phone_number: mobile.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
        });
    } catch (err) {
        console.error(t("auth.errors.registrationFailed"), authStore.error);
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
