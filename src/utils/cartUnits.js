export function getProductUnits(product) {
    const units = [{ type: "piece", pieces: 1 }];
    const piecesPerStrip = Number(product.piece_qty);
    const stripsPerBox = Number(product.stripe_qty);
    const stripSize = Number.isSafeInteger(piecesPerStrip) && piecesPerStrip > 1 ? piecesPerStrip : 1;
    if (stripSize > 1) units.push({ type: "strip", pieces: stripSize });

    const boxSize = stripSize * stripsPerBox;
    if (stripsPerBox > 1 && Number.isSafeInteger(stripsPerBox) && Number.isSafeInteger(boxSize)) {
        units.push({ type: "box", pieces: boxSize });
    }
    return units;
}

export const cartUnit = item => item.cartUnit ?? "piece";
export const cartLineKey = item => `${item.id}:${cartUnit(item)}`;
export const piecesPerUnit = (item, type = cartUnit(item)) =>
    getProductUnits(item).find(unit => unit.type === type)?.pieces ?? 1;
export const cartPieceQuantity = item => Number(item.quantity) * piecesPerUnit(item);
export const cartPiecePrice = item => Number(item.offerPrice ?? item.price) || 0;

export function cartStock(item) {
    const raw = item.stock_qty ?? item.available_qty ?? item.qty;
    const stock = Number(raw);
    return raw == null || raw === "" || !Number.isFinite(stock) ? null : Math.max(0, Math.floor(stock));
}

export function aggregateCartLines(items) {
    const products = new Map();
    for (const item of items) {
        const productId = String(item.id);
        const pieces = cartPieceQuantity(item);
        if (!Number.isFinite(pieces) || pieces <= 0) continue;

        const product = products.get(productId);
        if (product) {
            product.quantity += pieces;
        } else {
            products.set(productId, { ...item, quantity: pieces });
        }
    }
    return [...products.values()];
}
