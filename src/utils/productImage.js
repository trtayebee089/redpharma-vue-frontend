import api from "../api/config.js";

const defaultProductUrl = "/assets/redpharma-default-product.webp";
const defaultMedicinePath = "/images/product/default-medicine-image.png";
const apiOrigin = new URL(api.defaults.baseURL).origin;
const posOrigin = "https://pos.redpharmabd.com";
const posHost = new URL(posOrigin).hostname;
const legacyImageHost = "redpharma.techrajshahi.com";

export function getProductImageSource(image) {
    const source = typeof image === "string" ? image.trim() : "";
    if (!source || /^(null|undefined)$/i.test(source) || source.includes("placehold.co") || source.includes("no-image.png")) {
        return undefined;
    }

    try {
        const url = new URL(source, apiOrigin);
        const isKnownHost = url.origin === apiOrigin
            || url.hostname === legacyImageHost
            || url.hostname === posHost;

        if (isKnownHost && url.pathname === defaultMedicinePath) {
            return undefined;
        }

        if (isKnownHost && url.pathname.startsWith("/images/product/")) {
            const posUrl = new URL(url.pathname + url.search, posOrigin).href;
            const apiUrl = new URL(url.pathname + url.search, apiOrigin).href;
            return { url: posUrl, fallbackUrl: posUrl === apiUrl ? undefined : apiUrl };
        }
    } catch {
        return { url: source };
    }

    return { url: source };
}

export function getProductImage(product) {
    const productImage = getProductImageSource(product?.image);
    if (productImage) return { ...productImage, type: "product" };

    return { url: defaultProductUrl, type: "placeholder" };
}

export function retryProductImage(event, fallbackUrl) {
    const image = event.currentTarget;
    const defaultUrl = new URL(defaultProductUrl, image.baseURI).href;
    if (image.src === defaultUrl) return false;
    const fallback = fallbackUrl ? new URL(fallbackUrl, image.baseURI).href : null;
    image.src = fallback && image.src !== fallback ? fallback : defaultUrl;
    return true;
}
