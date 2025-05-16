const { test, expect } = require('@playwright/test');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const { CartPage } = require('../../main/PageObjects/CartPage');

test.describe('Cart Review Flow', () => {
    test('Review Cart Contents', async ({ browser }) => {

        // Reuse the previous authentication state
        const globalAuthentication = new GlobalAuthentication(browser);
        const page = await globalAuthentication.useAuth();
        const cartPage = new CartPage(page);

        // Act
        await cartPage.reviewCart();
        await page.waitForLoadState('networkidle');

        // Assert
        const cartItems = await page.locator('.cart-item').count();
        console.log("Number of items in cart: ", cartItems);
        expect(cartItems).toBeGreaterThan(0);
    });
});
