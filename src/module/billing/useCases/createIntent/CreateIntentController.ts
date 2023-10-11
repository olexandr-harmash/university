import * as express from "express";
import { BaseController } from "../../../../libs/core/http/BaseController";
import { PaymentIntentUseCase } from "./CreateIntentUseCase";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedRequest";

export class PaymentIntentController extends BaseController {
    private paymentIntent: PaymentIntentUseCase;

    constructor(paymentIntent: PaymentIntentUseCase) {
        super();

        this.paymentIntent = paymentIntent;
    };

    protected async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
        try {
            const loginUserResult = await this.paymentIntent.execute({...req.body, user: req.decoded});

            if (loginUserResult.isRight()) {
                const tokenResponce = loginUserResult.value;
                
                return this.ok(res, tokenResponce.getValue());
            } else {
                const error = loginUserResult.value;

                switch (error.constructor) {
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            }
        } catch (err) {
            return this.fail(res, err);
        }
    }
}