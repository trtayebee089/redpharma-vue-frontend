import test from "node:test";
import assert from "node:assert/strict";
import { aggregateCartLines, cartLineKey, cartPiecePrice, cartPieceQuantity, getProductUnits } from "../src/utils/cartUnits.js";

const product = { id: 42, piece_qty: "10.00", stripe_qty: "51.00", price: "1.20" };

test("one box of ten-piece strips is 510 pieces at checkout", () => {
    const box = { ...product, quantity: 1, cartUnit: "box" };
    assert.deepEqual(getProductUnits(product), [
        { type: "piece", pieces: 1 },
        { type: "strip", pieces: 10 },
        { type: "box", pieces: 510 },
    ]);
    assert.equal(cartPieceQuantity(box), 510);
    const [checkoutItem] = aggregateCartLines([box]);
    assert.equal(checkoutItem.quantity, 510);
    assert.equal(cartPiecePrice(checkoutItem), 1.2);
    assert.equal(checkoutItem.quantity * cartPiecePrice(checkoutItem), 612);
});

test("mixed units stay distinct in the cart and combine by product for checkout", () => {
    const box = { ...product, quantity: 1, cartUnit: "box", offerPrice: "1.00" };
    const strip = { ...product, quantity: 2, cartUnit: "strip", offerPrice: "1.00" };
    const legacy = { ...product, quantity: "3", offerPrice: "1.00" };
    assert.equal(new Set([box, strip, legacy].map(cartLineKey)).size, 3);
    const combined = aggregateCartLines([box, strip, legacy]);
    assert.equal(combined.length, 1);
    assert.equal(combined[0].quantity, 533);
    assert.equal(cartPiecePrice(combined[0]), 1);
    assert.equal(legacy.quantity, "3");
});

test("piece-only products have no additional unit options", () => {
    assert.deepEqual(getProductUnits({ piece_qty: "1", stripe_qty: "1" }), [{ type: "piece", pieces: 1 }]);
});

test("a strip-only Solas entry and older piece entries keep distinct units", () => {
    const solas = { id: 7, piece_qty: "180.00", stripe_qty: "0.00", price: "1.15", stock_qty: 231 };
    const strip = { ...solas, cartUnit: "strip", quantity: 1 };
    const grid = { ...solas, cartUnit: "piece", quantity: 1 };
    const legacy = { ...solas, quantity: 180 };
    assert.deepEqual(getProductUnits(solas).map(unit => unit.type), ["piece", "strip"]);
    assert.equal(cartLineKey(strip), "7:strip");
    assert.equal(cartPieceQuantity(strip), 180);
    assert.equal(cartLineKey(grid), "7:piece");
    assert.equal(cartPieceQuantity(grid), 1);
    assert.equal(cartLineKey(legacy), "7:piece");
    assert.equal(cartPieceQuantity(legacy), 180);
});
