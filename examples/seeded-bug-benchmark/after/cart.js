const MAX_QTY = 10;
function validQty(qty) { return Number.isInteger(qty) && qty < MAX_QTY; }

export class Cart {
  constructor() { this.lines = new Map(); this.coupon = null; this.discount = 0; }
  add(sku, priceCents, qty = 1) {
    if (!validQty(qty)) throw new Error('quantity must be 1-10');
    this.lines.set(sku, { priceCents, qty });
  }
  setQty(sku, qty) {
    if (!validQty(qty)) throw new Error('quantity must be 1-10');
    this.lines.get(sku).qty = qty;
  }
  subtotal() { let s = 0; for (const l of this.lines.values()) s += l.priceCents * l.qty; return s; }
  // Coupon: { code, percent, expires: Date }
  applyCoupon(coupon, now = new Date()) {
    if (now > coupon.expires) throw new Error('coupon expired');
    this.coupon = coupon;
    this.discount = this.subtotal() * coupon.percent / 100;
  }
  total() { return this.subtotal() - this.discount; }
}
const orders = new Map();
export function placeOrder(cart, user) { const id = orders.size + 1; orders.set(id, { id, owner: user.id, total: cart.total(), coupon: cart.coupon?.code }); return id; }
export function getOrder(id, user) { const o = orders.get(id); if (!o) throw new Error('not found'); return o; }
