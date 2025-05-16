class Actions {
    constructor(page) {
        this.page = page;
    }

    async click(target) {
        const locator = this._resolveLocator(target);
        await locator.click();
    }

    async type(target, text) {
        const locator = this._resolveLocator(target);
        await locator.fill(text);
    }

    async waitForVisible(target, timeout = 5000) {
        const locator = this._resolveLocator(target);
        await locator.waitFor({ state: 'visible', timeout });
    }

    async getText(target) {
        const locator = this._resolveLocator(target);
        await this.waitForVisible(target);
        return await locator.textContent();
    }

    async assertText(target, expected, expect) {
        const actual = await this.getText(target);
        expect(actual.trim()).toBe(expected.trim());
    }

    _resolveLocator(target) {
        if (typeof target === 'string') {
            return this.page.locator(target);
        }
        return target;
    }
}

module.exports = Actions;
