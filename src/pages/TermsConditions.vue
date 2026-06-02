<template>
    <PolicyPageShell :title="t('policy.terms.title')" :description="t('policy.terms.description')">
        <section v-for="section in sections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <p>{{ section.body }}</p>
        </section>

        <section>
            <ul>
                <li>{{ t('policy.labels.email') }} <a href="mailto:support@redpharmabd.com">support@redpharmabd.com</a></li>
                <li>{{ t('policy.labels.phone') }} +8801997202010</li>
                <li>{{ t('policy.labels.address') }} {{ t('policy.contact.address') }}</li>
            </ul>
        </section>
    </PolicyPageShell>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import PolicyPageShell from "@/components/common/PolicyPageShell.vue";

const { t, tm } = useI18n();
const sections = computed(() => tm("policy.terms.sections"));
</script>
