# 🎨 Customization Guide

Advanced customization examples and use cases for the Shopify Bundle Offers Widget.

---

## Table of Contents

- [Bundle Configurations](#bundle-configurations)
- [Pricing Strategies](#pricing-strategies)
- [Free Gift Setups](#free-gift-setups)
- [Visual Customization](#visual-customization)
- [Button Variations](#button-variations)
- [Advanced Liquid](#advanced-liquid)
- [JavaScript Customization](#javascript-customization)
- [Use Cases](#use-cases)

---

## Bundle Configurations

### Configuration 1: Simple Quantity Discounts

Perfect for straightforward "buy more, save more" offers.

```json
Bundle 1: {
  "quantity": 1,
  "discount": 0,
  "title": "Single",
  "subtitle": "Regular price"
}

Bundle 2: {
  "quantity": 2,
  "discount": 10,
  "title": "Double Pack",
  "subtitle": "Save 10%"
}

Bundle 3: {
  "quantity": 3,
  "discount": 20,
  "title": "Triple Pack",
  "subtitle": "Save 20%"
}
```

**Result**: Clean, escalating discounts that encourage bulk purchases.

---

### Configuration 2: "Buy 2 Get 1 Free" Style

Classic promotional bundle that's easy to understand.

```json
Bundle 1: {
  "quantity": 1,
  "discount": 0,
  "title": "Buy One"
}

Bundle 2: {
  "quantity": 3,
  "discount": 33,
  "title": "Buy 2, Get 1 FREE",
  "badge": "🔥 Hot Deal"
}

Bundle 3: {
  "quantity": 5,
  "discount": 40,
  "title": "Buy 3, Get 2 FREE",
  "badge": "💰 Best Value"
}
```

**Math**: 
- Buy 2 Get 1 Free = 33.33% discount
- Buy 3 Get 2 Free = 40% discount

---

### Configuration 3: Fixed Price Bundles

Set specific prices regardless of original price.

```json
Bundle 1: {
  "quantity": 1,
  "price_type": "fixed",
  "fixed_price": 49.99,
  "title": "Single - $49.99"
}

Bundle 2: {
  "quantity": 2,
  "price_type": "fixed",
  "fixed_price": 89.99,
  "title": "Double - $89.99",
  "badge": "Save $10"
}

Bundle 3: {
  "quantity": 3,
  "price_type": "fixed",
  "fixed_price": 119.99,
  "title": "Triple - $119.99",
  "badge": "Save $30"
}
```

**When to use**: When you want predictable pricing tiers.

---

## Pricing Strategies

### Strategy 1: Tiered Percentage Discounts

Gradually increase discounts to incentivize larger purchases:

```
1 item:  0% off   ($50.00)
2 items: 10% off  ($90.00 vs $100.00)
3 items: 15% off  ($127.50 vs $150.00)
5 items: 20% off  ($200.00 vs $250.00)
```

**Psychology**: Each tier feels like a "level up" in savings.

---

### Strategy 2: Subscription-Style Pricing

Mimic subscription models with predictable monthly costs:

```
Bundle 1: "Monthly" - 1 unit every 30 days
Bundle 2: "Quarterly" - 3 units every 90 days (5% off)
Bundle 3: "Annual" - 12 units upfront (15% off)
```

---

### Strategy 3: Free Shipping Threshold

Use bundles to reach free shipping minimum:

```json
Bundle 1: {
  "quantity": 1,
  "discount": 0,
  "subtitle": "$75 to free shipping"
}

Bundle 2: {
  "quantity": 2,
  "discount": 5,
  "subtitle": "$50 to free shipping"
}

Bundle 3: {
  "quantity": 3,
  "discount": 10,
  "badge": "FREE SHIPPING ✓"
}
```

---

## Free Gift Setups

### Setup 1: Samples with Purchase

Encourage trial of related products:

```json
Bundle 2: {
  "quantity": 2,
  "discount": 10,
  "free_gift": "sample-pack-basic",
  "free_gift_quantity": 1,
  "title": "Starter Bundle + Free Samples"
}

Bundle 3: {
  "quantity": 3,
  "discount": 20,
  "free_gift": "sample-pack-deluxe",
  "free_gift_quantity": 1,
  "title": "Premium Bundle + Deluxe Samples"
}
```

---

### Setup 2: Cross-Sell Accessories

Bundle main product with accessories:

**Example: Skincare product**
```json
Bundle 2: {
  "free_gift": "facial-applicator-tool",
  "free_gift_quantity": 1,
  "title": "Buy 2 + Free Applicator"
}

Bundle 3: {
  "free_gift": "travel-size-cleanser",
  "free_gift_quantity": 2,
  "title": "Buy 3 + Free Travel Kit"
}
```

---

### Setup 3: Surprise & Delight

Mystery gifts that create excitement:

```json
Bundle 3: {
  "free_gift": "mystery-bonus-gift",
  "free_gift_quantity": 1,
  "badge": "🎁 Surprise Gift Inside"
}
```

---

## Visual Customization

### Theme 1: Minimalist

Clean, modern design with subtle colors:

```css
/* Bundle Widget */
--bundle-border-color: #EEEEEE;
--bundle-selected-border: #000000;
--bundle-bg-color: #FFFFFF;
--bundle-selected-bg: #F8F8F8;
--bundle-text-color: #000000;

/* Button */
--atc-bg-color: #000000;
--atc-hover-bg: #333333;
--atc-border-radius: 4px;
```

**Result**: Elegant, high-end feel.

---

### Theme 2: Vibrant & Playful

Bold colors that grab attention:

```css
/* Bundle Widget */
--bundle-border-color: #FF6B9D;
--bundle-selected-border: #FF1493;
--bundle-bg-color: #FFF0F6;
--bundle-selected-bg: #FFE4ED;
--bundle-free-badge-bg: #00D4AA;

/* Button */
--atc-bg-color: #FF1493;
--atc-hover-bg: #DB127D;
--atc-border-radius: 24px;
```

**Result**: Fun, energetic brand personality.

---

### Theme 3: Natural & Organic

Earthy tones for wellness brands:

```css
/* Bundle Widget */
--bundle-border-color: #C5B299;
--bundle-selected-border: #6B8E23;
--bundle-bg-color: #FAF9F6;
--bundle-selected-bg: #F0EFE6;
--bundle-text-color: #3E3E3E;

/* Button */
--atc-bg-color: #6B8E23;
--atc-hover-bg: #556B2F;
--atc-border-radius: 12px;
```

**Result**: Calm, trustworthy, eco-friendly vibe.

---

## Button Variations

### Variation 1: Minimal Text-Only Button

Hide price and guarantee for cleaner look:

```liquid
{% render 'add-to-cart-button-enhanced',
  add_to_cart_text: 'Add to cart',
  show_price: false,
  show_guarantee: false
%}
```

---

### Variation 2: Icon + Text Button

Add icon to button text (requires icon SVG):

```liquid
<button class="enhanced-add-to-cart">
  <span class="button-icon">🛒</span>
  {{ 'Add to cart' }}
</button>
```

---

### Variation 3: Large CTA Button

Oversized button for high-converting pages:

```
font_size: 20px
padding_vertical: 24px
padding_horizontal: 48px
```

**Result**: Impossible to miss, drives action.

---

## Advanced Liquid

### Dynamic Badge Text

Show different badges based on stock level:

```liquid
{% liquid
  if product.variants.first.inventory_quantity < 10
    assign bundle_2_badge = "⚠️ Low Stock"
  elsif product.variants.first.inventory_quantity < 50
    assign bundle_2_badge = "🔥 Selling Fast"
  else
    assign bundle_2_badge = "Most Popular"
  endif
%}
```

---

### Conditional Bundles

Show different bundles based on product tags:

```liquid
{% if product.tags contains 'premium' %}
  {% comment %} Show premium bundles with higher discounts {% endcomment %}
  assign bundle_2_discount = 40
  assign bundle_3_discount = 50
{% else %}
  {% comment %} Standard bundles {% endcomment %}
  assign bundle_2_discount = 25
  assign bundle_3_discount = 35
{% endif %}
```

---

### Seasonal Promotions

Adjust bundles based on date:

```liquid
{% assign current_date = 'now' | date: '%Y%m%d' | times: 1 %}
{% assign promo_start = '20250101' | times: 1 %}
{% assign promo_end = '20250131' | times: 1 %}

{% if current_date >= promo_start and current_date <= promo_end %}
  assign bundle_2_badge = "🎉 New Year Special"
  assign bundle_2_discount = 40
{% endif %}
```

---

## JavaScript Customization

### Custom Event Handlers

Listen for bundle selection and trigger custom actions:

```javascript
document.addEventListener('bundle:selected', (event) => {
  const { quantity, price, formattedPrice } = event.detail;
  
  // Send to analytics
  gtag('event', 'bundle_selected', {
    'quantity': quantity,
    'value': price / 100,
    'currency': 'USD'
  });
  
  // Update custom UI element
  document.querySelector('.savings-badge').textContent = 
    `You're saving $${(event.detail.comparePrice - price) / 100}!`;
});
```

---

### Custom Price Formatting

Override default price formatter:

```javascript
// In enhanced-add-to-cart.js, modify formatMoney:

formatMoney(cents) {
  const amount = cents / 100;
  
  // Custom format: "Only $49.99!"
  return `Only $${amount.toFixed(2)}!`;
  
  // Or European format: "49,99 €"
  return `${amount.toFixed(2).replace('.', ',')} €`;
}
```

---

### Dynamic Button Text

Change button text based on bundle:

```javascript
document.addEventListener('bundle:selected', (event) => {
  const button = document.querySelector('.enhanced-add-to-cart');
  const quantity = event.detail.quantity;
  
  if (quantity === 1) {
    button.dataset.text = 'Add to Cart';
  } else if (quantity === 3) {
    button.dataset.text = 'Get Your Bundle';
  } else {
    button.dataset.text = 'Claim Your Deal';
  }
});
```

---

## Use Cases

### Use Case 1: Skincare Brand

**Scenario**: Monthly skincare subscription alternative

```json
Bundle 1: "Try Me" (1 month supply)
- 1 unit, $45
- No discount
- Badge: "First Time?"

Bundle 2: "Starter Kit" (3 months)
- 3 units, $120 (was $135)
- 10% off + Free travel-size cleanser
- Badge: "Most Popular"
- Selected by default

Bundle 3: "Complete Routine" (6 months)
- 6 units, $225 (was $270)
- 17% off + Free luxury spa headband + samples
- Badge: "Best Value + Free Shipping"
```

---

### Use Case 2: Coffee Roasters

**Scenario**: Encourage bulk coffee purchases

```json
Bundle 1: "Single Bag"
- 1 bag (12 oz), $16
- Badge: "Try a new roast"

Bundle 2: "Coffee Lover"
- 3 bags, $42 (was $48)
- 13% off
- Badge: "Fresh Monthly"

Bundle 3: "Caffeine Addict"
- 5 bags, $65 (was $80)
- 19% off + Free coffee scoop
- Badge: "Free Shipping"
```

---

### Use Case 3: Supplement Store

**Scenario**: Motivate long-term supplement use

```json
Bundle 1: "1 Month Supply"
- 1 bottle, $39.99
- Subtitle: "Try it out"

Bundle 2: "3 Month Stack"
- 3 bottles, $99.99 (was $119.97)
- 17% off + Free shaker bottle
- Badge: "Consistency Pays"
- Selected by default

Bundle 3: "6 Month Transformation"
- 6 bottles, $179.99 (was $239.94)
- 25% off + Free shaker + Free meal plan guide
- Badge: "Commit & Save"
```

**Additional**: Add countdown timer for urgency.

---

### Use Case 4: Pet Products

**Scenario**: Stock up on pet supplies

```json
Bundle 1: "1 Month"
- 1 bag, $29.99

Bundle 2: "Quarter Supply"
- 3 bags, $79.99 (was $89.97)
- 11% off + Free pet toy
- Badge: "🐾 Smart Choice"

Bundle 3: "6 Month Stock"
- 6 bags, $149.99 (was $179.94)
- 17% off + Free premium toy + treats sampler
- Badge: "Auto-Delivery Available"
```

---

## Testing Your Customizations

Before going live with custom configs:

1. **Test Pricing Math:**
   - Verify discount calculations are correct
   - Check free gift adds at $0.00
   - Ensure compare-at price shows savings

2. **Test Visual Consistency:**
   - Colors work in light and dark modes
   - Text is readable at all sizes
   - Mobile looks good

3. **Test User Flow:**
   - Select each bundle and add to cart
   - Verify cart shows correct items
   - Check checkout process

---

## Pro Tips

### Tip 1: A/B Test Your Bundles

Try different bundle configurations and track:
- Conversion rate by bundle
- Average order value
- Cart abandonment rate

### Tip 2: Use Scarcity

Add urgency with badges:
- "Only 12 left in stock!"
- "Limited time offer"
- "Today only: Extra 5% off"

### Tip 3: Match Free Gifts to Value

Don't give away expensive items with small bundles:
- Bundle 1: Small sample
- Bundle 2: Medium value gift
- Bundle 3: Premium add-on

### Tip 4: Clear Value Communication

Always show the math:
- "Save $25" is better than "17% off"
- Show original price crossed out
- Highlight total savings

---

## Need Inspiration?

Check out these Shopify stores using bundle strategies:
- [Examples of successful bundle implementations]

---

**Ready to customize?** Start with small changes and test before major redesigns!

For technical integration, see [API.md](./API.md)
