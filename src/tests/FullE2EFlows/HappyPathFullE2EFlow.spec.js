const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../main/PageObjects/DashboardPage');
const { ChocolateAndCandyPage } = require('../../main/PageObjects/ChocolateAndCandyPage');
const { SelectedProductPage } = require('../../main/PageObjects/SelectedProductPage');
const { CartPage } = require('../../main/PageObjects/CartPage');
const { OrderReviewPage } = require('../../main/PageObjects/OrderReviewPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');

// Logger utility for concise step logging
const logStep = (msg) => console.log(`✔️ ${msg}`);

// Modular setup for all page objects and authentication
async function setupE2E(browser) {
    const globalAuthentication = new GlobalAuthentication(browser);
    const page = await globalAuthentication.invokeBrowser();
    return {
        page,
        globalAuthentication,
        dashboardPage: new DashboardPage(page),
        chocolateAndCandyPage: new ChocolateAndCandyPage(page),
        selectedProductPage: new SelectedProductPage(page),
        cartPage: new CartPage(page),
        orderReviewPage: new OrderReviewPage(page)
    };
}

test.describe.serial('Full E2E Flow - Dashboard to Order Confirmation', () => {
    test('Complete Purchase Flow', async ({ browser }) => {
        console.log("=== Starting E2E Flow ===");

        try {
            const {
                page,
                globalAuthentication,
                dashboardPage,
                chocolateAndCandyPage,
                selectedProductPage,
                cartPage,
                orderReviewPage
            } = await setupE2E(browser);

            await dashboardPage.navigateToURL(testData.url);
            await dashboardPage.verifyNavigation();
            await globalAuthentication.acceptCookies();
            logStep('Cookies accepted.');
            await dashboardPage.clickOnChocolateAndCandyTab();
            logStep('Navigated to Chocolate and Candy section.');

            await chocolateAndCandyPage.verifyNavigation();
            await chocolateAndCandyPage.listAllCandiesOnCncPage();
            await chocolateAndCandyPage.matchAndSelectProductPartial(testData.productNamePartial);
            logStep('Product matched and selected.');
            await selectedProductPage.waitForNavigation();
            logStep('Navigated to Selected Product page.');

            await selectedProductPage.validateProductPage(testData.productName);
            await selectedProductPage.clickAddToCart();
            await selectedProductPage.clickMyCart();

            await cartPage.verifyNavigation();
            await cartPage.reviewCart();
            await cartPage.verifyCartQuantity();

            const cartItems = await page.locator('.cart-item').count();
            logStep(`Number of items in cart: ${cartItems}`);
            expect(cartItems).toBeGreaterThan(0);
            logStep('Cart reviewed.');

            await orderReviewPage.proceedToCheckout();
            await orderReviewPage.confirmOrder();
            await page.waitForLoadState('networkidle');

            const confirmationText = await page.locator('.order-confirmation-message').textContent();
            logStep(`Order Confirmation Message: ${confirmationText}`);
            expect(confirmationText).toContain('Thank you for your order');
            logStep('Order placed and confirmed!');
        } catch (error) {
            console.error('❌ Error during E2E Flow: ', error);
            throw error;
        }

        console.log("=== E2E Flow Completed Successfully ===");
    });
});
