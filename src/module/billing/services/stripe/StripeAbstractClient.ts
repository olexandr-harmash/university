import stripe from "stripe";
import config from "../../../../config";

export abstract class PaymentAbstractClient {
    private endpointSecret: string;
    private stripeClient: stripe;
    
    constructor(stripeClient: any) {
        this.endpointSecret = config.stripe.endpointSecret;
        this.stripeClient = stripeClient;
    }

    async initIntent(params: stripe.PaymentIntentCreateParams, options: stripe.RequestOptions) {
        const paymentIntent = await this.stripeClient.paymentIntents.create({
            ...params,
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            }
        });

        return paymentIntent
    }

    initEvent(payload: string | Buffer, header: string | Buffer | string[]) {
        return this.stripeClient.webhooks.constructEvent(
            payload,
            header,
            this.endpointSecret
        );
    }

    async testConnection() {
        return await this.stripeClient.balance.retrieve();
    }
}