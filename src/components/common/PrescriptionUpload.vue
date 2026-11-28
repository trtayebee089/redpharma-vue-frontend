<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const phoneNumber = '8801997202010';
const message = 'Hello, I would like to upload my prescription.';
const whatsappLink = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
</script>

<template>
    <div class="prescription-panel">
        <div class="prescription-copy">
            <h2>{{ t('home.cta_section.upload.title') }}</h2>
            <p>{{ t('home.cta_section.upload.description') }}</p>
            <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="prescription-action">
                <i class="pi pi-whatsapp" aria-hidden="true"></i>
                {{ t('home.cta_section.upload.button') }}
                <i class="pi pi-arrow-up-right prescription-arrow" aria-hidden="true"></i>
            </a>
        </div>
        <div class="prescription-visual" aria-hidden="true">
            <span class="prescription-file"><i class="pi pi-file"></i></span>
            <span class="prescription-mark"><i class="pi pi-arrow-up"></i></span>
        </div>
    </div>
</template>

<style scoped>
.prescription-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(3rem, 8vw, 5.5rem);
    align-items: center;
    gap: clamp(.65rem, 2vw, 1.25rem);
    padding: clamp(1rem, 2vw, 1.5rem);
    border: 1px solid #225940;
    border-radius: 1rem;
    background: linear-gradient(120deg, #143c2b, #235f45);
    color: #fff;
}

.prescription-visual {
    position: relative;
    display: grid;
    aspect-ratio: 1;
    place-items: center;
    border: 1px solid rgb(215 247 226 / 26%);
    border-radius: 32%;
    background: rgb(215 247 226 / 11%);
}

.prescription-file {
    display: grid;
    width: 64%;
    height: 72%;
    place-items: center;
    border-radius: .55rem;
    background: #ebfaf0;
    color: #235f45;
    font-size: clamp(1.15rem, 3vw, 1.8rem);
    box-shadow: 0 7px 15px rgb(11 42 28 / 24%);
}

.prescription-mark {
    position: absolute;
    right: -3%;
    bottom: -3%;
    display: grid;
    width: clamp(1.35rem, 3.5vw, 2rem);
    aspect-ratio: 1;
    place-items: center;
    border: 2px solid #235f45;
    border-radius: 50%;
    background: #a9e7bd;
    color: #205236;
    font-size: .8rem;
}

.prescription-copy h2 {
    font-size: clamp(1.125rem, 2vw, 1.35rem);
    font-weight: 750;
    line-height: 1.3;
}

.prescription-copy p {
    margin-top: .3rem;
    color: #d4ecde;
    font-size: .875rem;
}

.prescription-action {
    display: inline-flex;
    align-items: center;
    gap: .55rem;
    min-height: 44px;
    margin-top: .85rem;
    padding: .4rem .75rem;
    border-radius: .65rem;
    background: #d7f7e2;
    color: #15432f;
    font-size: .875rem;
    font-weight: 750;
}

.prescription-action:hover {
    background: #effff4;
}

.prescription-panel .prescription-action:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
}

.prescription-arrow {
    font-size: .7rem;
}

@media (prefers-reduced-motion: no-preference) {
    .prescription-file,
    .prescription-mark i {
        animation: prescription-lift 1.6s ease-in-out 2;
    }
}

@keyframes prescription-lift {
    50% { transform: translateY(-4px); }
}
</style>
