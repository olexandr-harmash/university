import { ClientSecret, PaymentResult } from "../../domain/Intent";
import { BillingService } from "../BillingService";
import { PaymentAbstractClient } from "./StripeAbstractClient";

export class PaymentServiceImpl extends PaymentAbstractClient implements BillingService {
  constructor (stripeClient: any) {
    super(stripeClient);
  }

  paymentResult(rawBody: string, signature: string) {
    return this.initEvent(rawBody, signature);
  }

  async paymentIntent(amount: number, currency: string): Promise<ClientSecret> {
    const paymentIntent = await this.initIntent({ amount, currency }, {});

    return paymentIntent.client_secret
  }
}