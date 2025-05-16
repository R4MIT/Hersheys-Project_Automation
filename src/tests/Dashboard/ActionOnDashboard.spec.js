const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../main/PageObjects/DashboardPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');
const testData = require('../../main/Utilities/TestData');


const logStep = (msg) => console.log(`✔️ ${msg}`);


async function setupDashboardTest(browser) {
    const globalAuthentication = new GlobalAuthentication(browser);
    const page = await globalAuthentication.invokeBrowser();
    return {
        page,
        globalAuthentication,
        dashboardPage: new DashboardPage(page)
    };
}

test.describe('Dashboard Actions', () => {
    test('Dashboard Navigation and Actions', async ({ browser }) => {
        try {
            const { page, globalAuthentication, dashboardPage } = await setupDashboardTest(browser);
            await dashboardPage.navigateToURL(testData.url);
            await globalAuthentication.acceptCookies();
            logStep('Cookies accepted.');
            await dashboardPage.verifyNavigation();
            await dashboardPage.clickOnChocolateAndCandyTab();
            logStep('Navigated to Chocolate and Candy section.');
            // If navigation wait is needed, use:
            // await dashboardPage.waitForNavigation();
            // Add more dashboard actions as needed
        } catch (error) {
            console.error('❌ Error during Dashboard Actions: ', error);
            throw error;
        }
    });
});