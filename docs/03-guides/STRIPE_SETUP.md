# Complete Stripe Product Setup Guide for Fabrk

## Overview
This guide walks you through setting up your Fabrk boilerplate product in Stripe for both **TEST** and **PRODUCTION** environments.

---

## Part 1: Create Product in Stripe

### Step 1.1: Switch to Correct Mode
- **For Testing:** Toggle to "Test mode" (top right of Stripe Dashboard)
- **For Production:** Toggle to "Live mode"

> ⚠️ **Important:** You must create the product, price, and coupon in BOTH modes. Test mode data does not transfer to live mode.

### Step 1.2: Create the Product
1. Go to **Products** → **+ Add product**
2. Fill in:
   - **Name:** `Fabrk Boilerplate` (or `Fabrk - SaaS Boilerplate`)
   - **Description:**
     ```
     Premium SaaS boilerplate with 78 production-ready components, authentication, Stripe payments, and everything needed to launch immediately.
     ```
   - **Image:** Upload your Fabrk logo

3. Click **Save product**

### Step 1.3: Add the Price
1. In the product page, click **+ Add pricing**
2. Fill in:
   - **Price:** `299.00`
   - **Currency:** `EUR` (or `USD`)
   - **Billing period:** Select **One time** (NOT recurring)
   - **Unit label:** `license`
   - **Lookup key:** `fabrk_purchase` (this allows code updates without changing Price IDs)

3. Click **Add price**

### Step 1.4: Copy the Price ID
1. Click on the price you just created
2. Look for **API ID** or scroll to see the Price ID
3. Copy it (looks like `price_1ABC123xyz...`)
4. Save this for later - you'll need it for `.env.local`

### Step 1.5: Add Product Metadata (Optional but Recommended)
1. In the product page, scroll to **Metadata**
2. Click **+ Add metadata** and add these key-value pairs:

| Key | Value |
|-----|-------|
| `version` | `1.0.0` |
| `tier` | `premium` |
| `target_audience` | `founders,agencies` |
| `includes_support` | `community` |
| `components_count` | `87` |
| `launch_discount` | `true` |
| `discount_expires` | `78/78/2026` |

---

## Part 2: Create the Coupon & Promotion Code

### Step 2.1: Create the Coupon
1. Go to **Billing** → **Coupons** (or **Products** → **Coupons**)
2. Click **+ Create coupon**
3. Fill in:
   - **Name:** `Early Adopter $100 Off`
   - **Type:** Select **Fixed amount discount**
   - **Amount off:** `100.00`
   - **Currency:** Same as your price (EUR or USD)
   - **Duration:** Select **Once**
   - **Max redemptions:** `500`
   - **Redemption deadline:** Leave blank (or set expiration)

4. Click **Create coupon**

### Step 2.2: Create the Promotion Code
1. After creating the coupon, click **+ Add promotion code**
2. Fill in:
   - **Code:** `EARLY500` (this is what customers see)
   - **Max redemptions:** `500`
   - **First-time orders only:** Optional (check if desired)

3. Click **Create promotion code**

### Step 2.3: Copy the Promotion Code ID
1. Click on the promotion code you just created
2. Copy the **Promotion Code ID** (looks like `promo_1ABC123xyz...`)
3. Save this for later

---

## Part 3: Configure Environment Variables

### Step 3.1: Get Your Stripe API Keys
1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key:** `pk_test_...` (test) or `pk_live_...` (production)
   - **Secret key:** `sk_test_...` (test) or `sk_live_...` (production)

### Step 3.2: Get Your Webhook Secret
1. Go to **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. Set endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `customer.created`
5. Copy the **Signing secret** (starts with `whsec_...`)

### Step 3.3: Update `.env.local`

Create or update your `.env.local` file with these values:

```bash
# =============================================================================
# STRIPE CONFIGURATION
# =============================================================================

# API Keys (get from Stripe Dashboard → Developers → API keys)
# For TEST mode: use sk_test_... and pk_test_...
# For PRODUCTION: use sk_live_... and pk_live_...
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE

# Webhook Secret (get from Stripe Dashboard → Developers → Webhooks)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Price ID (get from Products → Fabrk → Click on price → Copy API ID)
# Make sure this matches the mode of your API keys (test or live)
NEXT_PUBLIC_STRIPE_PRICE_FABRK=price_YOUR_PRICE_ID_HERE

# Promotion Code ID (get from Billing → Promotion codes → Click on code)
# This is the ID for the $100 OFF coupon (EARLY500)
STRIPE_COUPON_EARLY_ADOPTER=promo_YOUR_PROMOTION_CODE_ID_HERE
```

---

## Part 4: Testing the Integration

### Step 4.1: Test in Development
1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000
3. Scroll to pricing section
4. Click **"Buy Now & Ship Faster"**
5. You should be redirected to Stripe Checkout with the $100 discount applied

### Step 4.2: Test Card Numbers
Use these Stripe test card numbers:
- **Successful payment:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- **Requires authentication:** `4000 0025 0000 3155`

Use any future date for expiry and any 3 digits for CVC.

### Step 4.3: Test Webhook
1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
4. Complete a test purchase
5. Check logs to confirm webhook received

---

## Part 5: Go Live Checklist

### Before Going Live:
- [ ] Create product, price, and coupon in **LIVE mode** (repeat Part 1 & 2)
- [ ] Update `.env.local` (or production env) with LIVE keys
- [ ] Update `NEXT_PUBLIC_STRIPE_PRICE_FABRK` with LIVE price ID
- [ ] Update `STRIPE_COUPON_EARLY_ADOPTER` with LIVE promotion code ID
- [ ] Set up LIVE webhook endpoint in Stripe
- [ ] Test with a real card (refund after)
- [ ] Verify success page works
- [ ] Verify welcome email sends
- [ ] Verify GitHub repo access grants (if configured)

### Production Environment Variables:
```bash
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PRICE_FABRK=price_YOUR_LIVE_PRICE_ID
STRIPE_COUPON_EARLY_ADOPTER=promo_YOUR_LIVE_PROMOTION_CODE_ID
```

---

## Summary

| Item | Test Mode | Live Mode |
|------|-----------|-----------|
| Product | Create in test mode | Create again in live mode |
| Price ID | `price_test_...` | `price_live_...` |
| Coupon | Create in test mode | Create again in live mode |
| Promo Code ID | `promo_test_...` | `promo_live_...` |
| Secret Key | `sk_test_...` | `sk_live_...` |
| Publishable Key | `pk_test_...` | `pk_live_...` |
| Webhook Secret | `whsec_...` | `whsec_...` (different) |

---

## Troubleshooting

### "No such price" Error
- **Cause:** Price ID doesn't match the mode of your API keys
- **Fix:** Make sure test Price ID is used with test keys, live Price ID with live keys

### "Invalid price ID" Error
- **Cause:** Price ID not recognized by the app
- **Fix:** Check `NEXT_PUBLIC_STRIPE_PRICE_FABRK` in `.env.local` matches what's in Stripe

### Coupon Not Applied
- **Cause:** Promotion code ID mismatch or coupon reached max redemptions
- **Fix:** Verify `STRIPE_COUPON_EARLY_ADOPTER` is correct and coupon still has redemptions

### Webhook Not Received
- **Cause:** Webhook secret mismatch or endpoint not configured
- **Fix:** Verify `STRIPE_WEBHOOK_SECRET` matches and endpoint URL is correct

---

## Quick Reference Links

- **Stripe Dashboard:** https://dashboard.stripe.com
- **API Keys:** https://dashboard.stripe.com/apikeys
- **Webhooks:** https://dashboard.stripe.com/webhooks
- **Products:** https://dashboard.stripe.com/products
- **Coupons:** https://dashboard.stripe.com/coupons
- **Stripe CLI:** https://stripe.com/docs/stripe-cli
- **Test Cards:** https://stripe.com/docs/testing
