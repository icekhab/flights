import {Component} from "react";
import React from "react";
import FlightContext from "./Context";

export default class FlightFilters extends Component {
    state = {
        inputValue: ''
    };

    updateInputValue = (evt) =>
        this.setState({
            inputValue: evt.target.value
        });

    render() {
        return (
            <FlightContext.Consumer>
                {context => (
                    <div className="input-group mb-3 search-container">
                        <input type="text"
                               className="form-control"
                               placeholder="Search by flight number"
                               aria-label="Recipient's username"
                               aria-describedby="basic-addon2"
                               value={this.state.inputValue}
                               onChange={this.updateInputValue} />

                            <div className="input-group-append">
                                <button className="input-group-text"
                                        onClick={() => { context.setFilter(this.state.inputValue); }}>
                                        Search
                                </button>
                            </div>
                    </div>
                )}
            </FlightContext.Consumer>
        );
    }
}