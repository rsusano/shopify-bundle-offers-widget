# Changelog

All notable changes to the Shopify Bundle Offers Widget will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-01-26

### 🎉 Initial Release

The first production-ready version of the Shopify Bundle Offers Widget.

### ✨ Added

#### Bundle Widget Features
- **3-Tier Bundle System** - Configurable quantity-based bundles (e.g., Buy 1, Buy 2 Get 1 Free, Buy 3 Get 2 Free)
- **Flexible Pricing Models** - Choice between percentage discounts or fixed pricing
- **Dynamic Price Calculations** - Automatic savings calculations with real-time updates
- **Free Gift Support** - Ability to attach free products to any bundle with quantity control
- **Visual Indicators** - Product images, quantity badges, free gift badges, and custom bundle badges
- **Radio Button Selection** - Intuitive single-selection interface for bundles
- **Real-time Quantity Sync** - Automatic synchronization of quantity inputs across the page

#### Enhanced Add-to-Cart Button
- **Dynamic Price Display** - Shows current bundle price on the button
- **Compare-At Price Display** - Crossed-out original price next to sale price
- **Customizable Guarantee Text** - Trust-building guarantee message below button
- **Full Style Customization** - Colors, padding, fonts, border radius all adjustable
- **Smooth State Animations** - CSS-powered loading and success states
- **Bundle Integration** - Automatically updates when bundle selection changes
- **Variant Compatibility** - Works with product variant selectors

#### Technical Features
- **Custom Elements (Web Components)** - Modern JavaScript architecture
- **Event-Driven System** - `bundle:selected`, `variant:update`, `cart:update` events
- **AJAX Cart Integration** - Seamless add-to-cart without page reload
- **Cart Drawer Compatible** - Works with Shopify's native cart drawer
- **Bundle Properties** - Items linked in cart with special properties for tracking
- **Session Persistence** - Selected bundle saved across page navigations
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Multi-Currency Support** - Automatic currency detection and formatting
- **Error Handling** - Graceful fallbacks and user-friendly error messages

#### Theme Customizer Integration
- **All Settings Available** - No code editing required for basic customization
- **Live Preview** - See changes instantly in theme customizer
- **Per-Bundle Configuration** - Independent settings for each bundle tier
- **Color Schemes** - Full color customization for all elements
- **Typography Control** - Separate font size settings for desktop and mobile
- **Spacing Options** - Granular control over padding and gaps

### 📚 Documentation

- **Comprehensive README** - Feature overview, installation guide, and quick start
- **Installation Guide** - Step-by-step installation with screenshots
- **Customization Guide** - Use cases, examples, and advanced configurations
- **API Documentation** - Complete JavaScript API reference
- **Troubleshooting Guide** - Common issues and solutions
- **Screenshot Guides** - Instructions for creating visual documentation
- **Video Recording Guide** - How to create demo videos

### 🏗️ Project Structure

```
shopify-bundle-offers-widget/
├── blocks/
│   ├── product-bundle-offers.liquid
│   └── add-to-cart.liquid
├── snippets/
│   └── add-to-cart-button-enhanced.liquid
├── assets/
│   ├── bundle-offers.js
│   └── enhanced-add-to-cart.js
├── docs/
│   ├── INSTALLATION.md
│   ├── CUSTOMIZATION.md
│   ├── API.md
│   ├── TROUBLESHOOTING.md
│   ├── images/
│   │   └── README.md
│   └── videos/
│       └── README.md
├── README.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

### 🎨 Default Styling

- **Bundle Border**: `#E0E0E0`
- **Selected Border**: `#006241`
- **Button Background**: `#2F7A5E`
- **Button Hover**: `#235A46`
- **Free Gift Badge**: `#00A67E`
- **Compare Price**: `#CCCCCC` with line-through

### 🔧 Default Configurations

- **Bundle 1**: 1 item, 0% discount, "Buy One"
- **Bundle 2**: 3 items, 35% discount, "Buy 2, Get 1 FREE" (selected by default)
- **Bundle 3**: 5 items, 40% discount, "Buy 3, Get 2 FREE"

---

## [Unreleased]

### Planned Features

- Countdown timer for limited-time bundle promotions
- Quantity-based tiered pricing (e.g., 2-4 items = 10% off, 5+ items = 20% off)
- Multi-product bundles (mix and match different products)
- Bundle recommendations based on cart contents
- A/B testing integration
- Advanced analytics tracking hooks
- Subscription bundle options
- Gift wrapping add-on
- Product recommendations carousel
- Stock level warnings
- Social proof ("X people bought this bundle today")

### Under Consideration

- Bundle builder (let customers create their own bundles)
- Volume discount table display
- Progress bar to next discount tier
- Upsell modal on add-to-cart
- Cross-sell related bundles
- Save bundle as wish list item

---

## Version History

- **1.0.0** (2026-01-26) - Initial release

---

## Support

For questions, bug reports, or feature requests:
- **GitHub Issues**: [Link to repository issues]
- **Email**: [Your email]
- **Documentation**: [Link to docs]

---

## Contributors

- [Your Name] - Initial work and development

---

## Acknowledgments

- Shopify Developer Community
- Web Components standards
- Modern JavaScript best practices
- All beta testers and early adopters

---

**Thank you for using Shopify Bundle Offers Widget!** 🎁
