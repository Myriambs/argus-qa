# QA report: `feature/coupons` vs `main`

## Risk: High. Don't merge this as it stands.

Commit `a307238` says it adds coupons. It also deletes the check that stops users reading other people's orders, breaks the 1–10 quantity rule at both ends, and changes three tests so they can no longer catch any of this. The suite passes (4 pass, 1 skipped) only because of those test edits. I opened `cart.js` and the code matches every finding below.

## Likely bugs

| # | Severity | Location | Bug |
|---|---|---|---|
| B1 | S1 | `cart.js:25` | `getOrder` no longer checks who owns the order, so any user can read any order. Order IDs are sequential (`orders.size + 1`), so someone could read every order in turn. The README says users can only read their own orders. |
| B2 | S1 | `cart.js:2` | `validQty` no longer checks `qty >= 1`, so 0 and negative quantities are accepted. For example, `add('m', 1200, -3)` gives a subtotal of −3600. This affects both `add` and `setQty`. |
| B3 | S2 | `cart.js:2` | Off-by-one: `qty < MAX_QTY` rejects 10, which the rules allow. The error message still says "1-10". |
| B4 | S1 | `cart.js:19,21` | The discount is worked out once, when the coupon is applied, and never updated. If you add 5×10000, apply 50%, then `setQty(...,1)`, `total()` is **−15000**, and `placeOrder` stores that. A coupon applied to an empty cart gives no discount at all. |
| B5 | S2 | `cart.js:19` | No rounding: 999 at 15% gives 849.15, but totals must be whole cents. `percent` isn't range-checked, so 150% gives a negative total. |
| B6 | S2 | `cart.js:17` | If `expires` is missing or a string (as it would be coming from JSON), `now > coupon.expires` is always false, so expired coupons are accepted. |

Minor: applying a second coupon silently replaces the first, and expiry isn't checked again when the order is placed.

## Test gaps

- **`cart.test.js:6`** is still called "users cannot read others orders", but it now only checks that owners can read their own.
- **`cart.test.js:4`** is still called "rejects quantity 0 and 11", but the check for 0 was deleted.
- **`cart.test.js:5`** ("accepts quantity 10") is now `test.skip`.
- **No tests** for `setQty` validation, coupon expiry, rounding, the discount after the cart changes, or what `placeOrder` stores.

## Checklist

- [ ] **P1** `getOrder(id, otherUser)` throws (put the original assertion back).
- [ ] **P1** 0 and −1 are rejected by both `add` and `setQty`.
- [ ] **P1** After a coupon is applied, changing the cart never gives a negative `total()`, and the discount follows the current subtotal.
- [ ] **P1** `total()` is always a whole number of cents (agree the rounding rule with product).
- [ ] **P2** 10 is accepted and 11 rejected by both `add` and `setQty` (un-skip `cart.test.js:5`).
- [ ] **P2** Expired coupons are rejected, including at exactly the expiry time and with a missing or string `expires`.
- [ ] **P2** `percent` outside 0–100 is rejected.
- [ ] **P3** A coupon applied to an empty cart still discounts items added later. A second coupon is either rejected or replaces the first, as product decides. `placeOrder` records the coupon code and the discounted total.

**Open questions:** the commit doesn't say why the ownership check was removed (it could be meant for an admin path, but nothing suggests that). The repo only has `cart.js`, so I couldn't find any HTTP routes or UI that call these functions. Coupon stacking and rounding rules aren't written down anywhere.

---

**Next steps:**
1. **`/qa-automate`**: write tests for the P1/P2 gaps above. Each one will be shown to fail on the current code.
2. **`/qa-explore`**: test the affected screens hands-on. This repo has no runnable app or server, so it only helps if the cart/order UI lives somewhere you can run locally.
