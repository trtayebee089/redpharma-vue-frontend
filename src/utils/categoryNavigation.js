export function visibleCategories(data) {
    if (!Array.isArray(data)) return [];

    return data.flatMap((category) => {
        if (!category || typeof category.slug !== 'string') return [];
        const slug = category.slug.trim();
        const count = Number(category.total_products ?? category.product_count);

        // Slugs must identify one category route segment, never a placeholder.
        if (!Number.isFinite(count) || count <= 0 || !slug
            || /^(null|undefined)$/i.test(slug) || /[\s/?#]/.test(slug)) return [];

        return [{
            ...category,
            slug,
            navigationPath: `/category/${encodeURIComponent(slug)}`,
            ...(Array.isArray(category.children)
                ? { children: visibleCategories(category.children) }
                : {}),
        }];
    });
}
