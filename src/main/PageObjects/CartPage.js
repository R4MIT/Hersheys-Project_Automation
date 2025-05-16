const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.myCartButton = 'a.utility-link.minicart-link';
        this.viewCartButton = 'button.view-cart';
        this.cartItemSelector = '.line-item-name';
        this.cartQuantitySelector = '#quantity';
    }

    /**
     * Verify Cart Page Navigation
     */
    async verifyNavigation() {
        await this._withLogging(async () => {
            await this.page.waitForLoadState("networkidle", { timeout: 10000 });
            const currentUrl = await this.getCurrentUrl();
            const pageTitle = await this.getTitle();
            expect(currentUrl).toBeTruthy();
            expect(currentUrl).toContain("/cart");
            expect(pageTitle).toBeTruthy();
        }, '✔️ Successfully navigated to Cart page.', '❌ Error verifying Cart page navigation.');
    }

    /**
     * Review Cart
     */
    async reviewCart() {
        await this._withLogging(async () => {
            await this.page.locator(this.viewCartButton).click();
        }, 'Reviewing items in the cart.', 'Error reviewing items in the cart.');
    }

    /**
     * Verify that the product is in the cart
     */
    async verifyCartProduct(expectedProductName) {
        await this._withLogging(async () => {
            const cartProductName = await this.page.locator(this.cartItemSelector).textContent();
            expect(cartProductName).toContain(expectedProductName);
        }, `Product '${expectedProductName}' found in cart.`, 'Error verifying product in cart.');
    }

    /**
     * Verify the quantity of the product in the cart
     */
    async verifyCartQuantity(expectedQuantity = 1) {
        await this._withLogging(async () => {
            const cartQuantityText = await this.page.locator(this.cartQuantitySelector).textContent();
            expect(parseInt(cartQuantityText.trim())).toBe(expectedQuantity);
        }, `Product quantity is "${expectedQuantity}".`, 'Error verifying product quantity in cart.');
    }
}

module.exports = { CartPage };
