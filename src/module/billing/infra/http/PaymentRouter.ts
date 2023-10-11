import { Application } from "express";
import Route from "../../../../libs/core/Router";
import { BillingController } from "../../useCases";
import { midelwares } from "../../../../infra/http/midelwares/StripeWebhook";


export class BillingRouter implements Route {
    private controller: BillingController;

    constructor(controller: BillingController) {
        this.controller = controller;
    }

    public async Rest(express: Application): Promise<void> {
        express.post('/billing', midelwares.ensureAuthenticated(),
            (req, res) => this.controller.paymentIntent.execute(req, res)
        );

        express.post('/webhook', midelwares.includeStripeSignature(),
            (req, res) => this.controller.processIntent.execute(req, res)
        );
    };
};
