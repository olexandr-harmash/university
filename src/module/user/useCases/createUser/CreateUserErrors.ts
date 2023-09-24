import { Result } from "../../../../libs/core/Result";
import { UseCaseError } from "../../../../libs/core/UseCaseError";

export namespace CreateUserErrors {
    export class UserAlreadyExistError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The user is already exists.`
            } as UseCaseError)
        }
    };
    export class NameAlreadyUsedError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `The name is already used.`
            } as UseCaseError)
        }
    };
};