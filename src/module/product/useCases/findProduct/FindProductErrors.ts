import { Result } from "../../../../libs/core/Result";
import { UseCaseError } from "../../../../libs/core/UseCaseError";

export namespace FindProductErrors {
    export class CategoryDoesNotExistError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The category does not exists.`
            } as UseCaseError)
        }
    };
};