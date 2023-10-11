import React, { Component } from "react";

import "./Indicator.css";

export default class Indicator extends Component {
    render() {
        const indicatorClasses = ["indicator", "indicator__hover-gray"];

        if (this.props.active) {
            delete indicatorClasses[1];
            indicatorClasses.push("indicator__active");
        }

        return (
            <label
                onClick={this.props.toggle}
                className="indicator__remember"
                htmlFor={this.props.id}
            >
                <div className={indicatorClasses.join(" ")}></div>
                <input
                    className="indicator__checkbox"
                    type="checkbox"
                    id={this.props.id}
                />
                Remember me
            </label>
        );
    }
}
