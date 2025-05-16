const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../main/PageObjects/DashboardPage');
const { ChocolateAndCandyPage } = require('../../main/PageObjects/ChocolateAndCandyPage');
const testData = require('../../main/Utilities/TestData');

// Negative path: Search for a non-existent product and verify the UI response

test.describe('Negative Path - Product Search', () => {
    test('Should show no results for a non-existent product', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const chocolateAndCandyPage = new ChocolateAndCandyPage(page);

        await dashboardPage.navigateToURL(testData.url);
        await dashboardPage.verifyNavigation();
        await dashboardPage.clickOnChocolateAndCandyTab();
        await chocolateAndCandyPage.verifyNavigation();

        // Attempt to search for a product that does not exist
        const desktopSearch = page.locator('#search-field');
        const mobileSearch = page.locator('#search-field-mobile');
        let searchBox;
        if (await desktopSearch.isVisible()) {
            searchBox = desktopSearch;
        } else if (await mobileSearch.isVisible()) {
            searchBox = mobileSearch;
        } else {
            throw new Error('No visible search box found!');
        }
        await searchBox.fill('NonExistentProduct12345');
        await searchBox.press('Enter');

        // Wait for search results to update
        await page.waitForTimeout(1000);

        // Check for a 'no results' message or empty product grid
        const noResults = await page.locator('text=/no results|not found|no products/i').first();
        const isVisible = await noResults.isVisible().catch(() => false);
        expect(isVisible).toBeTruthy();
    });
});
