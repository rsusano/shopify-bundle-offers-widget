# 🔧 JavaScript API Reference

Complete technical documentation for developers integrating with or extending the Bundle Offers Widget.

---

## Table of Contents

- [Custom Elements](#custom-elements)
- [Events](#events)
- [Methods](#methods)
- [Data Attributes](#data-attributes)
- [CSS Variables](#css-variables)
- [Integration Examples](#integration-examples)

---

## Custom Elements

### `<bundle-offers-component>`

Main custom element for the bundle selection widget.

#### Usage

```html
<bundle-offers-component
  data-variant-id="12345"
  data-product-id="67890"
>
  <!-- Bundle radio inputs -->
</bundle-offers-component>
```

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-variant-id` | String | Current product variant ID |
| `data-product-id` | String | Product ID for tracking |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `radios` | NodeList | All radio input elements |
| `items` | NodeList | All bundle item labels |
| `productForm` | HTMLFormElement | Reference to product form |
| `quantityInput` | HTMLInputElement | Quantity input field |
| `selectedBundle` | HTMLInputElement | Currently selected radio |

#### Methods

##### `init()`

Initializes the component, sets up event listeners.

```javascript
const bundleWidget = document.querySelector('bundle-offers-component');
bundleWidget.init();
```

##### `handleSelection(event)`

Handles bundle radio selection change.

**Parameters:**
- `event` (Event): Change event from radio input

```javascript
bundleWidget.handleSelection(changeEvent);
```

##### `updateQuantityInput(radio)`

Updates quantity inputs across the page.

**Parameters:**
- `radio` (HTMLInputElement): Selected radio button

```javascript
bundleWidget.updateQuantityInput(radioElement);
```

##### `updateAllButtons(radio)`

Updates all add-to-cart and buy-now buttons.

**Parameters:**
- `radio` (HTMLInputElement): Selected radio button

```javascript
bundleWidget.updateAllButtons(radioElement);
```

##### `formatMoney(cents)`

Formats price in cents to currency string.

**Parameters:**
- `cents` (Number): Price in cents

**Returns:** (String) Formatted price

```javascript
const formatted = bundleWidget.formatMoney(9999);
// Returns: "$99.99" or "₱99.99"
```

##### `dispatchBundleEvent(radio)`

Dispatches custom `bundle:selected` event.

**Parameters:**
- `radio` (HTMLInputElement): Selected radio button

```javascript
bundleWidget.dispatchBundleEvent(radioElement);
```

---

### `<enhanced-add-to-cart-component>`

Custom element for the enhanced add-to-cart button.

#### Usage

```html
<enhanced-add-to-cart-component
  data-show-price="true"
  data-show-guarantee="true"
  data-guarantee-text="30 Day Guarantee"
>
  <!-- Button element -->
</enhanced-add-to-cart-component>
```

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-show-price` | Boolean | Show/hide price on button |
| `data-show-guarantee` | Boolean | Show/hide guarantee text |
| `data-guarantee-text` | String | Guarantee message |
| `data-separator` | String | Separator between text and price |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `priceElement` | HTMLElement | Price display element |
| `comparePriceElement` | HTMLElement | Compare price element |

#### Methods

##### `initializeListeners()`

Sets up event listeners for bundle and variant changes.

```javascript
const button = document.querySelector('enhanced-add-to-cart-component');
button.initializeListeners();
```

##### `updatePrice(bundleData)`

Updates button price display from bundle selection.

**Parameters:**
- `bundleData` (Object): Bundle price information

```javascript
button.updatePrice({
  price: 9999,
  comparePrice: 14999,
  formattedPrice: "$99.99",
  formattedComparePrice: "$149.99"
});
```

##### `updatePriceValue(priceInCents)`

Updates price from cents value.

**Parameters:**
- `priceInCents` (Number): Price in cents

```javascript
button.updatePriceValue(9999);
```

##### `formatMoney(cents)`

Formats price with currency symbol.

**Parameters:**
- `cents` (Number): Price in cents

**Returns:** (String) Formatted price

```javascript
const formatted = button.formatMoney(9999);
// Returns: "$99.99"
```

---

## Events

### `bundle:selected`

Fired when a bundle is selected.

#### Event Detail

```javascript
{
  price: Number,              // Price in cents
  comparePrice: Number,       // Original price in cents
  quantity: Number,           // Bundle quantity
  formattedPrice: String,     // Formatted price string
  formattedComparePrice: String, // Formatted compare price
  freeGiftVariantId: String,  // Free gift variant ID (if any)
  freeGiftQuantity: Number    // Free gift quantity
}
```

#### Usage

```javascript
document.addEventListener('bundle:selected', (event) => {
  console.log('Bundle selected:', event.detail);
  
  const { quantity, formattedPrice, freeGiftVariantId } = event.detail;
  
  // Update your custom UI
  document.querySelector('.custom-price-display').textContent = formattedPrice;
  
  // Track in analytics
  gtag('event', 'bundle_selection', {
    'quantity': quantity,
    'has_free_gift': !!freeGiftVariantId
  });
});
```

---

### `variant:update`

Fired when product variant changes (integrates with theme).

#### Event Detail

```javascript
{
  price: Number,        // Variant price in cents
  variantId: String,    // New variant ID
  available: Boolean    // Variant availability
}
```

#### Usage

```javascript
document.addEventListener('variant:update', (event) => {
  console.log('Variant changed:', event.detail);
  
  // Update bundle prices based on new variant
  const newPrice = event.detail.price;
  // Recalculate bundle prices...
});
```

---

### `cart:update`

Fired after items added to cart successfully.

#### Event Detail

```javascript
{
  resource: Object,     // Cart API response
  sourceId: String,     // Variant ID that triggered update
  data: {
    source: 'bundle-offers',
    itemCount: Number,
    productId: String,
    variantId: String
  }
}
```

#### Usage

```javascript
document.addEventListener('cart:update', (event) => {
  console.log('Cart updated:', event.detail);
  
  // Refresh cart UI
  const itemCount = event.detail.data.itemCount;
  document.querySelector('.cart-count').textContent = itemCount;
  
  // Show success message
  showToast('Added to cart!');
});
```

---

## Methods

### Global Functions

#### `BundleOffersComponent.formatMoney(cents)`

Static method to format money consistently.

```javascript
const formatted = BundleOffersComponent.prototype.formatMoney.call(
  { /* context */ },
  9999
);
```

---

## Data Attributes

### Radio Input Attributes

Each bundle radio button includes these data attributes:

```html
<input 
  type="radio"
  data-quantity="3"
  data-price="9799"
  data-compare-price="14999"
  data-variant-id="12345"
  data-free-gift-variant-id="67890"
  data-free-gift-quantity="1"
  data-free-gift-title="Sample Pack"
>
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-quantity` | Number | Bundle quantity |
| `data-price` | Number | Bundle price in cents |
| `data-compare-price` | Number | Original total price |
| `data-variant-id` | String | Main product variant |
| `data-free-gift-variant-id` | String | Free gift variant (optional) |
| `data-free-gift-quantity` | Number | Free gift quantity (optional) |
| `data-free-gift-title` | String | Free gift name (optional) |

---

## CSS Variables

### Bundle Widget Variables

```css
.product-bundle-offers {
  --bundle-border-color: #E0E0E0;
  --bundle-selected-border: #006241;
  --bundle-bg-color: #FFFFFF;
  --bundle-selected-bg: #F0FDF4;
  --bundle-text-color: #333333;
  --bundle-price-color: #333333;
  --bundle-compare-color: #999999;
  --bundle-free-badge-bg: #00A67E;
  --bundle-free-badge-text: #FFFFFF;
}
```

### Enhanced Button Variables

```css
.enhanced-add-to-cart-wrapper {
  --atc-bg-color: #2F7A5E;
  --atc-text-color: #FFFFFF;
  --atc-hover-bg: #235A46;
  --atc-border-radius: 8px;
  --atc-font-size: 16px;
  --atc-padding-v: 16px;
  --atc-padding-h: 32px;
  --atc-price-color: #FFFFFF;
  --atc-compare-price-color: #CCCCCC;
  --atc-guarantee-color: rgba(255, 255, 255, 0.9);
}
```

---

## Integration Examples

### Example 1: Custom Analytics Tracking

Track bundle selections in Google Analytics:

```javascript
document.addEventListener('bundle:selected', (event) => {
  const { quantity, price, comparePrice } = event.detail;
  const savings = comparePrice - price;
  
  // GA4 Event
  gtag('event', 'select_bundle', {
    'currency': 'USD',
    'value': price / 100,
    'items': [{
      'item_name': 'Bundle - ' + quantity + ' items',
      'item_category': 'Bundle',
      'quantity': quantity,
      'price': price / 100,
      'discount': savings / 100
    }]
  });
});

// Track add to cart
document.addEventListener('cart:update', (event) => {
  gtag('event', 'add_to_cart', {
    'currency': 'USD',
    'value': event.detail.resource.total_price / 100,
    'items': event.detail.resource.items
  });
});
```

---

### Example 2: Custom Price Display

Show savings in a custom element:

```javascript
document.addEventListener('bundle:selected', (event) => {
  const { price, comparePrice, formattedPrice } = event.detail;
  const savings = comparePrice - price;
  const savingsPercent = Math.round((savings / comparePrice) * 100);
  
  // Update custom savings badge
  const badge = document.querySelector('.custom-savings-badge');
  badge.innerHTML = `
    <span class="savings-amount">Save $${(savings / 100).toFixed(2)}</span>
    <span class="savings-percent">${savingsPercent}% OFF</span>
  `;
  badge.classList.add('show');
});
```

---

### Example 3: Countdown Timer Integration

Add urgency with a countdown when bundle is selected:

```javascript
let countdownInterval;

document.addEventListener('bundle:selected', (event) => {
  const { quantity } = event.detail;
  
  // Only show countdown for larger bundles
  if (quantity >= 3) {
    startCountdown(15 * 60); // 15 minutes
  }
});

function startCountdown(seconds) {
  clearInterval(countdownInterval);
  const display = document.querySelector('.bundle-countdown');
  
  countdownInterval = setInterval(() => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    display.textContent = `Special price expires in ${minutes}:${secs.toString().padStart(2, '0')}`;
    
    if (--seconds < 0) {
      clearInterval(countdownInterval);
      display.textContent = 'Offer expired!';
    }
  }, 1000);
}
```

---

### Example 4: Stock Level Warning

Show low stock warning dynamically:

```javascript
document.addEventListener('bundle:selected', (event) => {
  const { quantity, variantId } = event.detail;
  
  // Fetch inventory (requires API endpoint)
  fetch(`/products/inventory?variant=${variantId}`)
    .then(res => res.json())
    .then(data => {
      const available = data.inventory_quantity;
      const warning = document.querySelector('.stock-warning');
      
      if (available < quantity * 10) {
        warning.textContent = `Only ${available} left in stock!`;
        warning.classList.add('show', 'warning');
      } else if (available < quantity * 20) {
        warning.textContent = `Low stock - ${available} available`;
        warning.classList.add('show', 'info');
      } else {
        warning.classList.remove('show');
      }
    });
});
```

---

### Example 5: Loyalty Points Integration

Show loyalty points earned:

```javascript
document.addEventListener('bundle:selected', (event) => {
  const { price, quantity } = event.detail;
  
  // Calculate points (e.g., 1 point per $1)
  const pointsEarned = Math.floor(price / 100);
  const bonusPoints = quantity >= 3 ? 50 : 0;
  const totalPoints = pointsEarned + bonusPoints;
  
  document.querySelector('.loyalty-points').innerHTML = `
    <strong>Earn ${totalPoints} points</strong> with this purchase
    ${bonusPoints > 0 ? `<span class="bonus">(includes ${bonusPoints} bonus!)</span>` : ''}
  `;
});
```

---

### Example 6: Dynamic Button Text

Change button call-to-action based on bundle:

```javascript
document.addEventListener('bundle:selected', (event) => {
  const { quantity, freeGiftVariantId } = event.detail;
  const buttonText = document.querySelector('.enhanced-atc-text');
  
  if (freeGiftVariantId) {
    buttonText.textContent = 'Claim Your Bundle + Free Gift';
  } else if (quantity >= 5) {
    buttonText.textContent = 'Get Best Value Bundle';
  } else if (quantity >= 3) {
    buttonText.textContent = 'Add Bundle to Cart';
  } else {
    buttonText.textContent = 'Add to Cart';
  }
});
```

---

## Advanced Customization

### Extending BundleOffersComponent

Add custom methods to the component:

```javascript
// After component is loaded
const originalInit = BundleOffersComponent.prototype.init;

BundleOffersComponent.prototype.init = function() {
  originalInit.call(this);
  
  // Add your custom initialization
  this.setupCustomFeature();
};

BundleOffersComponent.prototype.setupCustomFeature = function() {
  console.log('Custom feature initialized');
  // Your code here
};
```

---

### Custom Event Dispatching

Create your own events:

```javascript
// Dispatch custom event when bundle added to cart
document.addEventListener('cart:update', (event) => {
  if (event.detail.data.source === 'bundle-offers') {
    const customEvent = new CustomEvent('bundle:added_to_cart', {
      bubbles: true,
      detail: {
        bundleData: sessionStorage.getItem('selectedBundle'),
        cartTotal: event.detail.resource.total_price
      }
    });
    document.dispatchEvent(customEvent);
  }
});

// Listen for your custom event
document.addEventListener('bundle:added_to_cart', (event) => {
  console.log('Bundle added!', event.detail);
});
```

---

## Debugging

### Enable Debug Mode

Add this to your theme to log all events:

```javascript
if (window.location.search.includes('debug=true')) {
  ['bundle:selected', 'variant:update', 'cart:update'].forEach(eventName => {
    document.addEventListener(eventName, (event) => {
      console.group(`🔍 ${eventName}`);
      console.log('Detail:', event.detail);
      console.log('Target:', event.target);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
    });
  });
}
```

Access with: `?debug=true` in URL

---

## API Changelog

### Version 1.0.0 (Current)

- Initial release
- Bundle selection system
- Enhanced add-to-cart button
- AJAX cart integration
- Free gift support
- Event system

---

## Support

For technical questions or integration help:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Review inline code comments
- Open an issue on GitHub

---

**Ready to integrate?** Start with the events system and build from there!
