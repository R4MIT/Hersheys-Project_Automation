// ProductSelectionAndCart.spec.js
const { test, expect } = require('@playwright/test');
const { SelectedProductPage } = require('../../main/PageObjects/SelectedProductPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');


const logStep = (msg) => console.log(`✔️ ${msg}`);

async function setupProductTest(browser) {
    const globalAuthentication = new GlobalAuthentication(browser);
    const page = await globalAuthentication.invokeBrowser();
    return {
        page,
        globalAuthentication,
        selectedProductPage: new SelectedProductPage(page)
    };
}

test.describe('Product Selection', () => {
    test('Verify Product Selection', async ({ browser }) => {
        try {
            const { page, globalAuthentication, selectedProductPage } = await setupProductTest(browser);
            await selectedProductPage.navigateToURL(testData.url);
            await globalAuthentication.acceptCookies();
            logStep('Cookies accepted.');
            await selectedProductPage.verifyNavigation();
            await selectedProductPage.validateProductPage(testData.productName);
            logStep('Product page validated.');
            await selectedProductPage.clickAddToCart();
            await selectedProductPage.clickMyCart();
            logStep('Product added to cart and navigated to cart.');
        } catch (error) {
            console.error('❌ Error during Product Selection: ', error);
            throw error;
        }
    });
});