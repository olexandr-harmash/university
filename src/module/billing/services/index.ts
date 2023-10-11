import { stripeConnection } from "./stripe/StripeConnection";
import { PaymentServiceImpl } from "./stripe/StripeService";

const paymentService = new PaymentServiceImpl(stripeConnection);

paymentService.testConnection().then(i => console.log(i)).catch(err => console.log(err))

export { paymentService }