const { test, expect } = require('@playwright/test');
const { OrderReviewPage } = require('../../main/PageObjects/OrderReviewPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');

const logStep = (msg) => console.log(`✔️ ${msg}`);

async function setupOrderTest(browser) {
    const globalAuthentication = new GlobalAuthentication(browser);
    const page = await globalAuthentication.invokeBrowser();
    return {
        page,
        globalAuthentication,
        orderReviewPage: new OrderReviewPage(page)
    };
}

test.describe('Order Checkout', () => {
    test('Order Checkout Flow', async ({ browser }) => {
        try {
            const { page, globalAuthentication, orderReviewPage } = await setupOrderTest(browser);
            await orderReviewPage.navigateToURL(testData.url);
            await globalAuthentication.acceptCookies();
            logStep('Cookies accepted.');
            await orderReviewPage.verifyNavigation();
            await orderReviewPage.proceedToCheckout();
            await orderReviewPage.confirmOrder();
            await orderReviewPage.waitForNavigation();
            const confirmationText = await page.locator('.order-confirmation-message').textContent();
            logStep(`Order Confirmation Message: ${confirmationText}`);
            expect(confirmationText).toContain('Thank you for your order');
            logStep('Order placed and confirmed!');
        } catch (error) {
            console.error('❌ Error during Order Checkout: ', error);
            throw error;
        }
    });
});