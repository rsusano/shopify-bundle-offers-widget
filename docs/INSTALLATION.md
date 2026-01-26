# 📦 Installation Guide

Complete step-by-step guide to installing the Shopify Bundle Offers Widget in your theme.

---

## Prerequisites

- Access to Shopify Admin
- Theme Editor access
- Basic understanding of Shopify themes (helpful but not required)

---

## Installation Methods

### Method 1: Using Theme Customizer (Recommended)

This method requires no coding and uses Shopify's built-in block system.

#### Step 1: Upload Files

1. **Access your theme code:**
   - Go to **Online Store > Themes**
   - Click **Actions** on your live theme
   - Select **Edit code**

2. **Upload Block Files:**
   - Navigate to the `blocks/` folder in the left sidebar
   - Click **Add a new section**
   - Create `product-bundle-offers.liquid`
   - Copy the code from `blocks/product-bundle-offers.liquid`
   - Save the file
   
   - Repeat for `add-to-cart.liquid`:
     - Create `add-to-cart.liquid`
     - Copy the code from `blocks/add-to-cart.liquid`
     - Save

3. **Upload Snippet File:**
   - Navigate to the `snippets/` folder
   - Click **Add a new snippet**
   - Name it `add-to-cart-button-enhanced`
   - Copy the code from `snippets/add-to-cart-button-enhanced.liquid`
   - Save

4. **Upload JavaScript Files:**
   - Navigate to the `assets/` folder
   - Click **Add a new asset**
   - Select **Create a blank file**
   - Name it `bundle-offers.js`
   - Copy the code from `assets/bundle-offers.js`
   - Save
   
   - Repeat for `enhanced-add-to-cart.js`:
     - Create `enhanced-add-to-cart.js`
     - Copy the code from `assets/enhanced-add-to-cart.js`
     - Save

#### Step 2: Add to Product Page

1. **Open Theme Customizer:**
   - Go to **Online Store > Themes**
   - Click **Customize** on your live theme

2. **Navigate to Product Page:**
   - In the top dropdown, select **Products**
   - Choose **Default product** (or select a specific product)

3. **Add Bundle Widget:**
   - Scroll to the product section (usually called "Product information")
   - Click **Add block**
   - Find and select **"Bundle Offers"**
   - Position it above or below the product description (your preference)

4. **Replace Add to Cart Button:**
   - Find the existing "Add to Cart" block
   - Click the block and select **Remove block**
   - Click **Add block**
   - Select **"Add to Cart"** (this is your enhanced version)
   - Position it where you want the button to appear

5. **Save Changes:**
   - Click **Save** in the top right
   - Test on your live store

---

### Method 2: Manual Code Integration

For developers who want more control or need to integrate into custom sections.

#### Step 1: Add Files to Theme

Same as Method 1, Steps 1-4 (upload all files)

#### Step 2: Add to Product Template

1. **Find your product template:**
   - Usually in `sections/product-template.liquid` or `sections/main-product.liquid`

2. **Add Bundle Widget:**
   ```liquid
   {%- comment -%} Add this where you want the bundle widget {%- endcomment -%}
   {% render 'product-bundle-offers' %}
   ```

3. **Replace Add to Cart:**
   Find your existing add to cart button code and replace with:
   ```liquid
   <div class="enhanced-add-to-cart-wrapper"
     style="
       --atc-bg-color: #2F7A5E;
       --atc-text-color: #FFFFFF;
       --atc-hover-bg: #235A46;
       --atc-border-radius: 8px;
       --atc-font-size: 16px;
       --atc-padding-v: 16px;
       --atc-padding-h: 32px;
       --atc-price-color: #FFFFFF;
       --atc-compare-price-color: #CCCCCC;
       --atc-guarantee-color: #FFFFFF;
     "
   >
     {% render 'add-to-cart-button-enhanced',
       id: 'product-submit-button',
       class: 'button add-to-cart-button enhanced-add-to-cart',
       can_add_to_cart: true,
       product: product,
       add_to_cart_text: 'Add to cart',
       show_price: true,
       show_compare_price: true,
       show_guarantee: true,
       guarantee_text: '30 Day Money-Back Guarantee',
       separator: '-',
       display_price: product.selected_or_first_available_variant.price,
       display_compare_price: product.selected_or_first_available_variant.compare_at_price
     %}
   </div>
   ```

---

## Configuration

### Initial Setup

After installation, configure your first bundle:

1. **In Theme Customizer:**
   - Click on the **Bundle Offers** block
   - You'll see settings on the right sidebar

2. **Configure Bundle 1 (Single Item):**
   ```
   ✓ Enable Bundle 1
   Title: "Buy One"
   Quantity: 1
   Discount: 0%
   Badge: (leave empty)
   Selected by Default: No
   ```

3. **Configure Bundle 2 (Most Popular):**
   ```
   ✓ Enable Bundle 2
   Title: "Buy 2, Get 1 FREE"
   Quantity: 3
   Price Type: Discount Percentage
   Discount: 35%
   Badge: "Most Popular"
   ✓ Selected by Default
   ```

4. **Configure Bundle 3 (Best Value):**
   ```
   ✓ Enable Bundle 3
   Title: "Buy 3, Get 2 FREE"
   Quantity: 5
   Price Type: Discount Percentage
   Discount: 40%
   Badge: "Free Shipping"
   Selected by Default: No
   ```

5. **Configure Enhanced Button:**
   - Click on the **Add to Cart** block
   - Customize colors to match your brand
   - Adjust padding and font size as needed
   - Set guarantee text

---

## Adding Free Gifts

To add a free gift to any bundle:

1. **In Theme Customizer:**
   - Scroll to the bundle section (e.g., "Bundle 2 - Free Gift")

2. **Select Free Gift Product:**
   - Click the **Free Gift Product** dropdown
   - Search and select your free gift product
   - Set **Free Gift Quantity** (e.g., 1)

3. **Requirements for Free Gift Products:**
   - Product must be published and have stock
   - Product price can be $0 or any amount (display only)
   - Product needs at least one available variant

4. **Example Setup:**
   ```
   Bundle 2:
   - Free Gift Product: "Deluxe Sample Pack"
   - Free Gift Quantity: 1
   ```
   
   When customer selects Bundle 2:
   - They get 3x main product
   - + 1x Deluxe Sample Pack (FREE)

---

## Styling and Colors

### Matching Your Brand

All colors are customizable through the Theme Customizer:

#### Bundle Widget Colors:
- **Border Color**: Default outline around bundles
- **Selected Border**: Highlight color for selected bundle
- **Background Color**: Bundle card background
- **Selected Background**: Background when bundle is active
- **Text Color**: Main text color
- **Price Color**: Sale price color
- **Compare Price Color**: Crossed-out price color
- **Free Badge Background**: "FREE" label background
- **Free Badge Text**: "FREE" label text color

#### Enhanced Button Colors:
- **Background Color**: Main button color
- **Hover Background**: Color when hovering
- **Text Color**: Button text color
- **Price Color**: Price on button
- **Compare Price Color**: Crossed-out price on button
- **Guarantee Text Color**: Guarantee text color

### Custom CSS (Advanced)

Add custom styles in your theme's CSS file:

```css
/* Custom bundle styling */
.product-bundle-offers__item {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.product-bundle-offers__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

/* Custom button styling */
.enhanced-add-to-cart {
  letter-spacing: 1px;
  text-transform: uppercase;
}
```

---

## Verification

### Testing Your Installation

After installing, verify everything works:

1. **Visual Check:**
   - [ ] Bundle widget appears on product page
   - [ ] All 3 bundles display correctly
   - [ ] Enhanced button shows price
   - [ ] Colors match your brand

2. **Functionality Check:**
   - [ ] Selecting a bundle updates the button price
   - [ ] Quantity input updates when selecting bundles
   - [ ] "Add to cart" button works
   - [ ] Cart drawer opens after adding
   - [ ] Correct quantity appears in cart
   - [ ] Free gifts (if configured) appear in cart

3. **Mobile Check:**
   - [ ] Bundle widget is responsive
   - [ ] Button displays correctly on mobile
   - [ ] Touch interactions work smoothly

---

## Common Installation Issues

### Issue: "Liquid error: Could not find asset"

**Problem**: JavaScript files not uploaded correctly

**Solution**:
1. Verify `bundle-offers.js` and `enhanced-add-to-cart.js` are in `assets/` folder
2. Check file names match exactly (case-sensitive)
3. Re-upload if needed

---

### Issue: Bundle widget appears but nothing happens

**Problem**: JavaScript not loading

**Solution**:
1. Check browser console for errors (F12 → Console)
2. Verify JavaScript files are uploaded
3. Check if your theme has Content Security Policy blocking scripts
4. Try clearing browser cache

---

### Issue: Blocks don't appear in Theme Customizer

**Problem**: Block files not in correct location

**Solution**:
1. Ensure files are in `blocks/` folder (not `sections/`)
2. File names must match exactly: `product-bundle-offers.liquid` and `add-to-cart.liquid`
3. Refresh Theme Customizer page

---

### Issue: Styles look broken

**Problem**: Theme CSS conflicts

**Solution**:
1. Check if theme has conflicting button styles
2. Increase CSS specificity in `add-to-cart-button-enhanced.liquid`
3. Use `!important` if necessary:
   ```css
   .enhanced-add-to-cart {
     padding: var(--atc-padding-v, 16px) !important;
   }
   ```

---

## Next Steps

After successful installation:

1. ✅ Read [CUSTOMIZATION.md](./CUSTOMIZATION.md) for advanced customization
2. ✅ Check [API.md](./API.md) for JavaScript integration
3. ✅ Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
4. ✅ Test thoroughly before going live

---

## Need Help?

If you're stuck:
- Check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) guide
- Review the code comments in each file
- Open an issue on GitHub
- Contact support

---

**Installation Complete! 🎉**

Your bundle system is now ready to boost your average order value.
