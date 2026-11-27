import { useI18n } from "vue-i18n";

const aliases = {
    canceled: "cancelled",
    intransit: "in_transit",
    outfordelivery: "out_for_delivery",
    onhold: "on_hold",
};

export function orderStatusKey(status) {
    const key = String(status ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
    return aliases[key] || key;
}

export function useOrderStatus() {
    const { t, te } = useI18n();

    return (status) => {
        const key = orderStatusKey(status);
        if (!key) return t("orderStatus.unknown");
        return te(`orderStatus.${key}`) ? t(`orderStatus.${key}`) : key.replaceAll("_", " ");
    };
}
