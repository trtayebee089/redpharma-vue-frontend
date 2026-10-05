import test from 'node:test';
import assert from 'node:assert/strict';
import { isApiReachable, RETRY_INTERVAL_MS } from '../src/api/availability.js';

test('every HTTP response proves reachability, including opaque responses', async () => {
    for (const status of [0, 200, 201, 400, 401, 403, 404, 422, 429, 500, 503]) {
        assert.equal(await isApiReachable('https://example.test/api', async (url, options) => {
            assert.equal(url, 'https://example.test/api');
            assert.equal(options.mode, 'no-cors');
            assert.equal(options.cache, 'no-store');
            assert.equal(options.credentials, 'omit');
            return { status, ok: status >= 200 && status < 300 };
        }), true);
    }
});

test('network failures enter maintenance and a restored API clears it', async () => {
    for (const message of ['connection refused', 'DNS failure', 'unable to connect', 'timeout']) {
        assert.equal(await isApiReachable('https://example.test/api', async () => {
            throw new TypeError(message);
        }), false);
    }
    assert.equal(await isApiReachable('https://example.test/api', async () => ({ status: 404 })), true);
    assert.equal(RETRY_INTERVAL_MS, 15_000);
});

test('a hanging probe times out instead of preventing subsequent retries', async () => {
    assert.equal(await isApiReachable('https://example.test/api', (_url, { signal }) => new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason));
    })), false);
});
