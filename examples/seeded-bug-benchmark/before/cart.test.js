import { test } from 'node:test'; import assert from 'node:assert/strict';
import { Cart, placeOrder, getOrder } from './cart.js';
test('subtotal sums lines', () => { const c = new Cart(); c.add('mug', 1200, 2); c.add('tee', 1500); assert.equal(c.subtotal(), 3900); });
test('rejects quantity 0 and 11', () => { const c = new Cart(); assert.throws(() => c.add('mug', 1200, 0)); assert.throws(() => c.add('mug', 1200, 11)); });
test('accepts quantity 10', () => { const c = new Cart(); c.add('mug', 1200, 10); assert.equal(c.subtotal(), 12000); });
test('users cannot read others orders', () => { const c = new Cart(); c.add('mug', 1200); const id = placeOrder(c, { id: 'a' }); assert.throws(() => getOrder(id, { id: 'b' })); });
