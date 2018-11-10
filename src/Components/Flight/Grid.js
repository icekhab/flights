import {Component} from "react";
import moment from "moment";
import {ClipLoader} from "react-spinners";
import React from "react";
import FlightContext from "./Context";

export default class FlightGrid extends Component {
    render() {
        return (
            <FlightContext.Consumer>
                {context => (
                    <div className="table-container">
                        {
                            context.error ?
                                <div className="alert alert-danger" role="alert">{context.error}</div> : ''
                        }

                        {
                            <div>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Time</th>
                                        <th scope="col">{context.filter.direction === 'departure' ? 'From' : 'To'}</th>
                                        <th scope="col">Airline</th>
                                        <th scope="col">Number</th>
                                        <th scope="col">Terminal</th>
                                        <th scope="col">Gate</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        context.flights.map((flight, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {
                                                        moment(context.filter.direction === 'departure'
                                                            ? flight.departure.scheduledTime
                                                            : flight.arrival.scheduledTime).format('hh:mm a')
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        context.filter.direction === 'departure'
                                                            ? flight.arrival.airportName
                                                            : flight.departure.airportName
                                                    }
                                                </td>
                                                <td>{flight.airline.name}</td>
                                                <td>{flight.flight.iataNumber}</td>
                                                <td>{flight.departure.terminal}</td>
                                                <td>{flight.departure.gate}</td>
                                                <td>{flight.status}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        }

                        <div className="loader">
                            <ClipLoader
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={context.loading}/>
                        </div>


                        <div className="row ">
                            {
                                Number.isInteger(context.flights.length / context.filter.perPage) && !context.loading
                                    ? <button
                                        className="btn btn-primary btn-more btn-lg"
                                        onClick={context.load}>
                                        More
                                    </button>
                                    : ''
                            }
                        </div>
                    </div>
                )}
            </FlightContext.Consumer>
        );
    }
}