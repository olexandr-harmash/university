import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import './Payment.css';

import CheckoutForm from './form/Form';
import Card from "../../components/card/Card";

import { getTokens } from "../../services/auth/Auth";
import Button from "../../components/button/Button";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.


export default class PaymentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { clientSecret: '' };

    this.appearance = {
      theme: 'stripe',
    };

    this.options = {
      clientSecret: this.state.clientSecret,
      appearance: this.appearance,
    };

    this.stripePromise = loadStripe("pk_test_51NGrkXA5h3jP6DtBMxuSO2s2OBzDmDbIvxAMixXFIAEhpp43h9nYH0WIsHT7kCKbK6nlKwmm4jsmIdGtEyvQ3f3400957epY4W");
  }

  setClientSecret = (secret) => {
    this.options.clientSecret = secret;
    this.setState({ clientSecret: secret });
  }

  createIntent  = () => {
    if(this.state.clientSecret && this.state.clientSecret.length) return
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3001/billing", {
      method: "POST",
      headers: { "Content-Type": "application/json", "authorization": getTokens().accessToken },
      body: JSON.stringify({ "product_ids": [this.props.id], "currency": 'usd' }),
    })
      .then((res) => res.json())
      .then((data) => this.setClientSecret(data.secret));
  };

  render = () => {
    return (
      <div onClick={this.createIntent} className="Payment" >
        {this.state.clientSecret && this.state.clientSecret.length && (
          <Elements options={this.options} stripe={this.stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
        <div className="payment__info-wrap">
          <Card name={this.props.name} price={this.props.price} category={this.props.category}></Card>
          <Button type='common'>Buy</Button>
        </div>
      </div >
    );
  }
}
