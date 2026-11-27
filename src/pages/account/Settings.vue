<template>
    <div class="customer-page settings-page">
        <header class="customer-heading">
            <h1>{{ t('settings.title') }}</h1>
            <p>{{ t('settings.description') }}</p>
        </header>

        <div class="settings-grid">
            <section class="customer-panel settings-password">
                <h2><i class="pi pi-lock" aria-hidden="true"></i> {{ t('settings.changePassword') }}</h2>
                <form class="grid gap-3 mt-4" @submit.prevent="changePassword">
                    <div>
                        <label for="settings-current-password" class="customer-label">{{ t('settings.currentPassword') }}</label>
                        <input id="settings-current-password" v-model="currentPassword" class="customer-input"
                            type="password" autocomplete="current-password" required />
                    </div>
                    <div>
                        <label for="settings-new-password" class="customer-label">{{ t('settings.newPassword') }}</label>
                        <input id="settings-new-password" v-model="newPassword" class="customer-input"
                            type="password" autocomplete="new-password" required />
                    </div>
                    <button type="submit" class="customer-button customer-button-primary justify-self-start" :disabled="loading">
                        {{ t(loading ? 'settings.updating' : 'settings.changePassword') }}
                    </button>
                    <p v-if="passwordMsg" role="status" class="text-sm"
                        :class="passwordSuccess ? 'text-green-800' : 'text-red-700'">{{ passwordMsg }}</p>
                </form>
            </section>

            <section class="customer-panel">
                <h2><i class="pi pi-globe" aria-hidden="true"></i> {{ t('settings.language') }}</h2>
                <label for="settings-language" class="customer-label mt-4">{{ t('settings.displayLanguage') }}</label>
                <select id="settings-language" :value="langStore.lang" class="customer-input"
                    @change="langStore.setLanguage($event.target.value)">
                    <option value="en" lang="en">English</option>
                    <option value="bn" lang="bn">বাংলা</option>
                </select>
            </section>

            <section class="customer-panel">
                <h2><i class="pi pi-file" aria-hidden="true"></i> {{ t('settings.policies') }}</h2>
                <div class="settings-links">
                    <router-link to="/privacy-and-policy">
                        {{ t('header.menu.privacy') }}
                        <i class="pi pi-chevron-right" aria-hidden="true"></i>
                    </router-link>
                    <router-link to="/terms-and-conditions">
                        {{ t('settings.terms') }}
                        <i class="pi pi-chevron-right" aria-hidden="true"></i>
                    </router-link>
                </div>
            </section>

            <section class="customer-panel settings-account">
                <h2><i class="pi pi-user" aria-hidden="true"></i> {{ t('mobileNav.account') }}</h2>
                <div class="flex flex-wrap gap-2 mt-4">
                    <button class="customer-button" type="button" @click="logout">{{ t('header.buttons.logout') }}</button>
                    <button class="customer-button customer-button-danger" type="button" :disabled="loading"
                        @click="deletionDialog.showModal()">{{ t('settings.deleteAccount') }}</button>
                </div>
            </section>
        </div>

        <dialog ref="deletionDialog" class="settings-dialog" aria-labelledby="settings-delete-heading"
            @cancel="loading && $event.preventDefault()">
            <div class="customer-panel">
                <h2 id="settings-delete-heading">{{ t('settings.confirmDeletion') }}</h2>
                <div class="settings-deletion-notes customer-muted">
                    <p>{{ t('settings.deletionNotice') }}</p>
                    <p>{{ t('settings.deletionOrders') }}</p>
                    <p>{{ t('settings.deletionData') }}</p>
                </div>

                <form class="grid gap-3" @submit.prevent="confirmDeletion">
                    <fieldset>
                        <legend class="customer-label">{{ t('settings.reason') }}</legend>
                        <div class="grid gap-2">
                            <label v-for="issue in issues" :key="issue.value" class="settings-reason">
                                <input v-model="selectedIssue" type="radio" name="deletion-reason" :value="issue.value" required />
                                {{ t(`settings.reasons.${issue.key}`) }}
                            </label>
                        </div>
                    </fieldset>
                    <div>
                        <label for="settings-delete-comment" class="customer-label">{{ t('settings.comment') }}</label>
                        <textarea id="settings-delete-comment" v-model="comment" class="customer-input" rows="3"></textarea>
                    </div>
                    <div class="flex flex-wrap justify-end gap-2">
                        <button type="button" class="customer-button" :disabled="loading" @click="deletionDialog.close()">
                            {{ t('settings.cancel') }}
                        </button>
                        <button type="submit" class="customer-button customer-button-danger" :disabled="loading || !selectedIssue">
                            {{ t(loading ? 'settings.deleting' : 'settings.confirm') }}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useLanguageStore } from "@/stores/language";
import { useRouter } from "vue-router";
import "@/assets/customer-pages.css";

const { t } = useI18n();
const authStore = useAuthStore();
const langStore = useLanguageStore();
const router = useRouter();
const currentPassword = ref("");
const newPassword = ref("");
const passwordMsg = ref("");
const passwordSuccess = ref(false);
const loading = ref(false);
const deletionDialog = ref(null);

const issues = [
    { key: "unused", value: "I no longer need the service" },
    { key: "privacy", value: "Privacy concerns" },
    { key: "alternative", value: "Found a better alternative" },
    { key: "other", value: "Other" },
];
const selectedIssue = ref("");
const comment = ref("");

const changePassword = async () => {
    if (loading.value || !currentPassword.value || !newPassword.value) return;

    loading.value = true;
    passwordMsg.value = "";
    passwordSuccess.value = false;

    try {
        await authStore.updatePassword({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
            confirmPassword: newPassword.value,
        });

        passwordMsg.value = t("settings.passwordChanged");
        passwordSuccess.value = true;
        currentPassword.value = "";
        newPassword.value = "";
    } catch {
        passwordMsg.value = typeof authStore.error === "string" ? authStore.error : t("settings.passwordFailed");
    } finally {
        loading.value = false;
    }
};

const logout = () => {
    authStore.logout();
    router.push("/");
};

const confirmDeletion = async () => {
    if (loading.value || !selectedIssue.value || !authStore.user) return;

    loading.value = true;

    try {
        await authStore.removeAccount({
            issue: selectedIssue.value,
            comment: comment.value,
            phone_number: authStore.user.phone_number,
        });

        deletionDialog.value.close();
        authStore.logout();
        alert(t("settings.deletionSubmitted"));
        router.push("/");
    } catch {
        alert(t("settings.deletionFailed"));
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.settings-page {
    max-width: 54rem;
}

.settings-grid {
    display: grid;
    gap: 14px;
}

.settings-grid h2 i {
    margin-inline-end: 5px;
    color: #176742;
    font-size: .875rem;
}

.settings-links {
    display: grid;
    margin-top: 12px;
}

.settings-links a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 9px;
    padding: 10px 0;
    border-top: 1px solid #e5eee7;
    color: #176742;
    font-size: .875rem;
    font-weight: 650;
}

.settings-links a:hover {
    text-decoration: underline;
}

.settings-dialog {
    position: fixed;
    inset: 0;
    width: min(35rem, calc(100% - 24px));
    max-height: calc(100dvh - 24px);
    margin: auto;
    border-radius: 13px;
    color: #183c2a;
    overflow: auto;
}

.settings-dialog::backdrop {
    background: rgb(21 43 32 / 58%);
}

.settings-deletion-notes {
    display: grid;
    gap: 6px;
    margin: 10px 0 14px;
    font-size: .875rem;
}

.settings-reason {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;
    border: 1px solid #dce8e0;
    border-radius: 7px;
    font-size: .875rem;
}

.settings-reason input {
    accent-color: #176742;
}

@media (min-width: 768px) {
    .settings-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
    }

    .settings-password {
        grid-area: 1 / 1 / 3 / 2;
    }

    .settings-account {
        grid-column: 1 / -1;
    }
}
</style>
