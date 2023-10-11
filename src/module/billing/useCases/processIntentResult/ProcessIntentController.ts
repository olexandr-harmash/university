import * as express from "express";
import { BaseController } from "../../../../libs/core/http/BaseController";
import { ProcessIntentUseCase } from "./ProcessIntentUseCase";

export class ProcessIntentController extends BaseController {
    private processIntent: ProcessIntentUseCase;

    constructor(paymentIntent: ProcessIntentUseCase) {
        super();

        this.processIntent = paymentIntent;
    };

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        try {
            const processIntentResult = await this.processIntent.execute(req);

            if (processIntentResult.isRight()) {
                return this.ok(res);
            } else {
                const error = processIntentResult.value;

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