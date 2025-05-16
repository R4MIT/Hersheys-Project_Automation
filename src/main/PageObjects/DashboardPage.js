const { BasePage } = require('./BasePage');
const Actions = require('../Utilities/Actions');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page, new Actions(page));
        this.acceptButton = '#onetrust-accept-btn-handler';
        this.chocolateAndCandyTab = '#hersheys-chocolate-candy';
        this.dashboardTab = '.brand-logo.brand-logo--main';
    }

    async navigateToURL(url) {
        await this._withLogging(async () => {
            await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        }, `Navigated to URL: ${url}`, `Failed to navigate to URL: ${url}`);
    }

    async acceptCookies() {
        await this._withLogging(async () => {
            await this.actions.waitForVisible(this.acceptButton, 3000);
            await this.actions.click(this.acceptButton);
        }, 'Cookies accepted.', 'Cookies accept button not visible or already accepted.');
    }

    async clickDashboardTab() {
        await this._withLogging(async () => {
            await this.actions.click(this.dashboardTab);
        }, 'Clicked Dashboard Tab.', 'Error clicking Dashboard Tab.');
    }

    async clickOnChocolateAndCandyTab() {
        await this._withLogging(async () => {
            await this.actions.click(this.chocolateAndCandyTab);
        }, 'Clicked on Chocolate and Candy Tab.', 'Error clicking Chocolate and Candy Tab.');
    }
}

module.exports = { DashboardPage };