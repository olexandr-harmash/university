import * as express from "express";
import { BaseController } from "../../../../libs/core/http/BaseController";
import { LoginUserErrors } from "./LoginUserErrors";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController extends BaseController {
    private loginUser: LoginUserUseCase;

    constructor(loginUser: LoginUserUseCase) {
        super();

        this.loginUser = loginUser;
    };

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        try {
            const loginUserResult = await this.loginUser.execute(req.body);

            if (loginUserResult.isRight()) {
                return this.ok(res, loginUserResult.value);
            } else {
                const error = loginUserResult.value;

                switch (error.constructor) {
                    case LoginUserErrors.UserNotFoundError:
                        return this.notFound(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            }
        } catch (err) {
            return this.fail(res, err);
        }
    }
}