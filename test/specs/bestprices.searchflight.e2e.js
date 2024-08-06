import AirlineTicketPage from '../pageobjects/searchflight/airline-ticket.page.js';
import SearchResultPage from '../pageobjects/searchflight/search-result.page.js';

import data from '../data/bestprice.env.prod.js'
describe('Best Price Search', () => {
    it('should open the airline ticket page, perform a flight search, and sort by cheapest price', async () => {
       console.log(data.url);
        // Open the airline ticket page
        await AirlineTicketPage.open(data.url);
        await browser.maximizeWindow();

        // Perform a flight search
        const departureDate = AirlineTicketPage.getDate();
        const returnDate = AirlineTicketPage.getDate(2);
        
        await AirlineTicketPage.SearchFlight(data.flight.departurePoint,data.flight.destination, 
            departureDate, returnDate, data.flight.adults, data.flight.children, data.flight.infants);

        // Select the sorting option "Giá rẻ nhất" (Cheapest Price)
        await SearchResultPage.selectSortFlightByOption("Giá rẻ nhất");

        // Verify if the departure prices are sorted
        const isDepartureSorted = await SearchResultPage.areDeparturePricesSorted();
        expect(isDepartureSorted).toBe(true);

    });
});
