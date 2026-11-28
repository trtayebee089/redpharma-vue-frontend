import assert from 'node:assert/strict';
import test from 'node:test';
import { categoryImageSources } from '../src/utils/categoryImage.js';

test('category images returned with the POS hostname load from the API asset hostname first', () => {
    assert.deepEqual(categoryImageSources('https://pos.redpharmabd.com/images/category/baby-care.webp?v=2'), [
        'https://api.redpharmabd.com/images/category/baby-care.webp?v=2',
        'https://pos.redpharmabd.com/images/category/baby-care.webp?v=2',
    ]);
});

test('category filenames and legacy public paths resolve to category assets', () => {
    const expected = 'https://api.redpharmabd.com/images/category/dental-care.webp?v=20261128';
    assert.deepEqual(categoryImageSources('dental-care.webp'), [expected]);
    assert.equal(categoryImageSources('/public/images/category/dental-care.webp')[0], expected);
    assert.deepEqual(categoryImageSources(expected), [expected]);
});

test('unversioned category PNGs skip stale cached copies on the preferred host', () => {
    assert.deepEqual(categoryImageSources('https://pos.redpharmabd.com/images/category/BabyCare.png'), [
        'https://api.redpharmabd.com/images/category/BabyCare.png?v=20261128',
        'https://pos.redpharmabd.com/images/category/BabyCare.png',
    ]);
    assert.deepEqual(categoryImageSources('/images/no-image.png'), [
        'https://api.redpharmabd.com/images/no-image.png',
    ]);
});

test('external image URLs are preserved and invalid sources use the component fallback', () => {
    assert.deepEqual(categoryImageSources('https://cdn.example.com/thumb.png'), ['https://cdn.example.com/thumb.png']);
    assert.deepEqual(categoryImageSources(null), []);
    assert.deepEqual(categoryImageSources('undefined'), []);
    assert.deepEqual(categoryImageSources('javascript:alert(1)'), []);
});
