/**
 * BasePage provides common methods and utilities for all page objects.
 */
class BasePage {
    constructor(page, actions) {
        this.page = page;
        this.actions = actions;
    }

    /**
     * Returns the page title.
     * @returns {Promise<string>}
     */
    async getTitle() {
        return await this.page.title();
    }

    /**
     * Returns the current URL.
     * @returns {Promise<string>}
     */
    async getCurrentUrl() {
        return await this.page.url();
    }

    /**
     * Handles logging and error catching for async actions.
     * @param {Function} actionFn
     * @param {string} successMsg
     * @param {string} errorMsg
     * @returns {Promise<any>} The return value of the actionFn, if any.
     */
    async _withLogging(actionFn, successMsg, errorMsg) {
        try {
            const result = await actionFn();
            if (successMsg) this._log(successMsg);
            return result;
        } catch (error) {
            if (errorMsg) this._log(errorMsg, 'error');
            throw error;
        }
    }

    /**
     * Centralized logging method, can be replaced with winston or other logger.
     * @param {string} message - The message to log.
     * @param {string} [level='info'] - The log level ('info' or 'error').
     */
    _log(message, level = 'info') {
        if (level === 'error') {
            console.error(`[ERROR] ${message}`);
        } else {
            console.log(`[INFO] ${message}`);
        }
    }

    /**
     * Waits for the page to load and verifies navigation by URL and optional title substring.
     * @param {string} expectedUrlPart - URL substring to verify navigation.
     * @param {string} [expectedTitlePart] - Optional title substring to verify.
     */
    async verifyNavigation(expectedUrlPart, expectedTitlePart) {
        await this._withLogging(async () => {
            await this.page.waitForLoadState("networkidle");
            const currentUrl = await this.getCurrentUrl();
            if (expectedUrlPart) expect(currentUrl).toContain(expectedUrlPart);
            if (expectedTitlePart) {
                const pageTitle = await this.getTitle();
                expect(pageTitle).toContain(expectedTitlePart);
            }
        }, `Navigated to page${expectedUrlPart ? ' with URL part: ' + expectedUrlPart : ''}.`, 'Navigation verification failed.');
    }
}

module.exports = { BasePage };
