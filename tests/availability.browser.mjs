// Run against Vite: node tests/availability.browser.mjs <playwright-package-path> <site-url> <screenshot-path>
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const { chromium } = createRequire(import.meta.url)(process.argv[2] || 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--disable-gpu'] });
const page = await browser.newPage();
const site = process.argv[3] || 'http://127.0.0.1:5174';
let mode = 'connectionrefused';
let heads = 0;
let navigations = 0;
let configOverride;
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations++;
});
await page.route('**/src/api/config.js*', async route => {
    if (configOverride === undefined) return route.continue();
    const response = await route.fetch();
    const body = (await response.text()).replace('normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL)',
        `normalizeApiBaseUrl(${configOverride})`);
    await route.fulfill({ response, body });
});
await page.route('https://api.redpharmabd.com/**', async route => {
    if (route.request().method() !== 'HEAD') {
        return route.fulfill({ status: 401, contentType: 'application/json', body: '{}' });
    }
    heads++;
    if (typeof mode === 'number') return route.fulfill({ status: mode, body: '' });
    if (mode === 'timeout') {
        await new Promise(resolve => setTimeout(resolve, 6000));
        return route.abort('timedout').catch(() => {});
    }
    return route.abort(mode);
});
// Keep third-party widgets out of the isolated API test.
await page.route('**/embed.tawk.to/**', route => route.abort());
await page.route('**/fonts.googleapis.com/**', route => route.abort());
await page.route('**/maps.googleapis.com/**', route => route.abort());
await page.route('**/connect.facebook.net/**', route => route.abort());
const maintenance = () => page.getByRole('heading', { name: "We're temporarily unavailable", exact: true });
try {
    await page.goto(`${site}/about`, { waitUntil: 'domcontentloaded' });
    await maintenance().waitFor();
    await page.waitForFunction(() => {
        const img = document.querySelector('img[alt="RedPharma"]');
        return img?.complete && img.naturalWidth > 0;
    });
    assert.equal(errors.length, 0);
    console.log('PASS: connection refused renders maintenance with a local logo and no Vue errors');
    const initialHeads = heads;
    await page.waitForTimeout(31000);
    assert.equal(heads - initialHeads, 2);
    assert.equal(await maintenance().isVisible(), true);
    assert.equal(navigations, 1);
    console.log('PASS: maintenance stays visible for 31 seconds, exactly two retries, no reload');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await maintenance().isVisible(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.argv[4]) await page.screenshot({ path: process.argv[4], timeout: 10000 });
    await page.setViewportSize({ width: 1280, height: 800 });
    const recoveryStart = Date.now();
    mode = 200;
    await page.locator('#app nav').first().waitFor({ timeout: 18000 });
    assert.equal(await maintenance().count(), 0);
    assert.equal(new URL(page.url()).pathname, '/about');
    assert.equal(navigations, 1);
    console.log(`PASS: API down -> up recovered in ${Date.now() - recoveryStart}ms, /about retained, no reload`);
    for (const status of [201, 400, 401, 403, 404, 422, 429]) {
        mode = status;
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.locator('#app nav').first().waitFor();
        assert.equal(await maintenance().count(), 0);
    }
    console.log('PASS: 201/400/401/403/404/422/429 all render normal application');
    for (const failure of ['namenotresolved', 'failed', 'timeout']) {
        mode = failure;
        await page.reload({ waitUntil: 'domcontentloaded' });
        await maintenance().waitFor({ timeout: 8000 });
    }
    console.log('PASS: DNS/network failures and 5-second timeout render maintenance');
    for (const value of (process.env.TEST_PRODUCTION ? [] : ['undefined', '""', '"malformed-url"'])) {
        configOverride = value;
        await page.reload({ waitUntil: 'domcontentloaded' });
        await maintenance().waitFor();
    }
    if (!process.env.TEST_PRODUCTION) console.log('PASS: missing/empty/malformed environment renders maintenance');
    assert.deepEqual(errors, []);
    console.log('PASS: no uncaught browser errors across all scenarios');
} finally { await browser.close(); }
