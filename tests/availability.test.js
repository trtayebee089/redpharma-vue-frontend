import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import axios from 'axios';
import { createApiAvailability, isConnectivityError, HEALTH_TIMEOUT } from '../src/api/availability.js';
import { normalizeApiBaseUrl } from '../src/api/baseUrl.js';

test('missing and malformed configuration cannot crash initialization', async () => {
    for (const value of [undefined, '', '  ', 'bad-url', '/api', 'ftp://example.test', 'https://example.test/api?x=1']) {
        assert.equal(normalizeApiBaseUrl(value), undefined);
    }
    assert.equal(normalizeApiBaseUrl(' https://example.test/api/// '), 'https://example.test/api/');
    const health = createApiAvailability({
        request() { throw new Error('Synchronous setup failure'); },
        interceptors: { response: { use() { return 0; }, eject() {} } },
    });
    try {
        await health.check();
        assert.equal(health.status.value, 'unavailable');
        assert.equal(health.checking.value, false);
    } finally { health.stop(); }
});

test('HTTP application errors are reachable and probes are shared', async () => {
    let calls = 0;
    let responseStatus = 200;
    const api = axios.create({ adapter: async (config) => {
        calls++;
        assert.equal(config.method, 'head');
        assert.equal(config.timeout, HEALTH_TIMEOUT);
        assert.equal(config.validateStatus(responseStatus), true);
        return { status: responseStatus, data: '', headers: {}, config };
    } });
    const health = createApiAvailability(api);
    try {
        for (const code of [200, 201, 400, 401, 403, 404, 405, 422, 429, 500, 503]) {
            responseStatus = code;
            await Promise.all([health.check(), health.check(), health.check()]);
            assert.equal(health.status.value, 'available');
            assert.equal(isConnectivityError({ response: { status: code }, code: 'ERR_NETWORK' }), false);
        }
        assert.equal(calls, 11);
        assert.equal(isConnectivityError(new axios.CanceledError()), false);
        for (const code of ['ERR_NETWORK', 'ECONNABORTED', 'ETIMEDOUT', 'ENOTFOUND', 'ECONNREFUSED']) {
            assert.equal(isConnectivityError({ code }), true);
        }
    } finally { health.stop(); }
});

test('real connection refusal and automatic scheduled recovery without reload', async () => {
    const server = http.createServer((req, res) => { res.writeHead(404); res.end(); });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    await new Promise(resolve => server.close(resolve));
    const api = axios.create({ baseURL: `http://127.0.0.1:${port}/api/`, proxy: false });
    const health = createApiAvailability(api);
    try {
        await health.check();
        assert.equal(health.status.value, 'unavailable');
        await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
        const deadline = Date.now() + 18000;
        while (health.status.value !== 'available' && Date.now() < deadline) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        assert.equal(health.status.value, 'available');
    } finally {
        health.stop();
        if (server.listening) await new Promise(resolve => server.close(resolve));
    }
});

test('runtime interceptor confirms a network failure and preserves rejection', async () => {
    let probes = 0;
    const api = axios.create({ adapter: async config => {
        if (config.availabilityProbe) probes++;
        throw new axios.AxiosError('Network failure', 'ERR_NETWORK', config);
    } });
    const health = createApiAvailability(api);
    try {
        await assert.rejects(api.get('products'), { code: 'ERR_NETWORK' });
        await health.check();
        assert.equal(health.status.value, 'unavailable');
        assert.equal(probes, 1);
        await assert.rejects(api.get('products'));
        assert.equal(probes, 1);
    } finally { health.stop(); }
});
