const { test, expect } = require('@playwright/test');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const { ChocolateAndCandyPage } = require('../../main/PageObjects/ChocolateAndCandyPage');


test.describe.serial('Product Selection Flow', () => {

    test('Select a Product from Chocolate and Candy', async ({ page }) => {

        // Initialize the Chocolate and Candy page object correctly
        const chocolateAndCandyPage = new ChocolateAndCandyPage(page);

        //Performing Actions
        await chocolateAndCandyPage.getTitle();
        await chocolateAndCandyPage.getCurrentUrl();

        // List all candies and select a product
        await chocolateAndCandyPage.listAllCandiesOnCncPage();

        // Assert the specific product is visible
        const productName = "JOLLY RANCHER Freeze Dried Original Fruit Flavored Candy  Bag, 3.1 oz";
        await chocolateAndCandyPage.assertProductVisibility(productName);

        // Click the product
        await chocolateAndCandyPage.selectProduct(productName);
        await page.waitForLoadState('networkidle');

        // Verify that navigation actually happened
        const currentUrl = page.url();
        console.log(`Navigated to Product Page URL: ${currentUrl}`);

        console.log("Successfully navigated to the Selected Product page.");

    });
});