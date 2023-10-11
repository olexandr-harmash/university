import stripe from 'stripe';
import config from '../../../../config'

const stripeConnection = new stripe(config.stripe.secret, {
    apiVersion: '2023-08-16',
});

export { stripeConnection };