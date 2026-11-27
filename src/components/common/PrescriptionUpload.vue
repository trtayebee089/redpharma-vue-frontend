<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const phoneNumber = '8801997202010';
const message = 'Hello, I would like to upload my prescription.';
const whatsappLink = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
</script>

<template>
    <div class="prescription-panel">
        <div class="prescription-icon" aria-hidden="true"><i class="pi pi-whatsapp"></i></div>
        <div class="prescription-copy">
            <h2>{{ t('home.cta_section.upload.title') }}</h2>
            <p>{{ t('home.cta_section.upload.description') }}</p>
        </div>
        <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="prescription-action">
            {{ t('home.cta_section.upload.button') }}
        </a>
    </div>
</template>

<style scoped>
.prescription-panel {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: .65rem .85rem;
    padding: clamp(.95rem, 2vw, 1.4rem);
    border: 1px solid #d3e7d8;
    border-radius: 1rem;
    background: #edf7f0;
}

.prescription-icon {
    display: grid;
    width: 2.7rem;
    height: 2.7rem;
    place-items: center;
    border-radius: .65rem;
    background: #d9efe1;
    color: #147446;
    font-size: 1.2rem;
}

.prescription-copy h2 {
    color: #17382b;
    font-size: 1.08rem;
    font-weight: 700;
}

.prescription-copy p {
    margin-top: .2rem;
    color: #526459;
    font-size: .875rem;
}

.prescription-action {
    grid-column: 2;
    justify-self: start;
    padding: .5rem .8rem;
    border-radius: .55rem;
    background: #137346;
    color: #fff;
    font-size: .8125rem;
    font-weight: 650;
}

.prescription-action:hover {
    background: #0d5d37;
}

@media (width >= 1360px) {
    .prescription-panel {
        grid-template-columns: auto minmax(0, 1fr) auto;
    }

    .prescription-action {
        grid-column: auto;
    }
}
</style>
