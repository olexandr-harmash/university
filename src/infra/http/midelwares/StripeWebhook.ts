import { paymentService } from "../../../module/billing/services";
import { BillingService } from "../../../module/billing/services/BillingService";
import { authService } from "../../../module/user/services";
import { AuthService } from "../../../module/user/services/AuthService";

class Middleware {
    private billingService: BillingService;
    private authService: AuthService;

    /**
     * TODO: init via constructor
     */
    constructor() {
        this.billingService = paymentService;
        this.authService = authService;
    }

    private endRequest(status: 400 | 401 | 403, message: string, res: any): any {
        return res.status(status).send({ message });
    }

    public ensureAuthenticated() {
        return async (req, res, next) => {
            const token = req.headers['authorization']
            // Confirm that the token was signed with our signature.
            if (token) {
                const decoded = await this.authService.decodeJWT(token);
                const signatureFailed = !!decoded === false;

                if (signatureFailed) {
                    return this.endRequest(403, 'Token signature expired.', res)
                }

                // See if the token was found
                const { name } = decoded;
                const tokens = await this.authService.getTokens(name);

                // if the token was found, just continue the request.
                if (tokens.length !== 0) {
                    req.decoded = decoded;
                    return next();
                } else {
                    return this.endRequest(403, 'Auth token not found. User is probably not logged in. Please login again.', res)
                }
            } else {
                return this.endRequest(403, 'No access token provided', res)
            }
        }
    }

    public includeStripeSignature() {
        return async (req, res, next) => {
            const signature = req.headers['stripe-signature'];

            const signatureFailed = signature === undefined;

            if (signatureFailed) {
                return this.endRequest(403, 'Stripe signature required.', res)
            }

            req.stripe_signature = signature;

            return next();
        }
    }
}

const midelwares = new Middleware();

export {
    midelwares
}