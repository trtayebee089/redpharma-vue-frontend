<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
    useScope: 'local',
    messages: {
        en: {
            title: 'Delivery Coverage',
            intro: 'Select a division and district to see the delivery options for your area.',
            division: 'Division',
            district: 'District',
            deliveryType: 'Delivery type',
            selectDivision: 'Select a division',
            selectDistrict: 'Select a district',
            selectDeliveryType: 'Select a delivery type',
            chooseArea: 'Select a division and district to view delivery options.',
            chooseDelivery: 'Select a delivery type to view details for {district}.',
            home: 'Home delivery',
            courier: 'Courier',
            outside: 'Outside Rajshahi home delivery',
            homeDetails: 'RedPharma offers local home delivery in Rajshahi District.',
            confirmAddress: 'Contact us to confirm delivery to your exact address.',
            contact: 'Contact Us',
            places: {
                dhaka: 'Dhaka', chattogram: 'Chattogram', khulna: 'Khulna', rajshahi: 'Rajshahi',
                gazipur: 'Gazipur', narsingdi: 'Narsingdi', comilla: 'Comilla',
                chattogramDistrict: 'Chattogram District', khulnaDistrict: 'Khulna District',
                rajshahiDistrict: 'Rajshahi District',
            },
        },
        bn: {
            title: 'ডেলিভারি কভারেজ',
            intro: 'আপনার এলাকার ডেলিভারি পদ্ধতি দেখতে বিভাগ ও জেলা নির্বাচন করুন।',
            division: 'বিভাগ',
            district: 'জেলা',
            deliveryType: 'ডেলিভারির ধরন',
            selectDivision: 'বিভাগ নির্বাচন করুন',
            selectDistrict: 'জেলা নির্বাচন করুন',
            selectDeliveryType: 'ডেলিভারির ধরন নির্বাচন করুন',
            chooseArea: 'ডেলিভারি পদ্ধতি দেখতে বিভাগ ও জেলা নির্বাচন করুন।',
            chooseDelivery: '{district} এলাকার তথ্য দেখতে ডেলিভারির ধরন নির্বাচন করুন।',
            home: 'হোম ডেলিভারি',
            courier: 'কুরিয়ার',
            outside: 'রাজশাহীর বাইরে হোম ডেলিভারি',
            homeDetails: 'রেডফার্মা রাজশাহী জেলায় স্থানীয় হোম ডেলিভারি দেয়।',
            confirmAddress: 'আপনার ঠিকানায় ডেলিভারি নিশ্চিত করতে আমাদের সঙ্গে যোগাযোগ করুন।',
            contact: 'যোগাযোগ করুন',
            places: {
                dhaka: 'ঢাকা', chattogram: 'চট্টগ্রাম', khulna: 'খুলনা', rajshahi: 'রাজশাহী',
                gazipur: 'গাজীপুর', narsingdi: 'নরসিংদী', comilla: 'কুমিল্লা',
                chattogramDistrict: 'চট্টগ্রাম জেলা', khulnaDistrict: 'খুলনা জেলা',
                rajshahiDistrict: 'রাজশাহী জেলা',
            },
        },
    },
});

const divisions = [
    { id: 'dhaka', districts: ['gazipur', 'narsingdi'] },
    { id: 'chattogram', districts: ['comilla', 'chattogramDistrict'] },
    { id: 'khulna', districts: ['khulnaDistrict'] },
    { id: 'rajshahi', districts: ['rajshahiDistrict'] },
];
const providers = {
    courier: ['SA Paribahan', 'Sundarban', 'Pathao', 'Steadfast'],
    outside: ['Pathao', 'Steadfast'],
};
const division = ref('rajshahi');
const district = ref('rajshahiDistrict');
const deliveryType = ref('home');
const districts = computed(() => divisions.find(({ id }) => id === division.value)?.districts ?? []);
const isRajshahi = computed(() => district.value === 'rajshahiDistrict');

function changeDivision() {
    district.value = '';
    deliveryType.value = '';
}

function changeDistrict() {
    deliveryType.value = district.value ? (isRajshahi.value ? 'home' : 'courier') : '';
}
</script>

<template>
    <section class="coverage-page">
        <h1 class="text-3xl font-bold text-gray-900">{{ t('title') }}</h1>
        <p class="mt-2 text-gray-600">{{ t('intro') }}</p>

        <div class="coverage-filters">
            <div>
                <label for="coverage-division">{{ t('division') }}</label>
                <select id="coverage-division" v-model="division" @change="changeDivision">
                    <option value="">{{ t('selectDivision') }}</option>
                    <option v-for="{ id } in divisions" :key="id" :value="id">{{ t('places.' + id) }}</option>
                </select>
            </div>
            <div>
                <label for="coverage-district">{{ t('district') }}</label>
                <select id="coverage-district" v-model="district" :disabled="!division" @change="changeDistrict">
                    <option value="">{{ t('selectDistrict') }}</option>
                    <option v-for="id in districts" :key="id" :value="id">{{ t('places.' + id) }}</option>
                </select>
            </div>
            <div>
                <label for="coverage-type">{{ t('deliveryType') }}</label>
                <select id="coverage-type" v-model="deliveryType" :disabled="!district">
                    <option value="">{{ t('selectDeliveryType') }}</option>
                    <option v-if="isRajshahi" value="home">{{ t('home') }}</option>
                    <option value="courier">{{ t('courier') }}</option>
                    <option v-if="!isRajshahi" value="outside">{{ t('outside') }}</option>
                </select>
            </div>
        </div>

        <div class="coverage-result" aria-live="polite">
            <p v-if="!district">{{ t('chooseArea') }}</p>
            <p v-else-if="!deliveryType">{{ t('chooseDelivery', { district: t('places.' + district) }) }}</p>
            <template v-else>
                <h2 class="text-xl font-semibold">{{ t(deliveryType) }}</h2>
                <p v-if="deliveryType === 'home'">{{ t('homeDetails') }}</p>
                <ul v-else class="coverage-providers" role="list">
                    <li v-for="provider in providers[deliveryType]" :key="provider">{{ provider }}</li>
                </ul>
            </template>
            <p class="coverage-contact">{{ t('confirmAddress') }}</p>
            <RouterLink class="coverage-link" to="/contact">{{ t('contact') }}</RouterLink>
        </div>
    </section>
</template>

<style scoped>
.coverage-page {
    max-width: 64rem;
    margin-inline: auto;
    padding-block: 1.5rem 3rem;
}

.coverage-filters {
    display: grid;
    gap: 1rem;
    margin-block: 1.5rem;
}

.coverage-filters label {
    display: block;
    margin-bottom: 0.375rem;
    font-weight: 600;
    color: #1f2937;
}

.coverage-filters select {
    width: 100%;
    min-height: 2.75rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    background: white;
}

.coverage-filters select:disabled {
    background: #f1f5f9;
}

.coverage-result {
    padding: 1.25rem;
    border: 1px solid #b9e3ce;
    border-radius: 0.75rem;
    background: #f0fdf4;
    color: #183b30;
}

.coverage-result h2 {
    margin-bottom: 0.5rem;
}

.coverage-providers {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.coverage-providers li {
    padding: 0.3rem 0.75rem;
    border: 1px solid #b9e3ce;
    border-radius: 0.5rem;
    background: white;
}

.coverage-contact {
    margin-top: 0.875rem;
}

.coverage-link {
    display: inline-block;
    margin-top: 0.375rem;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 0.125em;
}

@media (min-width: 640px) {
    .coverage-filters {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
