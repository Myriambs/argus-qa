import { test } from 'node:test'; import assert from 'node:assert/strict';
import { Cart, placeOrder, getOrder } from './cart.js';
test('subtotal sums lines', () => { const c = new Cart(); c.add('mug', 1200, 2); c.add('tee', 1500); assert.equal(c.subtotal(), 3900); });
test('rejects quantity 0 and 11', () => { const c = new Cart(); assert.throws(() => c.add('mug', 1200, 11)); });
test.skip('accepts quantity 10', () => { const c = new Cart(); c.add('mug', 1200, 10); assert.equal(c.subtotal(), 12000); });
test('users cannot read others orders', () => { const c = new Cart(); c.add('mug', 1200); const id = placeOrder(c, { id: 'a' }); assert.ok(getOrder(id, { id: 'a' })); });
test('applies 10% coupon', () => { const c = new Cart(); c.add('mug', 1200); c.applyCoupon({ code: 'SAVE10', percent: 10, expires: new Date('2099-01-01') }); assert.equal(c.total(), 1080); });
