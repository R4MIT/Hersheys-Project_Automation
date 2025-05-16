const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class SelectedProductPage extends BasePage {
    constructor(page) {
        super(page);
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to Cart' });
        this.productTitle = this.page.locator('//div[contains(@class, "primary-details")]//h1');
        this.clickOnMyCart = this.page.locator('a.utility-link.minicart-link');
    }

    async validateProductPage(productName) {
        await this._withLogging(async () => {
            await this.productTitle.waitFor({ state: 'visible', timeout: 5000 });
            const title = (await this.productTitle.textContent()).trim().replace(/\s+/g, ' ');
            if (!productName) {
                throw new Error("Product name is undefined in testData. Check your test data configuration.");
            }
            expect(title).toContain(productName);
        }, 'Product page validated.', 'Error validating product page:');
    }

    async clickAddToCart() {
        await this._withLogging(async () => {
            await this.addToCartButton.click();
        }, 'Product added to cart successfully!', 'Error clicking Add to Cart button:');
    }

    async clickMyCart() {
        await this._withLogging(async () => {
            await this.clickOnMyCart.click();
        }, 'Navigated to My Cart.', 'Error clicking My Cart:');
    }
}

module.exports = { SelectedProductPage };
