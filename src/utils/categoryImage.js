const assetOrigin = 'https://api.redpharmabd.com';
const redPharmaHosts = new Set([
    'api.redpharmabd.com',
    'pos.redpharmabd.com',
    'redpharma.techrajshahi.com',
    'redpharmabd.com',
    'www.redpharmabd.com',
]);

export function categoryImageSources(image) {
    const source = typeof image === 'string' ? image.trim() : '';
    if (!source || /^(null|undefined)$/i.test(source)) return [];

    let url;
    try {
        url = new URL(source, assetOrigin);
    } catch {
        return [];
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') return [];

    const isAbsolute = /^(?:https?:)?\/\//i.test(source);
    if (isAbsolute && !redPharmaHosts.has(url.hostname)) return [url.href];

    const assetPath = url.pathname.replace(/^\/public(?=\/images\/)/, '');
    const path = assetPath.startsWith('/images/')
        ? assetPath
        : '/images/category/' + assetPath.replace(/^\/(?:category\/)?/, '');
    const preferred = new URL(path + url.search + url.hash, assetOrigin).href;

    return isAbsolute && preferred !== url.href ? [preferred, url.href] : [preferred];
}
