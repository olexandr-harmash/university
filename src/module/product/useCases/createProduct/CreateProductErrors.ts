import { Result } from "../../../../libs/core/Result";
import { UseCaseError } from "../../../../libs/core/UseCaseError";

export namespace CreateProductErrors {
    export class ProductAlreadyExistError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The droduct is already exists.`
            } as UseCaseError)
        }
    };
};