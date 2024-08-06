import Page from '../page.js';

/**
 * Sub page containing specific selectors and methods for a specific page.
 */
class SearchResultPage extends Page {

    /**
     * Selector for the dropdown menu to sort flights.
     * @returns {object} Selector for the sort flights dropdown menu.
     */
    get dropdownSortflightBy() {
        return $('#sort_by_flight_depart');
    }

    /**
     * Selector for the list of sorting options available for departure flights.
     * @returns {object[]} Array of selectors for the sorting options for departure flights.
     */
    get listSortDepart() {
        return $$('#ul_bpv_sort_depart.bpv-s-content li');
    }

    /**
     * Selector for the list of departure flight prices.
     * @returns {object[]} Array of selectors for the departure flight prices.
     */
    get listPriceDepart() {
        return $$('#flight_content_depart strong span');
    }
    
    /**
     * Selector for the list of return flight prices.
     * @returns {object[]} Array of selectors for the return flight prices.
     */
    get listPriceReturn() {
        return $$('#flight_data_content_return strong span');
    }

    /**
     * Clicks on a sorting option in the dropdown menu based on the provided text.
     * @param {string} optionText - The text of the sorting option to click.
     */
    async selectSortFlightByOption(optionText) {
        await super.waitElementDisplayed(this.dropdownSortflightBy);
        await super.click(this.dropdownSortflightBy); // Click to open the dropdown menu
        const options = await this.listSortDepart; // Retrieve all sorting options
        for (const option of options) {
            const text = await option.getText(); // Get the text of each option
            if (text.includes(optionText)) { // Check if the text matches the provided option text
                await super.click(option); // Click the matching option
                break; // Exit the loop once the desired option is clicked
            }
        }
    }

    /**
     * Retrieves and returns the prices for departure flights.
     * @returns {Promise<number[]>} - A promise that resolves to an array of departure flight prices.
     */
    async getDeparturePrices() {
        const priceElements = await this.listPriceDepart; // Get all elements containing departure flight prices
        const prices = [];
        for (const priceElement of priceElements) {
            const priceText = await priceElement.getText(); // Get the text of each price element
            // Remove currency symbols and commas from the price text and convert to a number
            const price = parseFloat(priceText.replace(/[^0-9.-]/g, ''));
            prices.push(price); // Add the numeric price to the array
        }
        return prices;
    }

    /**
     * Retrieves and returns the prices for return flights.
     * @returns {Promise<number[]>} - A promise that resolves to an array of return flight prices.
     */
    async getReturnPrices() {
        const priceElements = await this.listPriceReturn; // Get all elements containing return flight prices
        const prices = [];
        for (const priceElement of priceElements) {
            const priceText = await priceElement.getText(); // Get the text of each price element
            // Remove currency symbols and commas from the price text and convert to a number
            const price = parseFloat(priceText.replace(/[^0-9.-]/g, ''));
            prices.push(price); // Add the numeric price to the array
        }
        return prices;
    }

    /**
     * Checks if an array of prices is sorted in ascending order.
     * @param {number[]} prices - The array of prices to check.
     * @returns {boolean} - True if prices are sorted in ascending order, false otherwise.
     */
    isSortedAscending(prices) {
        for (let i = 0; i < prices.length - 1; i++) {
            if (prices[i] > prices[i + 1]) {
                return false; // Return false if any price is greater than the next one
            }
        }
        return true; // Return true if all prices are in ascending order
    }

    /**
     * Verifies that the departure flight prices are sorted in ascending order.
     * @returns {Promise<boolean>} - A promise that resolves to true if departure prices are sorted in ascending order, false otherwise.
     */
    async areDeparturePricesSorted() {
        const prices = await this.getDeparturePrices(); // Retrieve departure flight prices
        return this.isSortedAscending(prices); // Check if they are sorted in ascending order
    }

    /**
     * Verifies that the return flight prices are sorted in ascending order.
     * @returns {Promise<boolean>} - A promise that resolves to true if return prices are sorted in ascending order, false otherwise.
     */
    async areReturnPricesSorted() {
        const prices = await this.getReturnPrices(); // Retrieve return flight prices
        return this.isSortedAscending(prices); // Check if they are sorted in ascending order
    }
}

export default new SearchResultPage();
