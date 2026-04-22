<template>
    <main class="flex min-h-[calc(100vh-96px)] items-center justify-center bg-gray-50 px-4 py-12">
        <section class="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div class="text-center">
                <div class="mx-auto flex h-14 w-30 items-center justify-center rounded-2xl bg-green-50">
                    <img :src="mainLogo" alt="RedPharma" class="h-9 w-full object-contain" />
                </div>
                <h1 class="mt-5 text-2xl font-bold tracking-tight text-gray-900">{{ t('auth.welcomeBack') }}</h1>
                <p class="mt-2 text-sm text-gray-500">{{ t('auth.loginSubtitle') }}</p>
            </div>

            <form class="mt-8 space-y-5" @submit.prevent="submitLogin">
                <div>
                    <label for="page-login-mobile" class="mb-2 block text-sm font-medium text-gray-700">
                        {{ t('auth.mobileNumber') }}
                    </label>
                    <div
                        class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                        <span
                            class="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-600">
                            +880
                        </span>
                        <input id="page-login-mobile" type="text" v-model="mobile" inputmode="tel"
                            autocomplete="tel-national" :placeholder="t('auth.placeholders.mobile')"
                            class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                    </div>
                </div>

                <div>
                    <div class="mb-2 flex items-center justify-between gap-3">
                        <label for="page-login-password" class="block text-sm font-medium text-gray-700">{{ t('auth.password') }}</label>
                        <router-link to="/forgot-password"
                            class="text-sm font-medium text-green-600 transition hover:text-green-700 hover:underline">
                            {{ t('auth.forgotPassword') }}
                        </router-link>
                    </div>
                    <div
                        class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                        <input id="page-login-password" :type="showPassword ? 'text' : 'password'" v-model="password"
                            autocomplete="current-password" :placeholder="t('auth.placeholders.password')"
                            class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0" />
                        <button type="button" @click="showPassword = !showPassword"
                            class="flex items-center px-3 text-sm font-medium text-gray-500 transition hover:text-green-600 focus:outline-none">
                            {{ showPassword ? t('common.hide') : t('common.show') }}
                        </button>
                    </div>
                </div>

                <button type="submit" :disabled="authStore.loading"
                    class="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70">
                    {{ authStore.loading ? t('auth.signingIn') : t('auth.login') }}
                </button>

                <p v-if="authStore.error"
                    class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                    {{ authStore.error }}
                </p>
            </form>

            <p class="mt-6 text-center text-sm text-gray-500">
                {{ t('auth.dontHaveAccount') }}
                <router-link to="/register" class="font-semibold text-green-600 hover:underline">{{ t('auth.signUp') }}</router-link>
            </p>
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import mainLogo from "@/assets/logo.png";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();
const mobile = ref("");
const password = ref("");
const showPassword = ref(false);

const submitLogin = async () => {
    try {
        await authStore.login({
            phone_number: mobile.value,
            password: password.value,
        });
        router.push("/profile");
    } catch (err) {
        console.error(t("auth.errors.loginFailed"), authStore.error);
    }
};
</script>
