<template>
    <main class="flex min-h-[calc(100vh-96px)] items-start justify-center bg-gray-50">
        <section class="w-full max-w-md rounded-2xl bg-white px-6 pb-6 shadow-sm md:px-8 md:pb-4">
            <div class="text-center">
                <div class="mx-auto flex h-14 w-30 items-center justify-center rounded-2xl bg-green-50">
                    <img :src="mainLogo" alt="RedPharma" class="h-9 w-full object-contain" />
                </div>
                <h1 class="mt-5 text-2xl font-bold tracking-tight text-gray-900">{{ t('auth.createAccount') }}</h1>
                <p class="mt-2 text-sm text-gray-500">{{ t('auth.registerSubtitle') }}</p>
            </div>

            <form class="mt-8 space-y-5" @submit.prevent="submitRegister">
                <input v-model="name" type="text" :placeholder="t('auth.name')"
                    class="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                <input v-model="email" type="email" :placeholder="t('auth.placeholders.emailOptional')"
                    class="h-12 w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25" />
                <div
                    class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                    <span class="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-600">
                        +880
                    </span>
                    <input v-model="mobile" type="text" inputmode="tel" :placeholder="t('auth.placeholders.mobileShort')"
                        class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm focus:outline-none focus:ring-0" />
                </div>
                <div
                    class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                    <input :type="showPassword ? 'text' : 'password'" v-model="password" :placeholder="t('auth.placeholders.passwordShort')"
                        class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm focus:outline-none focus:ring-0" />
                    <button type="button" @click="showPassword = !showPassword"
                        class="px-3 text-sm font-medium text-gray-500 hover:text-green-600">
                        {{ showPassword ? t('common.hide') : t('common.show') }}
                    </button>
                </div>
                <div
                    class="flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
                    <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
                        :placeholder="t('auth.placeholders.confirmPasswordTitle')"
                        class="min-w-0 flex-1 border-0 bg-transparent px-3 text-sm focus:outline-none focus:ring-0" />
                    <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                        class="px-3 text-sm font-medium text-gray-500 hover:text-green-600">
                        {{ showConfirmPassword ? t('common.hide') : t('common.show') }}
                    </button>
                </div>

                <button type="submit" :disabled="authStore.loading"
                    class="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70">
                    {{ authStore.loading ? t('auth.registering') : t('auth.register') }}
                </button>

                <p v-if="authStore.error"
                    class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                    {{ authStore.error }}
                </p>
            </form>

            <p class="mt-6 text-center text-sm text-gray-500">
                {{ t('auth.alreadyHaveAccount') }}
                <router-link to="/login" class="font-semibold text-green-600 hover:underline">{{ t('auth.login') }}</router-link>
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
const name = ref("");
const email = ref("");
const mobile = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

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
        router.push("/profile");
    } catch (err) {
        console.error(t("auth.errors.registrationFailed"), authStore.error);
    }
};
</script>
