import { Result } from "../../../../libs/core/Result";
import { UseCaseError } from "../../../../libs/core/UseCaseError";

export namespace ProcessPaymentErrors {
    export class BillWasNotCreatedError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The bill does not exists it must be created during payment intent handle.`
            } as UseCaseError)
        }
    };
};