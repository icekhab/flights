import {Component} from "react";
import {NavLink} from "react-router-dom";
import React from "react";

export default class FlightMenu extends Component {
    render() {
        return (
            <header>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to='/departure'>Departure</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to='/arrival'>Arrival</NavLink>
                    </li>
                </ul>
            </header>
        );
    }
}