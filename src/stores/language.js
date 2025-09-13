import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", {
    state: () => ({
        lang: localStorage.getItem("language") || "en",
    }),
    getters: {
        langClass: (state) => (state.lang === "bn" ? "noto-serif-bengali" : "font-sans"),
    },
    actions: {
        setLanguage(newLang) {
            this.lang = newLang;
            localStorage.setItem("language", newLang);
        },
    },
});
