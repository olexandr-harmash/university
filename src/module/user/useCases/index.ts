import DomainController from "../../../libs/core/DomainController";
import { BaseController } from "../../../libs/core/http/BaseController";
import { UserRepositoryImp } from "../repos/user/UserRepoImp";
import { authService } from "../services";
import { CreateUserController } from "./createUser/CreateUserController";
import { CreateUserUseCase } from "./createUser/CreateUserUseCase";
import { LoginUserController } from "./login/LoginUserController";
import { LoginUserUseCase } from "./login/LoginUserUseCase";

export class UserController extends DomainController {
    readonly loginUser: BaseController;
    readonly createUser: BaseController;

    constructor (db: any) {
        super();

        const userRepo = new UserRepositoryImp(db.models);
        const createUser = new CreateUserUseCase(userRepo);
        const loginUser = new LoginUserUseCase(userRepo, authService);

        this.loginUser = new LoginUserController(loginUser);
        this.createUser = new CreateUserController(createUser);
    };
};
