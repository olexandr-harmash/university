import * as express from "express";
import { BaseController } from "../../../../libs/core/http/BaseController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserErrors } from "./CreateUserErrors";

export class CreateUserController extends BaseController {
    private createUser: CreateUserUseCase;

    constructor(createUser: CreateUserUseCase) {
        super();

        this.createUser = createUser;
    };

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        try {
            const createUserResult = await this.createUser.execute(req.body);

            if (createUserResult.isLeft()) {
                const error = createUserResult.value;

                switch (error.constructor) {
                    case CreateUserErrors.UserAlreadyExistError:
                        return this.conflict(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                return this.ok(res);
            }
        } catch (err) {
            return this.fail(res, err);
        }
    }
}