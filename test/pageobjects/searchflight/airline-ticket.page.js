import Page from '../page.js';

/**
 * Sub page containing specific selectors and methods for a specific page.
 */
class AirlineTicketPage extends Page {
    /**
     * Define selectors using getter methods.
     */

    /**
     * Selector for the departure point input field.
     * @returns {string} Selector for the departure point input field.
     */
    get inputDeparturePoint() {
        return `[data-id='flight_from']`;
    }

    /**
     * Selector for the destination input field.
     * @returns {string} Selector for the destination input field.
     */
    get inputDestination() {
        return `[data-id='flight_to']`;
    }

    /**
     * Selector for the departure date input field.
     * @returns {string} Selector for the departure date input field.
     */
    get inputdepartureDateFlight() {
        return '#departure_date_flight';
    }

    /**
     * Selector for the return date input field.
     * @returns {string} Selector for the return date input field.
     */
    get inputreturnDateFlight() {
        return '#returning_date_flight';
    }

    /**
     * Selector for the flight passenger selection field.
     * @returns {object} Selector for the flight passenger selection field.
     */
    get selectFlightPassenger() {
        return $('#flight_passenger');
    }

    /**
     * Selector for the button to decrease the number of adult passengers.
     * @returns {object} Selector for the button to decrease the number of adult passengers.
     */
    get minusAdultPassenger() {
        return $('.popover-content .mktnd_btn_flight_adult_minus .ico-minus');
    }

    /**
     * Selector for the button to increase the number of adult passengers.
     * @returns {object} Selector for the button to increase the number of adult passengers.
     */
    get plusAdultPassenger() {
        return $('.popover-content .mktnd_btn_flight_adult_plus .ico-plus');
    }

    /**
     * Selector for the button to decrease the number of child passengers.
     * @returns {object} Selector for the button to decrease the number of child passengers.
     */
    get minusChildPassenger() {
        return $('.popover-content .mktnd_btn_children_minus .ico-minus');
    }

    /**
     * Selector for the button to increase the number of child passengers.
     * @returns {object} Selector for the button to increase the number of child passengers.
     */
    get plusChildPassenger() {
        return $('.popover-content .mktnd_btn_children_adult_plus .ico-plus');
    }

    /**
     * Selector for the button to decrease the number of infant passengers.
     * @returns {object} Selector for the button to decrease the number of infant passengers.
     */
    get minusInfantPassenger() {
        return $('.popover-content .mktnd_btn_flight_infant_minus .ico-minus');
    }

    /**
     * Selector for the button to increase the number of infant passengers.
     * @returns {object} Selector for the button to increase the number of infant passengers.
     */
    get plusInfantPassenger() {
        return $('.popover-content .mktnd_btn_flight_infant_plus .ico-plus');
    }

    /**
     * Selector for the input field displaying the number of adult passengers.
     * @returns {object} Selector for the input field displaying the number of adult passengers.
     */
    get dataAdultsPassenger() {
        return $('input[name="ADT"]');
    }

    /**
     * Selector for the input field displaying the number of child passengers.
     * @returns {object} Selector for the input field displaying the number of child passengers.
     */
    get dataChildPassenger() {
        return $('input[name="CHD"]');
    }

    /**
     * Selector for the input field displaying the number of infant passengers.
     * @returns {object} Selector for the input field displaying the number of infant passengers.
     */
    get dataInfantPassenger() {
        return $('input[name="INF"]');
    }

    /**
     * Selector for the search flight button.
     * @returns {object} Selector for the search flight button.
     */
    get btnSearchFlight(){
        return $('#search_button');
    }

    /**
     * Adjusts the number of passengers based on the provided values.
     * @param {number} current - The current number of passengers.
     * @param {number} target - The target number of passengers.
     * @param {Function} incrementFunction - Function to click the increment button.
     * @param {Function} decrementFunction - Function to click the decrement button.
     */
    async adjustPassengerCount(current, target, incrementFunction, decrementFunction) {
        while (current < target) {
            await incrementFunction();
            current++;
            await browser.pause(500); // Adjust this delay as needed
        }
        while (current > target) {
            await decrementFunction();
            current--;
            await browser.pause(500); // Adjust this delay as needed
        }
    }

    /**
     * Searches for flights by setting input values for departure point, destination, dates, and passenger counts.
     * @param {string} departurePoint - The departure point to enter.
     * @param {string} destination - The destination to enter.
     * @param {string} departureDateFlight - The departure date to enter.
     * @param {string} returnDateFlight - The return date to enter.
     * @param {number} adultNumber - The number of adult passengers.
     * @param {number} childNumber - The number of child passengers.
     * @param {number} infantNumber - The number of infant passengers.
     */
    async SearchFlight(departurePoint, destination, departureDateFlight, returnDateFlight, adultNumber, childNumber, infantNumber) {
        // Set departure point
        await super.setInputValueUsingQuerySelector(this.inputDeparturePoint, departurePoint);

        // Set destination
        await super.setInputValueUsingQuerySelector(this.inputDestination, destination);

        // Set departure date
        await super.setInputValueUsingQuerySelector(this.inputdepartureDateFlight, departureDateFlight);

        // Set return date
        await super.setInputValueUsingQuerySelector(this.inputreturnDateFlight, returnDateFlight);

        // Open passenger selection
        await super.click(this.selectFlightPassenger);

        // Adjust number of adult passengers
        const currentAdults = parseInt(await this.dataAdultsPassenger.getAttribute('value'), 10);
        await this.adjustPassengerCount(currentAdults, adultNumber, 
            () => super.click(this.plusAdultPassenger), 
            () => super.click(this.minusAdultPassenger)
        );

        // Adjust number of child passengers
        const currentChildren = parseInt(await this.dataChildPassenger.getAttribute('value'), 10);
        await this.adjustPassengerCount(currentChildren, childNumber, 
            () => super.click(this.plusChildPassenger), 
            () => super.click(this.minusChildPassenger)
        );

        // Adjust number of infant passengers
        const currentInfants = parseInt(await this.dataInfantPassenger.getAttribute('value'), 10);
        await this.adjustPassengerCount(currentInfants, infantNumber, 
            () => super.click(this.plusInfantPassenger), 
            () => super.click(this.minusInfantPassenger)
        );

        // Click the search button
        await super.click(this.btnSearchFlight);
    }
}

export default new AirlineTicketPage();
