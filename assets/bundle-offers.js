class BundleOffersComponent extends HTMLElement {
  constructor() {
    super();
    this.radios = this.querySelectorAll('input[type="radio"]');
    this.items = this.querySelectorAll('.product-bundle-offers__item');
    this.productForm = null;
    this.quantityInput = null;
    this.selectedBundle = null;
    this.init();
  }

  init() {
    // Find the product form
    this.findProductForm();
    
    this.radios.forEach(radio => {
      radio.addEventListener('change', (e) => this.handleSelection(e));
    });

    // Initialize with selected bundle
    const checked = this.querySelector('input[type="radio"]:checked');
    if (checked) {
      this.selectedBundle = checked;
      this.updateSelection(checked);
      this.updateQuantityInput(checked);
      this.updateAllButtons(checked);
    }

    // Intercept form submission to add free gifts
    this.interceptFormSubmission();
  }

  findProductForm() {
    // Find the product form - try multiple selectors
    this.productForm = document.querySelector('form[action*="/cart/add"]') ||
                       document.querySelector('product-form form') ||
                       document.querySelector('.product-form form') ||
                       document.querySelector('[data-product-form]');
    
    if (this.productForm) {
      // Find quantity input within the form or page
      this.quantityInput = this.productForm.querySelector('input[name="quantity"]') ||
                           document.querySelector('input[name="quantity"]') ||
                           document.querySelector('.quantity__input') ||
                           document.querySelector('[data-quantity-input]');
    }
  }

  interceptFormSubmission() {
    if (!this.productForm) {
      console.log('Bundle Offers: No product form found');
      return;
    }

    // Store reference to this component
    const component = this;

    // Find the add to cart button
    const addToCartButton = this.productForm.querySelector('[name="add"]') || 
                           this.productForm.querySelector('button[type="submit"]');

    if (addToCartButton) {
      addToCartButton.addEventListener('click', async function(e) {
        const selectedRadio = component.selectedBundle;
        if (!selectedRadio) {
          console.log('Bundle Offers: No bundle selected');
          return;
        }

        const freeGiftVariantId = selectedRadio.dataset.freeGiftVariantId;
        const freeGiftQuantity = parseInt(selectedRadio.dataset.freeGiftQuantity) || 0;

        console.log('Bundle Offers: Free gift variant ID:', freeGiftVariantId, 'Quantity:', freeGiftQuantity);

        // Always intercept to handle bundle logic
        e.preventDefault();
        e.stopPropagation();
        
        // Get the main product data
        const mainVariantId = selectedRadio.dataset.variantId;
        const mainQuantity = parseInt(selectedRadio.dataset.quantity);
        
        // Prepare cart items
        const items = [];
        
        // If there's a free gift, we need to link them with bundle IDs
        if (freeGiftVariantId && freeGiftQuantity > 0) {
          // Generate a unique bundle ID to link main product and free gift
          const bundleId = `bundle_${Date.now()}_${mainVariantId}`;
          
          // Add main product with bundle properties
          items.push({
            id: parseInt(mainVariantId),
            quantity: mainQuantity,
            properties: {
              '_bundle_id': bundleId,
              '_bundle_main': 'true',
              '_has_free_gift': 'true'
            }
          });
          
          // Add free gift with bundle properties
          items.push({
            id: parseInt(freeGiftVariantId),
            quantity: freeGiftQuantity,
            properties: {
              '_Free Gift': 'Yes',
              '_bundle_id': bundleId,
              '_bundle_gift': 'true',
              '_linked_to_variant': mainVariantId.toString()
            }
          });
        } else {
          // No free gift, just add the main product normally
          items.push({
            id: parseInt(mainVariantId),
            quantity: mainQuantity
          });
        }

        console.log('Bundle Offers: Adding items to cart:', items);

        try {
          // Show loading state
          addToCartButton.disabled = true;
          addToCartButton.classList.add('loading');
          
          // Store the original button HTML (not just text)
          const originalHTML = addToCartButton.innerHTML;

          // Add items to cart via AJAX
          const response = await fetch('/cart/add.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ items: items })
            });

          const result = await response.json();
          console.log('Bundle Offers: Cart response:', result);

          if (response.ok) {
            console.log('Bundle Offers: Items added successfully, triggering cart update...');
            
            // Show success state briefly
            addToCartButton.classList.add('atc-added');
            addToCartButton.classList.remove('loading');
            
            // Reset button after animation
            setTimeout(() => {
              addToCartButton.classList.remove('atc-added');
              addToCartButton.disabled = false;
            }, 2000);
            
            // Dispatch the theme's cart update event (CartAddEvent) that triggers cart drawer
            // Event name is 'cart:update' as defined in ThemeEvents.cartUpdate
            const cartUpdateEvent = new CustomEvent('cart:update', {
              bubbles: true,
              detail: {
                resource: result,
                sourceId: mainVariantId.toString(),
                data: {
                  source: 'bundle-offers',
                  itemCount: result.item_count || result.items?.length || 0,
                  productId: component.getAttribute('data-product-id'),
                  variantId: mainVariantId.toString()
                }
              }
            });
            
            document.dispatchEvent(cartUpdateEvent);
            console.log('Bundle Offers: Dispatched cart:update event with detail:', cartUpdateEvent.detail);
            
            // Wait a bit, then directly open the cart drawer
            setTimeout(() => {
              const cartDrawer = document.querySelector('cart-drawer-component');
              
              if (cartDrawer) {
                console.log('Bundle Offers: Found cart-drawer-component, opening...');
                
                // Call the open method
                if (typeof cartDrawer.open === 'function') {
                  cartDrawer.open();
                  console.log('Bundle Offers: Called cartDrawer.open()');
                } else if (typeof cartDrawer.showDialog === 'function') {
                  cartDrawer.showDialog();
                  console.log('Bundle Offers: Called cartDrawer.showDialog()');
                }
              } else {
                console.log('Bundle Offers: cart-drawer-component not found');
              }

              // Also trigger a cart fetch to refresh the drawer content
              fetch(window.location.origin + '/cart.js')
                .then(res => res.json())
                .then(cart => {
                  console.log('Bundle Offers: Fetched updated cart:', cart);
                  
                  // Update cart count
                  const cartCount = document.querySelector('.cart-count-bubble');
                  if (cartCount) {
                    cartCount.textContent = cart.item_count;
                    if (cart.item_count > 0) {
                      cartCount.classList.remove('hidden');
                    }
                  }
                });

              // If on cart page, reload
              if (window.location.pathname === '/cart') {
                window.location.reload();
              }
            }, 500);

          } else {
            console.error('Bundle Offers: Failed to add to cart', result);
            addToCartButton.classList.remove('loading');
            addToCartButton.disabled = false;
            alert('Failed to add items to cart. Please try again.');
          }
        } catch (error) {
          console.error('Bundle Offers: Error adding to cart:', error);
          addToCartButton.classList.remove('loading');
          addToCartButton.disabled = false;
          alert('Error adding items to cart. Please try again.');
        }
      }, true); // Use capture phase to intercept before other handlers
    }
  }

  handleSelection(e) {
    const radio = e.target;
    this.selectedBundle = radio;
    this.updateSelection(radio);
    this.updateQuantityInput(radio);
    this.updateAllButtons(radio);
  }

  updateSelection(radio) {
    this.items.forEach(item => item.classList.remove('is-selected'));
    radio.closest('.product-bundle-offers__item').classList.add('is-selected');
  }

  updateQuantityInput(radio) {
    const quantity = parseInt(radio.dataset.quantity);
    
    // Update via multiple methods to ensure it works
    const quantitySelectors = [
      'input[name="quantity"]',
      '.quantity__input',
      '[data-quantity-input]',
      'quantity-selector input',
      '.quantity-input input',
      '.product-form__quantity input'
    ];

    quantitySelectors.forEach(selector => {
      const inputs = document.querySelectorAll(selector);
      inputs.forEach(input => {
        if (input) {
          input.value = quantity;
          // Trigger multiple event types to ensure frameworks pick up the change
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          
          // For custom elements, try to call their update methods
          const quantitySelector = input.closest('quantity-selector');
          if (quantitySelector && typeof quantitySelector.updateQuantity === 'function') {
            quantitySelector.updateQuantity(quantity);
          }
        }
      });
    });

    // Also update any quantity display elements
    const quantityDisplays = document.querySelectorAll('.quantity-selector__value, .quantity__current');
    quantityDisplays.forEach(display => {
      display.textContent = quantity;
    });

    // Store the selected quantity as a data attribute for form submission
    if (this.productForm) {
      this.productForm.dataset.bundleQuantity = quantity;
    }
  }

  updateAllButtons(radio) {
    const price = parseInt(radio.dataset.price);
    const formattedPrice = this.formatMoney(price);
    const hasFreeGift = radio.dataset.freeGiftVariantId ? true : false;
    const freeGiftTitle = radio.dataset.freeGiftTitle || '';
    
    // Update Add to Cart buttons
    this.updateAddToCartButtons(formattedPrice, hasFreeGift, freeGiftTitle);
    
    // Update Accelerated Checkout / Buy Now buttons
    this.updateAcceleratedCheckout(formattedPrice);
    
    // Dispatch event for other components
    this.dispatchBundleEvent(radio);
  }

  updateAddToCartButtons(formattedPrice, hasFreeGift, freeGiftTitle) {
    // Multiple selectors for different theme structures
    const buttonSelectors = [
      'button[name="add"]',
      '.product-form__submit',
      '.add-to-cart-button',
      '[data-add-to-cart]',
      '.product-form button[type="submit"]',
      'product-form button[type="submit"]'
    ];

    buttonSelectors.forEach(selector => {
      const buttons = document.querySelectorAll(selector);
      buttons.forEach(button => {
        if (button && !button.closest('.shopify-payment-button')) {
          // Check if this is an enhanced add-to-cart button
          const priceElement = button.querySelector('[data-enhanced-atc-price]');
          const comparePriceElement = button.querySelector('[data-enhanced-atc-compare-price]');
          
          if (priceElement) {
            // Enhanced button - just update the price element
            priceElement.textContent = formattedPrice;
            console.log('[BundleOffers] Updated enhanced button price to:', formattedPrice);
            
            // Update compare-at price if it exists
            if (comparePriceElement) {
              const radio = this.selectedBundle;
              const comparePrice = parseInt(radio.dataset.comparePrice);
              if (comparePrice) {
                const formattedComparePrice = this.formatMoney(comparePrice);
                comparePriceElement.textContent = formattedComparePrice;
                console.log('[BundleOffers] Updated compare price to:', formattedComparePrice);
              }
            }
          } else {
            // Regular button - update entire text
            // Store original text
            if (!button.dataset.originalText) {
              button.dataset.originalText = button.textContent.trim();
            }
            
            // Find the text element inside the button
            const textElement = button.querySelector('span') || 
                               button.querySelector('.button-label') || 
                               button;
            
            if (textElement) {
              let buttonText = `Add to cart - ${formattedPrice}`;
              if (hasFreeGift) {
                buttonText += ' + FREE Gift';
              }
              textElement.textContent = buttonText;
            }
          }
        }
      });
    });
  }

  updateAcceleratedCheckout(formattedPrice) {
    // Update Shopify Payment Button / Buy Now
    const acceleratedSelectors = [
      '.shopify-payment-button button',
      '.shopify-payment-button__button',
      '[data-shopify-buttoncontainer] button',
      '.dynamic-checkout__button'
    ];

    acceleratedSelectors.forEach(selector => {
      const buttons = document.querySelectorAll(selector);
      buttons.forEach(button => {
        if (button) {
          // Store original text
          if (!button.dataset.originalText) {
            button.dataset.originalText = button.textContent.trim();
          }
          
          // Find text element
          const textElement = button.querySelector('span') || button;
          if (textElement && textElement.textContent) {
            // Preserve "Buy now with" prefix if present
            const originalText = button.dataset.originalText;
            if (originalText.toLowerCase().includes('buy')) {
              textElement.textContent = `Buy now - ${formattedPrice}`;
            } else {
              textElement.textContent = `${originalText} - ${formattedPrice}`;
            }
          }
        }
      });
    });
  }

  dispatchBundleEvent(radio) {
    const price = parseInt(radio.dataset.price);
    const comparePrice = parseInt(radio.dataset.comparePrice);
    const quantity = parseInt(radio.dataset.quantity);
    const freeGiftVariantId = radio.dataset.freeGiftVariantId;
    const freeGiftQuantity = parseInt(radio.dataset.freeGiftQuantity) || 0;
    
    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('bundle:selected', {
      bubbles: true,
      detail: {
        price: price,
        comparePrice: comparePrice,
        quantity: quantity,
        formattedPrice: this.formatMoney(price),
        formattedComparePrice: this.formatMoney(comparePrice),
        freeGiftVariantId: freeGiftVariantId,
        freeGiftQuantity: freeGiftQuantity
      }
    }));

    // Also store in sessionStorage for persistence
    sessionStorage.setItem('selectedBundle', JSON.stringify({
      price: price,
      quantity: quantity,
      comparePrice: comparePrice,
      freeGiftVariantId: freeGiftVariantId,
      freeGiftQuantity: freeGiftQuantity
    }));
  }

  formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    // Try to use Shopify's money format
    if (window.Shopify && window.Shopify.currency) {
      const formatter = new Intl.NumberFormat(window.Shopify.locale || 'en-US', {
        style: 'currency',
        currency: window.Shopify.currency.active || 'PHP'
      });
      return formatter.format(amount);
    }
    // Fallback
    return `₱${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }
}

if (!customElements.get('bundle-offers-component')) {
  customElements.define('bundle-offers-component', BundleOffersComponent);
}
