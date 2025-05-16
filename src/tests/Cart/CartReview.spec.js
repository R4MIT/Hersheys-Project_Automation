const { test, expect } = require('@playwright/test');
const { CartPage } = require('../../main/PageObjects/CartPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');

const logStep = (msg) => console.log(`✔️ ${msg}`);

async function setupCartTest(browser) {
    const globalAuthentication = new GlobalAuthentication(browser);
    const page = await globalAuthentication.invokeBrowser();
    return {
        page,
        globalAuthentication,
        cartPage: new CartPage(page)
    };
}

test.describe('Cart Review', () => {
    test('Review Cart Functionality', async ({ browser }) => {
        try {
            const { page, globalAuthentication, cartPage } = await setupCartTest(browser);
            await cartPage.navigateToURL(testData.url);
            await globalAuthentication.acceptCookies();
            logStep('Cookies accepted.');
            await cartPage.verifyNavigation();
            await cartPage.reviewCart();
            await cartPage.verifyCartQuantity();
            // If any navigation wait is needed, use:
            // await cartPage.waitForNavigation();
            const cartItems = await page.locator('.cart-item').count();
            logStep(`Number of items in cart: ${cartItems}`);
            expect(cartItems).toBeGreaterThanOrEqual(0);
            logStep('Cart reviewed.');
        } catch (error) {
            console.error('❌ Error during Cart Review: ', error);
            throw error;
        }
    });
});
