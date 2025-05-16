// ProductSelectionAndCart.spec.js
const { test, expect } = require('@playwright/test');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const { SelectedProductPage } = require('../../main/PageObjects/SelectedProductPage');


test.describe('Verify Product Selection', () => {

    test('Add Product to Cart', async ({ browser }) => {

        // Reuse the previous session by loading the storage state
        const globalAuthentication = new GlobalAuthentication(browser);
        const page = await globalAuthentication.useAuth();

        // Initialize Selected Product Page
        const selectedProductPage = new SelectedProductPage(page);

        // Validate the selected Product
        await selectedProductPage.validateProductPage("JOLLY RANCHER Freeze Dried Original Fruit Flavored Candy  Bag, 3.1 oz");

        // Perform actions
        await selectedProductPage.clickAddToCart();
        console.log("Product added to cart successfully!");

        // Add to Cart
        await productDetailsPage.addToCart();
        await page.waitForLoadState('networkidle');

        // Navigate to the Cart page and verify
        await productDetailsPage.reviewCart();
        console.log("Product successfully added to cart and reviewed.");

        // Store the state for the next test
        await page.context().storageState({ path: 'state.json' });
    });
});