<template>

    <div v-if="authStore.loading" role="status"
        class="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
        <div class="flex flex-col items-center gap-3">
            <svg class="w-8 h-8 animate-spin text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <p class="text-green-700 font-medium">{{ $t('account.profileUpdating') }}</p>
        </div>
    </div>

    <div class="account-page">
        <header class="account-heading">
            <h1>{{ $t('account.editProfile') }}</h1>
            <p>{{ $t('account.profileSubtitle') }}</p>
        </header>

        <div class="account-layout">
            <div class="account-avatar">
                <div class="account-avatar-preview">
                    <img v-if="preview || user.avator" :src="preview || user.avator" alt="" />
                    <i v-else class="pi pi-user" aria-hidden="true"></i>
                    <input type="file" accept="image/*" @change="onImageChange"
                        :aria-label="$t('account.changePhoto')" />
                </div>
                <div class="min-w-0">
                    <p class="account-name">{{ user.name }}</p>
                    <p class="account-avatar-help">{{ $t('account.avatarHelp') }}</p>
                </div>
            </div>

            <form @submit.prevent="saveProfile" class="account-form">
                <h2>{{ $t('account.personalDetails') }}</h2>
                <div class="account-fields">
                    <div>
                        <label for="profile-name">{{ $t('auth.fullName') }}</label>
                        <input id="profile-name" v-model="user.name" type="text" autocomplete="name"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    </div>

                    <div>
                        <label for="profile-email">{{ $t('common.email') }}</label>
                        <input id="profile-email" v-model="user.email" type="email" autocomplete="email"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    </div>

                    <div>
                        <label for="profile-phone">{{ $t('common.phone') }}</label>
                        <input id="profile-phone" v-model="user.phone_number" type="text" inputmode="tel" autocomplete="tel"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    </div>

                    <div>
                        <label for="profile-gender">{{ $t('forms.gender') }}</label>
                        <select id="profile-gender" v-model="user.gender"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            <option value="">{{ $t('forms.selectGender') }}</option>
                            <option value="male">{{ $t('forms.male') }}</option>
                            <option value="female">{{ $t('forms.female') }}</option>
                            <option value="other">{{ $t('forms.other') }}</option>
                        </select>
                    </div>

                    <div class="account-address">
                        <label for="profile-address">{{ $t('common.address') }}</label>
                        <textarea id="profile-address" v-model="user.address" rows="3" autocomplete="street-address"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>
                </div>

                <div class="account-form-actions">
                    <button type="submit" :disabled="authStore.loading"
                        class="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm transition">
                        <svg v-if="authStore.loading" class="w-5 h-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>


                        <span>
                            {{ authStore.loading ? $t('common.saving') : $t('account.saveChanges') }}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const authStore = useAuthStore();
const user = reactive({ ...authStore.user });

const preview = ref(null);

const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ keep raw File for upload
    user.avatar = file;

    // ✅ generate base64 for preview only
    const reader = new FileReader();
    reader.onload = (event) => {
        preview.value = event.target.result;
    };
    reader.readAsDataURL(file);
};

// Save profile
const saveProfile = async () => {
    try {
        const payload = {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            age: user.age,
            gender: user.gender,
            address: user.address,
        };

        if (preview.value) {
            payload.avatar = user.avatar;
        }

        await authStore.updateProfile(payload);
        alert(t("account.profileSaved"));
    } catch (err) {
        if (authStore.error) {
            const message = typeof authStore.error === "string"
                ? authStore.error
                : Object.values(authStore.error).flat().join("\n");

            alert(message);
        }
    }
};
</script>

<style scoped>
.account-page {
    max-width: 66rem;
    margin-inline: auto;
    color: #173e2c;
}

.account-heading,
.account-avatar,
.account-form {
    padding: clamp(16px, 3vw, 26px);
    border: 1px solid #dce8e0;
    border-radius: 14px;
}

.account-heading {
    margin-bottom: 18px;
    background: #f1f8f3;
}

.account-heading h1 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 750;
    line-height: 1.3;
}

.account-heading p {
    margin-top: 5px;
    color: #496154;
    font-size: .95rem;
}

.account-layout {
    display: grid;
    align-items: start;
    gap: 16px;
}

.account-avatar,
.account-form {
    background: #fff;
    box-shadow: 0 2px 8px rgb(20 61 42 / 4%);
}

.account-avatar {
    display: flex;
    align-items: center;
    gap: 14px;
}

.account-avatar-preview {
    position: relative;
    display: grid;
    flex: none;
    width: 68px;
    height: 68px;
    place-items: center;
    border: 1px solid #dce8e0;
    border-radius: 50%;
    background: #eef7f1;
    color: #176742;
    font-size: 1.4rem;
}

.account-avatar-preview:focus-within {
    outline: 2px solid #218158;
    outline-offset: 3px;
}

.account-avatar-preview img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
}

.account-avatar-preview input {
    position: absolute;
    inset: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
}

.account-name {
    font-weight: 700;
    overflow-wrap: anywhere;
}

.account-avatar-help {
    margin-top: 3px;
    color: #496154;
    font-size: .875rem;
}

.account-form h2 {
    margin-bottom: 16px;
    font-size: 1.125rem;
    font-weight: 700;
}

.account-fields {
    display: grid;
    gap: 16px;
}

.account-form label {
    display: block;
    margin-bottom: 5px;
    color: #394e42;
    font-size: .875rem;
    font-weight: 600;
}

.account-form :is(input, select, textarea) {
    min-height: 42px;
    border-color: #d4e2d9;
    background: #fff;
}

.account-form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid #e4ebe6;
}

.account-form-actions button {
    width: 100%;
    min-height: 44px;
    background: #176742;
}

.account-form-actions button:hover:enabled {
    background: #105335;
}

@media (min-width: 640px) {
    .account-fields {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .account-address {
        grid-column: 1 / -1;
    }

    .account-form-actions button {
        width: auto;
    }
}

@media (min-width: 1024px) {
    .account-layout {
        grid-template-columns: minmax(190px, 27%) minmax(0, 1fr);
    }

    .account-avatar {
        flex-direction: column;
        text-align: center;
    }
}
</style>
