const { BasePage } = require('./BasePage');

class ChocolateAndCandyPage extends BasePage {
    constructor(page) {
        super(page);
        this.productGridCandy = this.page.locator('#hersheys-chocolate-candy-candy-section .product-grid .image-container a.image-link img', { timeout: 5000 });
    }

    async listAllCandiesOnCncPage() {
        await this._withLogging(async () => {
            await this.productGridCandy.first().waitFor();
            const productCount = await this.productGridCandy.count();
            for (let i = 0; i < productCount; i++) {
                const productName = await this.productGridCandy.nth(i).getAttribute('alt');
                const normalizedProductName = productName.replace(/\s+/g, ' ').trim();
                this._log(`Product ${i + 1}: ${normalizedProductName}`);
            }
        }, 'Listed all candies on Chocolate and Candy page.', 'Error listing candies:');
    }

    async matchAndSelectProductPartial(productName) {
        await this._withLogging(async () => {
            const normalizedTargetName = productName.replace(/\s+/g, ' ').trim().toLowerCase();
            await this.productGridCandy.first().waitFor();
            for (let i = 0; i < await this.productGridCandy.count(); i++) {
                const prodName = await this.productGridCandy.nth(i).getAttribute('alt');
                const normalizedProductName = prodName.replace(/\s+/g, ' ').trim().toLowerCase();
                if (normalizedProductName.includes(normalizedTargetName)) {
                    await this.productGridCandy.nth(i).click();
                    return;
                }
            }
            throw new Error(`No product partially matching "${productName}" found on the page.`);
        }, 'Matched and selected product by partial name.', 'Error during product selection.');
    }
}

module.exports = { ChocolateAndCandyPage };