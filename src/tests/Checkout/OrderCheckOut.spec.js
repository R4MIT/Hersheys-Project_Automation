const { test, expect } = require('@playwright/test');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const { OrderReviewPage } = require('../../main/PageObjects/OrderReviewPage');

test.describe('Order Placement Flow and Checkout Tests', () => {

    test('Proceed to Checkout and Confirm Order', async ({ browser }) => {

        // Reuse the previous authentication state
        const globalAuthentication = new GlobalAuthentication(browser);
        const page = await globalAuthentication.useAuth();

        const orderReviewPage = new OrderReviewPage(page);

        // Proceed to Checkout and Place the Order
        await orderReviewPage.proceedToCheckout();
        await orderReviewPage.confirmOrder();
        await page.waitForLoadState('networkidle');

        // Assert
        const confirmationText = await page.locator('.order-confirmation-message').textContent();
        console.log("Order Confirmation Message: ", confirmationText);
        expect(confirmationText).toContain('Thank you for your order');
    });
});