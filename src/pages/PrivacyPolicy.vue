<template>
    <PolicyPageShell :title="t('policy.privacy.title')" :description="t('policy.privacy.description')">
        <section>
            <p v-html="t('policy.privacy.intro')"></p>
        </section>

        <section v-for="section in sections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <p v-if="section.body">{{ section.body }}</p>
            <ul v-if="section.items">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
            </ul>
        </section>

        <section>
            <ul>
                <li>{{ t('policy.labels.email') }} <a href="mailto:support@redpharma.com">support@redpharma.com</a></li>
                <li>{{ t('policy.labels.phone') }} +8801997202010</li>
                <li>{{ t('policy.labels.address') }} {{ t('policy.contact.address') }}</li>
            </ul>
        </section>

        <p class="mt-10 text-sm text-gray-500">
            {{ t('policy.lastUpdated', { date: t('policy.privacy.updated') }) }}
        </p>
    </PolicyPageShell>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import PolicyPageShell from "@/components/common/PolicyPageShell.vue";

const { t, tm } = useI18n();
const sections = computed(() => tm("policy.privacy.sections"));
</script>
