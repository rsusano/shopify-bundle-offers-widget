# 🔧 Troubleshooting Guide

Common issues and their solutions for the Shopify Bundle Offers Widget.

---

## Quick Diagnosis

**Before diving into specific issues:**

1. **Check Browser Console:**
   - Press `F12` (or `Cmd+Option+I` on Mac)
   - Click the **Console** tab
   - Look for red error messages
   - Take a screenshot if asking for help

2. **Verify Files Are Uploaded:**
   - Go to **Online Store > Themes > Edit Code**
   - Check these files exist:
     - `blocks/product-bundle-offers.liquid`
     - `blocks/add-to-cart.liquid`
     - `snippets/add-to-cart-button-enhanced.liquid`
     - `assets/bundle-offers.js`
     - `assets/enhanced-add-to-cart.js`

3. **Clear Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Clear browser cache
   - Try in incognito/private mode

---

## Bundle Widget Issues

### Issue: Bundle widget doesn't appear on product page

**Possible Causes:**
1. Block not added to product template
2. File uploaded to wrong location
3. JavaScript not loading

**Solutions:**

**Solution 1: Add Block via Theme Customizer**
```
1. Go to Online Store > Themes > Customize
2. Navigate to Products > Default Product
3. Click "Add block" in product section
4. Select "Bundle Offers"
5. Save
```

**Solution 2: Check File Location**
- File must be in `blocks/` folder (not `sections/`)
- Filename must be exactly `product-bundle-offers.liquid`
- Try deleting and re-uploading the file

**Solution 3: Check JavaScript**
Open browser console and type:
```javascript
console.log(customElements.get('bundle-offers-component'));
```
- If `undefined`: JavaScript not loaded
- If function shown: JavaScript is fine

---

### Issue: Bundle selection doesn't update button price

**Symptoms:** Click bundle but price stays the same

**Cause:** Enhanced button JavaScript not loaded or not listening

**Solution:**

**Step 1: Verify Event Firing**
Open console and run:
```javascript
document.addEventListener('bundle:selected', (e) => console.log('Bundle event:', e.detail));
```
Then select a bundle. Should see log output.

**Step 2: Check Button Element**
Run in console:
```javascript
console.log(document.querySelector('enhanced-add-to-cart-component'));
```
Should return an element (not `null`)

**Step 3: Manual Fix**
If still broken, add this to your theme's `theme.js`:
```javascript
document.addEventListener('bundle:selected', function(event) {
  const priceEl = document.querySelector('[data-enhanced-atc-price]');
  if (priceEl) {
    priceEl.textContent = event.detail.formattedPrice;
  }
});
```

---

### Issue: Bundle prices are wrong/incorrect

**Cause:** Liquid calculation error or wrong settings

**Solutions:**

**Solution 1: Verify Settings**
1. Go to Theme Customizer
2. Click Bundle Offers block
3. Check:
   - Quantity is correct
   - Discount percentage makes sense
   - If using "Fixed Price", it's entered correctly (without currency symbol)

**Solution 2: Check Discount Math**
For "Buy 2 Get 1 Free":
- Set Quantity = 3
- Set Discount = 33% (not 50%)

For "Buy 3 Get 2 Free":
- Set Quantity = 5
- Set Discount = 40%

**Solution 3: Debug Price Calculation**
Add this temporarily to `product-bundle-offers.liquid` after line 24:
```liquid
<!-- DEBUG: Base price = {{ base_price | money }} -->
<!-- DEBUG: Bundle 2 price = {{ bundle_2_price | money }} -->
<!-- DEBUG: Bundle 2 compare = {{ bundle_2_total_compare | money }} -->
```
View page source to see calculated values.

---

### Issue: Free gifts not adding to cart

**Symptoms:** Bundle adds but free gift missing from cart

**Possible Causes:**
1. Free gift product not selected
2. Free gift out of stock
3. Free gift not published

**Solutions:**

**Solution 1: Check Free Gift Product**
1. Go to Theme Customizer
2. Find bundle settings
3. Under "Free Gift" section:
   - Verify a product is selected
   - Check "Free Gift Quantity" is > 0
4. Go to Products > Find that free gift product
   - Make sure it's published
   - Check it has available stock
   - Ensure at least one variant exists

**Solution 2: Check Console for Errors**
Look for errors like:
- `"variant not found"`
- `"insufficient stock"`
- `"product not published"`

**Solution 3: Test with Different Product**
- Try using a simple product as free gift
- Make sure it has only 1 variant
- Set price to $0 if you want

---

## Button Issues

### Issue: Enhanced button not showing

**Cause:** Wrong block or conflicting theme styles

**Solutions:**

**Solution 1: Verify Correct Block**
1. Theme Customizer > Product page
2. Find existing "Add to Cart" block
3. Remove it
4. Add new "Add to Cart" block (the enhanced version)
5. Save

**Solution 2: Check for CSS Conflicts**
Some themes hide buttons. Add this CSS temporarily:
```css
.enhanced-add-to-cart {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
```

**Solution 3: Check Snippet Rendering**
View page source and search for `enhanced-add-to-cart`. If not found, snippet isn't rendering.

---

### Issue: Button styles not applying

**Symptoms:** Button looks like default theme button

**Cause:** Theme CSS overriding custom styles

**Solutions:**

**Solution 1: Increase CSS Specificity**
In `add-to-cart-button-enhanced.liquid`, change:
```css
.enhanced-add-to-cart {
  /* ... */
}
```
To:
```css
.enhanced-add-to-cart-wrapper .enhanced-add-to-cart.button {
  /* ... */
}
```

**Solution 2: Use !important (Last Resort)**
Add `!important` to critical styles:
```css
.enhanced-add-to-cart {
  background-color: var(--atc-bg-color) !important;
  padding: var(--atc-padding-v) !important;
}
```

**Solution 3: Override Theme Styles**
Add to your theme's CSS file:
```css
/* Override theme button styles */
.product-form button.enhanced-add-to-cart {
  all: unset;
  /* Then reapply your styles */
}
```

---

### Issue: Button padding not working

**Cause:** Theme CSS using higher specificity

**Solution:**

**Find Conflicting CSS:**
1. Right-click button
2. Select "Inspect Element"
3. Look at "Styles" tab
4. See what styles are being overridden (crossed out)

**Fix:**
In `blocks/buy-buttons.liquid`, check for this rule:
```css
.product-form-buttons button {
  padding: /* some value */;
}
```

Change to:
```css
.product-form-buttons button:not(.enhanced-add-to-cart) {
  padding: /* some value */;
}
```

---

### Issue: Compare-at price not showing

**Cause:** Product doesn't have compare-at price set

**Solution:**

**Set Compare-At Price:**
1. Go to Products > Select your product
2. Find the variant
3. Set "Compare at price" (must be higher than regular price)
4. Save

**Check Settings:**
1. Theme Customizer > Add to Cart block
2. Verify "Show Compare at Price" is checked

**Debug:**
Check in console:
```javascript
console.log({{product.selected_or_first_available_variant.compare_at_price}});
```
Should show a number, not `null`

---

## Cart Issues

### Issue: Cart drawer doesn't open after adding bundle

**Cause:** Theme uses custom cart drawer

**Solution:**

**Find Your Cart Drawer Selector:**

**Step 1:** Common selectors to try:
```javascript
// Try each of these in console
document.querySelector('cart-drawer');
document.querySelector('cart-drawer-component');
document.querySelector('#cart-drawer');
document.querySelector('[data-cart-drawer]');
document.querySelector('.cart-drawer');
```

**Step 2:** Update `bundle-offers.js` line 177:
```javascript
// Replace this line:
const cartDrawer = document.querySelector('cart-drawer-component');

// With your selector:
const cartDrawer = document.querySelector('YOUR_SELECTOR_HERE');
```

**Step 3:** Find open method:
Try calling:
```javascript
cartDrawer.open();
cartDrawer.showDialog();
cartDrawer.show();
cartDrawer.classList.add('active');
```
See which one works.

---

### Issue: Wrong quantity appears in cart

**Symptoms:** Added bundle with qty 3, but only 1 shows

**Cause:** Quantity input not syncing

**Solution:**

**Update Quantity Selectors:**
Edit `bundle-offers.js` around line 249:
```javascript
const quantitySelectors = [
  'input[name="quantity"]',
  '.quantity__input',
  '[data-quantity-input]',
  'quantity-selector input',
  // ADD YOUR THEME'S SELECTOR:
  '.your-theme-quantity-selector input'
];
```

**Find Your Selector:**
1. Right-click quantity input on product page
2. Inspect element
3. Note the class or ID
4. Add to array above

---

### Issue: Cart shows bundle items but not linked

**Symptoms:** Can't tell which items are bundles

**Cause:** Cart properties not displaying

**Solution:**

This is normal! Bundle linkage is internal. To display bundle info in cart:

**Option 1: Show in Cart Template**
Add to your `cart-drawer.liquid` or `cart-item.liquid`:
```liquid
{% for property in item.properties %}
  {% if property.first == '_bundle_id' %}
    <span class="bundle-indicator">Bundle Item</span>
  {% endif %}
  {% if property.first == '_Free Gift' %}
    <span class="free-gift-badge">FREE GIFT</span>
  {% endif %}
{% endfor %}
```

---

## JavaScript Errors

### Error: "customElements.define" is not a function

**Cause:** Browser doesn't support Custom Elements

**Solution:**

**Add Polyfill:**
Add before closing `</head>` in `theme.liquid`:
```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.6.0/webcomponents-bundle.js"></script>
```

---

### Error: "Cannot read property 'querySelector' of null"

**Cause:** Trying to access element that doesn't exist

**Solution:**

**Add Null Checks:**
Modify code to check before accessing:
```javascript
// Bad:
const element = document.querySelector('.something');
element.textContent = 'text'; // Crashes if null

// Good:
const element = document.querySelector('.something');
if (element) {
  element.textContent = 'text';
}
```

---

### Error: "Liquid error: Could not find asset"

**Cause:** File not found or wrong filename

**Solution:**

**Check Asset References:**
In your Liquid files, ensure:
```liquid
<script src="{{ 'bundle-offers.js' | asset_url }}" defer></script>
```

Matches exact filename in `assets/` folder:
- Must be `bundle-offers.js` (not `bundle-offers.liquid.js`)
- Case-sensitive
- No spaces in filename

---

## Theme Conflicts

### Issue: Works on default theme but breaks on custom theme

**Cause:** Theme has custom JavaScript that conflicts

**Solution:**

**Namespace Your Code:**
Wrap your code to prevent conflicts:
```javascript
(function() {
  'use strict';
  
  // Your bundle code here
  
})();
```

**Check for jQuery Conflicts:**
If theme uses jQuery:
```javascript
jQuery(function($) {
  // Use $ safely here
});
```

---

## Mobile Issues

### Issue: Bundle widget looks broken on mobile

**Cause:** Missing mobile styles or layout issues

**Solution:**

**Check Responsive Styles:**
In `product-bundle-offers.liquid`, ensure this media query exists:
```css
@media screen and (max-width: 749px) {
  .product-bundle-offers__item {
    flex-wrap: wrap;
    padding: 12px;
  }
  /* More mobile styles */
}
```

**Test on Real Device:**
- Chrome DevTools mobile emulator can differ from real phones
- Test on actual iOS and Android devices
- Check landscape and portrait orientations

---

## Performance Issues

### Issue: Page loads slowly after installing widget

**Cause:** Large JavaScript files or inefficient code

**Solution:**

**Defer JavaScript Loading:**
Ensure all script tags have `defer`:
```liquid
<script src="{{ 'bundle-offers.js' | asset_url }}" defer></script>
```

**Lazy Load for Below Fold:**
If bundle widget is below the fold:
```html
<script>
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Load bundle widget
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(document.querySelector('.product-bundle-offers'));
  }
</script>
```

---

## Still Having Issues?

### Get More Help

**Before asking for help, collect:**

1. **Browser Console Errors:**
   - Screenshot of console (F12)
   - Any red error messages

2. **Theme Information:**
   - Theme name and version
   - Shopify plan
   - Any installed apps that modify product pages

3. **What You've Tried:**
   - List troubleshooting steps already attempted
   - What worked or didn't work

4. **Reproduction Steps:**
   - Exact steps to reproduce the issue
   - Does it happen in incognito mode?
   - Does it happen on all products?

### Contact Support

- GitHub Issues: [Link to your repo]
- Email: [Your email]
- Documentation: [Link to docs]

---

## Preventive Maintenance

### Regular Checks

**Monthly:**
- Test add to cart on different products
- Verify free gifts still add correctly
- Check mobile responsiveness

**After Theme Updates:**
- Re-test entire widget
- Check for new CSS conflicts
- Verify cart drawer still opens

**After App Installations:**
- Test if new app conflicts with bundles
- Check console for JavaScript errors

---

## Debug Mode

### Enable Detailed Logging

Add this to your theme temporarily for debugging:

```html
<script>
// Add to theme.liquid before bundle-offers.js loads
window.BUNDLE_DEBUG = true;
</script>
```

Then in `bundle-offers.js`, add throughout:
```javascript
if (window.BUNDLE_DEBUG) {
  console.log('[Bundle Debug]', 'Message here', data);
}
```

### Test Mode

Create a test product:
1. Duplicate a product
2. Name it "TEST - Bundle Widget"
3. Set it as draft (not published)
4. Test all bundles on this product first
5. Only promote to live after verified

---

**Most issues are quick fixes!** Start with browser console and work through the checklist.
