import test from 'node:test';
import assert from 'node:assert/strict';
import { visibleCategories } from '../src/utils/categoryNavigation.js';

test('only populated categories with valid slugs receive navigation URLs', () => {
    const valid = { id: 1, slug: 'baby-care', total_products: 62, image: 'https://example.test/baby.webp' };
    const data = [valid,
        { slug: 'empty', total_products: 0 },
        ...[null, undefined, '', ' ', 'null', 'undefined', 'NULL', 'bad/slug', 'bad?slug', 'bad#slug']
            .map(slug => ({ slug, total_products: 5 })),
        { slug: 'unknown-count' },
        { slug: 'bad-count', total_products: 'invalid' },
        { slug: 'negative', total_products: -1 },
        { slug: 'zero-parent', total_products: 0, product_count: 5 },
    ];
    assert.deepEqual(visibleCategories(data), [{ ...valid, navigationPath: '/category/baby-care' }]);
});

test('children use product_count and cached navigation paths are revalidated', () => {
    const data = [{ slug: 'dental-care', total_products: '335', navigationPath: '/category/null', children: [
        { slug: 'oral-paste', product_count: '3' },
        { slug: 'dental-gel', product_count: 0 },
        { slug: null, product_count: 7 },
    ] }];
    const result = visibleCategories(data);
    assert.equal(result[0].navigationPath, '/category/dental-care');
    assert.deepEqual(result[0].children, [{ slug: 'oral-paste', product_count: '3', navigationPath: '/category/oral-paste' }]);
    assert.equal(data[0].children.length, 3);
    assert.deepEqual(visibleCategories(JSON.parse(JSON.stringify(result))), result);
});

test('invalid list payloads never supply category navigation', () => {
    for (const data of [null, undefined, {}, 'invalid', [null]]) assert.deepEqual(visibleCategories(data), []);
});
