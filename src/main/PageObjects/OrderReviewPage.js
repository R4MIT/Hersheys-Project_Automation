const { BasePage } = require('./BasePage');

class OrderReviewPage extends BasePage {
    constructor(page) {
        super(page);
        this.checkoutButton = this.page.locator('.checkout-btn');
        this.confirmOrderButton = this.page.locator('.confirm-order-btn');
    }

    async proceedToCheckout() {
        await this._withLogging(async () => {
            await this.checkoutButton.click();
        }, 'Proceeding to checkout.', 'Error during checkout:');
    }

    async confirmOrder() {
        await this._withLogging(async () => {
            await this.confirmOrderButton.click();
        }, 'Order has been placed successfully.', 'Error during order confirmation:');
    }
}

module.exports = { OrderReviewPage };