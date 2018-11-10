import {Component} from "react";
import React from "react";
import HttpClient from "../../httpClient";
import FlightService from "../../Services/FlightService";
import GeoService from "../../Services/GeoService";
import FlightGrid from "./Grid"
import FlightFilters from "./Filters"
import FlightMenu from "./Menu"
import FlightProvider from "./Provider";

const httpClient = new HttpClient(process.env.REACT_APP_API_URL);
const flightService = new FlightService(httpClient);
const geoService = new GeoService(httpClient);

export default class Flight extends Component {
    render() {
        return (
            <FlightProvider
                className="App"
                flightService={flightService}
                geoService={geoService}
                direction={this.props.direction}>

                <FlightMenu/>
                <FlightFilters/>
                <FlightGrid/>

            </FlightProvider>
        );
    }
}