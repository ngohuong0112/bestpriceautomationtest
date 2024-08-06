import AirlineTicketPage from '../pageobjects/searchflight/airline-ticket.page.js';
import SearchResultPage from '../pageobjects/searchflight/search-result.page.js';

describe('Best Price Search', () => {
    it('should open the airline ticket page, perform a flight search, and sort by cheapest price', async () => {
        // Open the airline ticket page
        await AirlineTicketPage.open("https://www.bestprice.vn/ve-may-bay");

        // Perform a flight search
        const departureDate = AirlineTicketPage.getDate();
        const returnDate = AirlineTicketPage.getDate(2);
        
        await AirlineTicketPage.SearchFlight("Hà Nội (HAN)", "Hồ Chí Minh (SGN)", departureDate, returnDate, 1, 0, 0);

        // Select the sorting option "Giá rẻ nhất" (Cheapest Price)
        await SearchResultPage.selectSortFlightByOption("Giá rẻ nhất");

        // Verify if the departure prices are sorted
        const isDepartureSorted = await SearchResultPage.areDeparturePricesSorted();
        expect(isDepartureSorted).toBe(true);

    });
});
