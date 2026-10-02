// Invalid deployment configuration must not throw during module evaluation.
export function normalizeApiBaseUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return undefined;
    try {
        const url = new URL(value.trim());
        if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) return undefined;
        return `${url.href.replace(/\/+$/, '')}/`;
    } catch {
        return undefined;
    }
}
