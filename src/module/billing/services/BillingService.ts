import { ClientSecret, IntentProps, PaymentResult } from "../domain/Intent";

export interface BillingService {
    paymentIntent(amount: number, currency: string, props: IntentProps): Promise<ClientSecret>;
    paymentResult(rawBody: string, signature: string): any;
}