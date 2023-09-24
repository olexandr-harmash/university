import { Result } from "../../../../libs/core/Result";
import { UseCaseError } from "../../../../libs/core/UseCaseError";

export namespace LoginUserErrors {
    export class UserNotFoundError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The user is not exist.`
            } as UseCaseError)
        }
    };
};