import { Result } from "../../../../libs/core/Result";
import { UseCaseError } from "../../../../libs/core/UseCaseError";

export namespace PaymentIntentErrors {
    export class ProductNotFoundError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Not all products were recognithed.`
            } as UseCaseError)
        }
    };
};