export default class GeoService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getAirport (iata) {
        const result = await this.httpClient.get(`airportDatabase?key=${process.env.REACT_APP_API_KEY}&codeIataAirport=${iata}`);

        if(result.error) {
            return {
                error: result.error.text
            }
        }

        return {
            data: result
        };
    }
}