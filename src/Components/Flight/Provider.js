import {Component} from "react";
import React from "react";
import FlightContext from "./Context";

export default class FlightProvider extends Component {
    state = {
        flights: [],
        loading: true,
        filter: {
            perPage: 15,
            direction: this.props.direction
        }
    };

    airports = {};

    geoService = this.props.geoService;
    flightService = this.props.flightService;

    async componentDidMount() {
        await this.load();
    }

    async load() {
        this.setState({loading: true, error: false});

        const filter = this.state.filter;
        filter.page = filter.page ? filter.page + 1 : 1;

        const flightResult = await this
            .flightService
            .get(filter.direction, filter.flightNumber, filter.page, filter.perPage);

        if (flightResult.error) {
            this.setState({error: flightResult.error, loading: false});
            return;
        }

        for (let flight of flightResult.data) {
            let changingObj = {};

            switch (filter.direction) {
                case 'departure': {
                    changingObj = flight.arrival;
                    break;
                }
                case 'arrival': {
                    changingObj = flight.departure;
                    break;
                }
                default:
                    console.log('Unknown direction');
            }

            if (!this.airports.hasOwnProperty(changingObj.iataCode)) {
                const airportResult = await this.geoService.getAirport(changingObj.iataCode);

                if (airportResult.error) {
                    this.setState({error: airportResult.error, loading: false});
                    return;
                }

                const {nameAirport} = airportResult.data[0];
                this.airports[changingObj.iataCode] = nameAirport;
            }

            changingObj.airportName = this.airports[changingObj.iataCode];
        }

        this.setState({flights: this.state.flights.concat(flightResult.data), loading: false, filter: filter});
    }

    render() {
        return (
            <FlightContext.Provider value={{
                flights: this.state.flights,
                filter: this.state.filter,
                loading: this.state.loading,
                error: this.state.error,
                load: this.load.bind(this),
                setFilter: (flightNumber) => {
                    const filter = this.state.filter;
                    console.log(flightNumber);
                    filter.flightNumber = flightNumber;
                    filter.page = null;

                    this.setState({filter: filter, flights: []});
                    this.load();
                }
            }}>
                {this.props.children}
            </FlightContext.Provider>
        );
    }
}