const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../main/PageObjects/DashboardPage');
const { GlobalAuthentication } = require('../../main/Utilities/GlobalAuthentication');


test.describe.serial('Dashboard Page Flow', () => {
    test('DashboardPageVerification', async ({ page }) => {

        // Initialize DashboardPage with the authenticated page
        const dashboardPage = new DashboardPage(page);

        // Target the URL
        const url = "https://shop.hersheys.com/?srsltid=AfmBOoq_Cvff7DMh8SKylrvFQm0xcENX3hJDBSndItYU7RHxKVhVUK-S";
        await dashboardPage.navigateToURL(url);
        await dashboardPage.page.waitForLoadState("networkidle");

        // Accept cookies and fetch navigation details
        await globalAuthentication.acceptCookies();
        await dashboardPage.getTitle();
        await dashboardPage.getCurrentUrl();

        await dashboardPage.fetchNavigationBar();
        //await dashboardPage.clickingChocandCandyFromNavBAr();

        // Navigate to Chocolate and Candy
        await dashboardPage.clickOnChocolateAndCandyTab();
        console.log("Chocolate and Candy Tab clicked successfully.");

    });
});