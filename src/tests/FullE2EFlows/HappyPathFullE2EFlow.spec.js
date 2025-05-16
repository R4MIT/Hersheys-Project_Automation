const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../main/PageObjects/DashboardPage');
const { ChocolateAndCandyPage } = require('../../main/PageObjects/ChocolateAndCandyPage');
const { SelectedProductPage } = require('../../main/PageObjects/SelectedProductPage');
const { CartPage } = require('../../main/PageObjects/CartPage');
const { OrderReviewPage } = require('../../main/PageObjects/OrderReviewPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');

test.describe.serial('Full E2E Flow - Dashboard to Order Confirmation', () => {

    test('Complete Purchase Flow', async ({ browser }) => {
        console.log("=== Starting E2E Flow ===");

        try {
            // Step 1: Initialize and Navigate to Dashboard
            console.log("Navigating to Dashboard...");
            const globalAuthentication = new GlobalAuthentication(browser);
            const page = await globalAuthentication.invokeBrowser();

            const dashboardPage = new DashboardPage(page);
            const chocolateAndCandyPage = new ChocolateAndCandyPage(page);
            const selectedProductPage = new SelectedProductPage(page);
            const cartPage = new CartPage(page);
            const orderReviewPage = new OrderReviewPage(page);

            await dashboardPage.navigateToURL(testData.url);
            await dashboardPage.verifyNavigation();
            await globalAuthentication.acceptCookies();
            console.log("✔️ Cookies accepted.");
            await dashboardPage.clickOnChocolateAndCandyTab();
            console.log("✔️ Successfully navigated to Chocolate and Candy section.");

            // Step 2: Navigate to Chocolate and Candy Page and Select Product
            await chocolateAndCandyPage.verifyNavigation();
            await chocolateAndCandyPage.listAllCandiesOnCncPage();
            await chocolateAndCandyPage.matchAndSelectProductPartial(testData.productNamePartial);
            console.log("✔️ Product matched and selected successfully.");
            await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 });
            console.log("✔️ Now, navigated to Selected Product page.");

            // Step 3: Verify Product Selection and Add to Cart
            await selectedProductPage.validateProductPage(testData.productName);
            await selectedProductPage.clickAddToCart();
            await selectedProductPage.clickMyCart();

            // Step 4: Review Cart Page and Checkout
            await cartPage.verifyNavigation();
            await cartPage.reviewCart();
            await cartPage.verifyCartQuantity();

            const cartItems = await page.locator('.cart-item').count();
            console.log("🛒 Number of items in cart: ", cartItems);
            expect(cartItems).toBeGreaterThan(0);
            console.log("✔️ Cart reviewed successfully.");

            // Step 5: Proceed to Checkout and Confirm Order
            await orderReviewPage.proceedToCheckout();
            await orderReviewPage.confirmOrder();
            await page.waitForLoadState('networkidle');

            // Step 6: Validate Order Confirmation
            const confirmationText = await page.locator('.order-confirmation-message').textContent();
            console.log("Order Confirmation Message: ", confirmationText);
            expect(confirmationText).toContain('Thank you for your order');
            console.log("✔️ Order placed and confirmed successfully!");

            console.log("=== E2E Flow Completed Successfully ===");
        } catch (error) {
            console.error("❌ Error during E2E Flow: ", error);
            throw error;
        }
    });
});
