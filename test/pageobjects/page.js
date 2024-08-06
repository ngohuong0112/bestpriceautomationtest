import { browser, $ } from '@wdio/globals';

/**
 * Main page object class containing shared methods, selectors, and functionalities
 * that can be used across different page objects.
 */
export default class Page {
    /**
     * Opens the specified URL in the browser.
     * @param {string} path - The URL of the site to open.
     * @returns {Promise<void>} - A promise that resolves when the URL has been opened.
     */
    open(path) {
        return browser.url(path);
    }

    /**
     * Returns the WebdriverIO element for the input destination field.
     * @returns {WebdriverIO.Element} - The WebdriverIO element for the input destination field.
     */
    get inputDestination() {
        return $('.search-form__content__des__flight_to .flight_autocomplete');
    }

    /**
     * Waits for an element to be displayed on the page.
     * @param {WebdriverIO.Element} element - The WebdriverIO element to wait for.
     * @param {number} timeout - The timeout period in milliseconds (default: 5000).
     * @returns {Promise<void>} - A promise that resolves when the element is displayed.
     */
    async waitElementDisplayed(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Clicks on the specified element.
     * @param {WebdriverIO.Element} element - The WebdriverIO element to click.
     * @returns {Promise<void>} - A promise that resolves when the click action is performed.
     */
    async click(element) {
        await element.click();
    }

    /**
     * Types text into the specified input field.
     * @param {WebdriverIO.Element} element - The WebdriverIO element for the input field.
     * @param {string} text - The text to input into the field.
     * @returns {Promise<void>} - A promise that resolves when the text is input.
     */
    async input(element, text) {
        await element.setValue(text);
    }

    /**
     * Sets the value of an input field using `document.querySelector` with a custom selector.
     * @param {string} selector - The CSS selector to locate the element.
     * @param {string} value - The value to set for the input field.
     * @returns {Promise<void>} - A promise that resolves when the value is set.
     */
    async setInputValueUsingQuerySelector(selector, value) {
        await browser.execute(function (selector, value) {
            document.querySelector(selector).value = `${value}`;
        }, selector, value);
    }


    /**
     * Waits for an element to be visible on the page.
     * @param {WebdriverIO.Element} element - The WebdriverIO element to wait for.
     * @param {number} timeout - The timeout period in milliseconds (default: 5000).
     * @returns {Promise<void>} - A promise that resolves when the element is visible.
     */
    async waitForVisible(element, timeout = 5000) {
        await element.waitForVisible({ timeout });
    }

    /**
     * Checks if an element is present in the DOM.
     * @param {WebdriverIO.Element} element - The WebdriverIO element to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the element is present, false otherwise.
     */
    async isPresent(element) {
        return await element.isExisting();
    }

    /**
     * Retrieves the text content of the specified element.
     * @param {WebdriverIO.Element} element - The WebdriverIO element to get the text from.
     * @returns {Promise<string>} - A promise that resolves to the text content of the element.
     */
    async getText(element) {
        return await element.getText();
    }

    /**
 * Gets a formatted date string based on the current date and optional days to add.
 * @param {number} [daysToAdd=0] - The number of days to add to the current date. Default is 0.
 * @returns {string} - The formatted date in dd/mm/yyyy.
 */
    getDate(daysToAdd = 0) {
        const today = new Date();
        // Add the specified number of days to the current date
        today.setDate(today.getDate() + daysToAdd);

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

}
