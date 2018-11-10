export default class FlightService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async get(direction = 'departure', page = 1, perPage = 10, flightNumber) {
        const {REACT_APP_API_KEY, REACT_APP_AIRPORT_IATA} = process.env;

        let result = await this
            .httpClient
            .get(`timetable?key=${REACT_APP_API_KEY}&iataCode=${REACT_APP_AIRPORT_IATA}&type=${direction}`);

        if (result.error) {
            return {
                error: result.error.text
            }
        }

        result = (flightNumber
            ? result.filter(flight => flight.flight.iataNumber.toLowerCase().includes(flightNumber.toLowerCase()))
            : result)
            .splice((page - 1) * perPage, perPage * page);

        return {
            data: result
        };
    }
}