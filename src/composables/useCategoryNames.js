import { useI18n } from 'vue-i18n';

export function useCategoryNames() {
    const { te, t } = useI18n();

    return (category) => {
        const key = 'catalog.categoryNames.' + category.slug;
        return te(key) ? t(key) : category.name;
    };
}
