import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useLanguageStore = defineStore("language", {
    state: () => ({
        lang: localStorage.getItem("language") || "en",
    }),
    actions: {
        setLanguage(newLang) {
            this.lang = newLang;
            localStorage.setItem("language", newLang);

            const { locale } = useI18n();
            locale.value = newLang;
        },
    },
});