/**
 * BasePage provides common methods and utilities for all page objects.
 */
class BasePage {
    constructor(page, actions) {
        this.page = page;
        this.actions = actions;
    }

    async getTitle() {
        return this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    _log(message, level = 'info') {
        const prefix = level === 'error' ? '[ERROR]' : '[INFO]';
        // eslint-disable-next-line no-console
        console[level === 'error' ? 'error' : 'log'](`${prefix} ${message}`);
    }

    async _withLogging(actionFn, successMsg = '', errorMsg = '') {
        try {
            const result = await actionFn();
            if (successMsg) this._log(successMsg);
            return result;
        } catch (error) {
            if (errorMsg) this._log(errorMsg, 'error');
            throw error;
        }
    }

    async verifyNavigation(expectedUrlPart, expectedTitlePart) {
        await this._withLogging(async () => {
            await this.page.waitForLoadState('networkidle');
            const [currentUrl, pageTitle] = await Promise.all([
                this.getCurrentUrl(),
                expectedTitlePart ? this.getTitle() : Promise.resolve('')
            ]);
            if (expectedUrlPart) expect(currentUrl).toContain(expectedUrlPart);
            if (expectedTitlePart) expect(pageTitle).toContain(expectedTitlePart);
        },
            `Navigated to page${expectedUrlPart ? ' with URL part: ' + expectedUrlPart : ''}.`,
            'Navigation verification failed.'
        );
    }

    /**
     * Waits for a navigation event with a given state and timeout.
     * @param {string} [waitUntil='domcontentloaded']
     * @param {number} [timeout=10000]
     */
    async waitForNavigation(waitUntil = 'domcontentloaded', timeout = 10000) {
        await this.page.waitForNavigation({ waitUntil, timeout });
    }
}

module.exports = { BasePage };
