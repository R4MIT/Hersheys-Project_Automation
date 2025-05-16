const { test, expect } = require('@playwright/test');
const { ChocolateAndCandyPage } = require('../../main/PageObjects/ChocolateAndCandyPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');


const logStep = (msg) => console.log(`✔️ ${msg}`);

async function setupChoosingProductTest(browser) {
    const globalAuthentication = new GlobalAuthentication(browser);
    const page = await globalAuthentication.invokeBrowser();
    return {
        page,
        globalAuthentication,
        chocolateAndCandyPage: new ChocolateAndCandyPage(page)
    };
}

test.describe('Choosing Product', () => {
    test('Choose Product from Chocolate and Candy Page', async ({ browser }) => {
        try {
            const { page, globalAuthentication, chocolateAndCandyPage } = await setupChoosingProductTest(browser);
            await chocolateAndCandyPage.navigateToURL(testData.url);
            await globalAuthentication.acceptCookies();
            logStep('Cookies accepted.');
            await chocolateAndCandyPage.verifyNavigation();
            await chocolateAndCandyPage.listAllCandiesOnCncPage();
            await chocolateAndCandyPage.matchAndSelectProductPartial(testData.productNamePartial);
            logStep('Product matched and selected.');
            // If navigation wait is needed, use:
            // await chocolateAndCandyPage.waitForNavigation();
        } catch (error) {
            console.error('❌ Error during Choosing Product: ', error);
            throw error;
        }
    });
});