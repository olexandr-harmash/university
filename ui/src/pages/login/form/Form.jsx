import React, { Component } from "react";

import Indicator from "../indicator/Indicator";

import { postLogin, postSignin, setTokens } from "../../../services/auth/Auth";

import './Form.css';
import '../Login.css';

export const AUTH_TYPES = {
    SIGN_IN: "sign_in",
    LOG_IN: "log_in",
};

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.formId = 'auth__form';

        this.state = { active: false };
    }

    toggleIndicator = (e) => {
        if (e) e.preventDefault();
        this.setState({ active: !this.state.active });
    };

    serializeForm = (e) => {
        if (e) e.preventDefault();

        const formData = new FormData(document.getElementById(this.formId));

        const credentials = Object.fromEntries(formData);

        if (this.props.type === AUTH_TYPES.LOG_IN) {
            postLogin(credentials).then((r) => {
                setTokens(r);
            });
        } else {
            postSignin(credentials).then((r) => {
                this.toggleIndicator();
            });
        }
    };

    render() {
        const isSign = this.props.type === AUTH_TYPES.SIGN_IN;

        const title = isSign ? "Sign In" : "Log In";

        return (
            <form action="" id="auth__form">
                <h3 className="auth__title">
                    {title} to <span className="auth__company">Gromend</span>
                </h3>
                <p className="auth__slogan">
                    Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
                    adipisicing.
                </p>
                <input
                    className="auth__input"
                    name="username"
                    type="text"
                    placeholder="username"
                ></input>
                {isSign && (
                    <input
                        className="auth__input"
                        name="email"
                        type="text"
                        placeholder="email"
                    ></input>
                )}
                <input
                    className="auth__input"
                    name="password"
                    type="text"
                    placeholder="password"
                ></input>
                <div className="auth__indicator">
                    <Indicator
                        toggle={this.toggleIndicator}
                        active={this.state.active}
                        id="remember-me"
                    ></Indicator>
                    { !isSign && <a className="auth__links" href="#">
                        forgot password
                    </a>}
                </div>
                <input
                    onClick={this.serializeForm}
                    className="auth__button"
                    type="submit"
                    value={isSign ? 'Sign In' : 'Log in'}
                ></input>
            </form>
        );
    }
}
