class GlobalAuthentication {

    constructor(browser) {
        this.browser = browser;
        this.context = null;
        this.page = null;
        this.acceptButtonSelector = '#onetrust-accept-btn-handler'; // Selector for the cookie accept button
    };

    // Function to set up context with storage state and create a new page
    async useAuth() {
        try {
            this.context = await this.browser.newContext({ storageState: 'state.json' });
            this.page = await this.context.newPage();
            this.acceptButton = this.page.locator(this.acceptButtonSelector);
            console.log("Authentication context successfully created.");
            return this.page;
        } catch (error) {
            console.error("Error during authentication setup:", error);
            throw error;
        }
    }

    async invokeBrowser() {
        // Create a new context with storage state
        this.context = await this.browser.newContext();
        // Create a new page within the context
        this.page = await this.context.newPage();
        // Initialize the accept button locator
        this.acceptButton = this.page.locator(this.acceptButtonSelector);
        // Return browser for testing purposes
        return this.page;
    }
    async acceptCookies() {
        console.log("Checking for cookie acceptance banner...");
        if (await this.acceptButton.isVisible()) {
            console.log("Cookie acceptance button found. Clicking...");
            await this.acceptButton.click();
            await this.page.waitForLoadState('networkidle'); // Wait for the click to complete
            console.log("Cookies accepted successfully.");
        } else {
            console.log("Cookie acceptance button not found.");
        }
    }
};
module.exports = { GlobalAuthentication };
