const { test, expect } = require('@playwright/test');
const { ChocolateAndCandyPage } = require('../../main/PageObjects/ChocolateAndCandyPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');

const logStep = (msg) => console.log(`✔️ ${msg}`);

async function setupNegativeProductTest(browser) {
    const globalAuthentication = new GlobalAuthentication(browser);
    const page = await globalAuthentication.invokeBrowser();
    return {
        page,
        globalAuthentication,
        chocolateAndCandyPage: new ChocolateAndCandyPage(page)
    };
}

test.describe('Negative Product Search', () => {
    test('Search for Non-Existent Product', async ({ browser }) => {
        try {
            const { page, globalAuthentication, chocolateAndCandyPage } = await setupNegativeProductTest(browser);
            await chocolateAndCandyPage.navigateToURL(testData.url);
            await globalAuthentication.acceptCookies();
            logStep('Cookies accepted.');
            await chocolateAndCandyPage.verifyNavigation();
            await chocolateAndCandyPage.searchForProduct('NonExistentProduct');
            // If navigation wait is needed, use:
            // await chocolateAndCandyPage.waitForNavigation();
            const noResults = await page.locator('.no-results-message').isVisible();
            expect(noResults).toBeTruthy();
            logStep('Verified no results for non-existent product.');
        } catch (error) {
            console.error('❌ Error during Negative Product Search: ', error);
            throw error;
        }
    });
});
