/**
 * Enhanced Add to Cart Button
 * Listens for bundle selection changes and updates the price display on the button
 */

class EnhancedAddToCartComponent extends HTMLElement {
  constructor() {
    super();
    this.priceElement = this.querySelector('[data-enhanced-atc-price]');
    this.comparePriceElement = this.querySelector('[data-enhanced-atc-compare-price]');
    this.initializeListeners();
  }

  connectedCallback() {
    console.log('Enhanced Add to Cart: Initialized');
    console.log('Data attributes:', {
      showPrice: this.dataset.showPrice,
      showGuarantee: this.dataset.showGuarantee,
      guaranteeText: this.dataset.guaranteeText,
      separator: this.dataset.separator
    });
  }

  initializeListeners() {
    // Listen for bundle selection changes
    document.addEventListener('bundle:selected', (event) => {
      console.log('Enhanced ATC: Bundle selected', event.detail);
      this.updatePrice(event.detail);
    });

    // Listen for variant changes
    document.addEventListener('variant:update', (event) => {
      console.log('Enhanced ATC: Variant changed', event.detail);
      if (event.detail && event.detail.price) {
        this.updatePriceValue(event.detail.price);
      }
    });
  }

  updatePrice(bundleData) {
    if (!this.priceElement) return;

    const price = bundleData.price || bundleData.formattedPrice;
    const comparePrice = bundleData.comparePrice || bundleData.formattedComparePrice;
    
    if (price) {
      // If price is already formatted (starts with currency symbol)
      if (typeof price === 'string' && (price.includes('$') || price.includes('₱'))) {
        this.priceElement.textContent = price;
      } else {
        // Price is in cents, format it
        this.updatePriceValue(price);
      }
      
      console.log('Enhanced ATC: Price updated to', this.priceElement.textContent);
    }

    // Update compare price if it exists
    if (this.comparePriceElement && comparePrice) {
      if (typeof comparePrice === 'string' && (comparePrice.includes('$') || comparePrice.includes('₱'))) {
        this.comparePriceElement.textContent = comparePrice;
      } else {
        // Price is in cents, format it
        const formattedComparePrice = this.formatMoney(comparePrice);
        this.comparePriceElement.textContent = formattedComparePrice;
      }
      
      console.log('Enhanced ATC: Compare price updated to', this.comparePriceElement.textContent);
    }
  }

  updatePriceValue(priceInCents) {
    if (!this.priceElement) return;

    // Format the price using Shopify's money format
    const formattedPrice = this.formatMoney(priceInCents);
    this.priceElement.textContent = formattedPrice;
    
    console.log('Enhanced ATC: Price value updated to', formattedPrice);
  }

  formatMoney(cents) {
    if (typeof cents === 'string') {
      cents = parseFloat(cents.replace(/[^0-9.-]+/g, ''));
    }
    
    const amount = (cents / 100).toFixed(2);
    
    // Try to get currency symbol from existing price elements
    const existingPrice = document.querySelector('.price-item--regular .price, .product__price .price');
    let currencySymbol = '$';
    
    if (existingPrice) {
      const priceText = existingPrice.textContent.trim();
      const symbolMatch = priceText.match(/^[^\d\s]+/);
      if (symbolMatch) {
        currencySymbol = symbolMatch[0];
      }
    }
    
    // Format: $XX.XX (symbol at front)
    return `${currencySymbol}${amount}`;
  }
}

// Register the custom element
if (!customElements.get('enhanced-add-to-cart-component')) {
  customElements.define('enhanced-add-to-cart-component', EnhancedAddToCartComponent);
  console.log('Enhanced Add to Cart: Custom element registered');
} else {
  console.log('Enhanced Add to Cart: Element already registered');
}

console.log('Enhanced Add to Cart: Script loaded');
