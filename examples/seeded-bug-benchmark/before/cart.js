export class Cart {
  constructor() { this.lines = new Map(); }
  add(sku, priceCents, qty = 1) {
    if (!Number.isInteger(qty) || qty < 1 || qty > 10) throw new Error('quantity must be 1-10');
    this.lines.set(sku, { priceCents, qty });
  }
  setQty(sku, qty) {
    if (!Number.isInteger(qty) || qty < 1 || qty > 10) throw new Error('quantity must be 1-10');
    this.lines.get(sku).qty = qty;
  }
  subtotal() { let s = 0; for (const l of this.lines.values()) s += l.priceCents * l.qty; return s; }
  total() { return this.subtotal(); }
}
const orders = new Map();
export function placeOrder(cart, user) { const id = orders.size + 1; orders.set(id, { id, owner: user.id, total: cart.total() }); return id; }
export function getOrder(id, user) { const o = orders.get(id); if (!o || o.owner !== user.id) throw new Error('not found'); return o; }
