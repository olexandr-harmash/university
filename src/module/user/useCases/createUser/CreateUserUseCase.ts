import { AppError } from "../../../../libs/core/AppError";
import { Either, Result, left, right } from "../../../../libs/core/Result";
import { UseCase } from "../../../../libs/core/UseCase";
import { User, UserEmail, UserName, UserPassword } from "../../domain";
import { UserRepository } from "../../repos/UserRepo";
import { CreateUserErrors } from "./CreateUserErrors";

type Response = Either<
    AppError.UnexpectedError |
    CreateUserErrors.UserAlreadyExistError |
    CreateUserErrors.NameAlreadyUsedError |
    Result<any>,
    Result<void>
>

export class CreateUserUseCase implements UseCase<CreateUserDTO, Response> {
    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    };

    async execute(request: CreateUserDTO): Promise<Response> {
        try {
            const userNameOrError = UserName.create(request.name);
            const userEmailOrError = UserEmail.create(request.email);
            const userPasswordOrError = UserPassword.create(request.password);

            const userPropsResult = Result.combine([userNameOrError, userEmailOrError, userPasswordOrError]);

            if (userPropsResult.isFailure) {
                left(new AppError.UnexpectedError(userPropsResult.getErrorValue()))
            };

            const userName = userNameOrError.getValue();
            const userEmail = userEmailOrError.getValue();
            const userPassword = userPasswordOrError.getValue();

            const userAlreadyExist = await this.userRepo.existByEmail(userEmail);

            if (userAlreadyExist) {
                return left(new CreateUserErrors.UserAlreadyExistError())
            };

            const userNameUsed = await this.userRepo.findByName(userName);

            if (userNameUsed) {
                return left(new CreateUserErrors.NameAlreadyUsedError())
            };

            const userOrError = User.create({
                name: userName,
                email: userEmail,
                password: userPassword,
                isEmailVerified: false,
            });

            if (userOrError.isFailure) {
                left(new AppError.UnexpectedError(userPropsResult.getErrorValue()))
            };

            this.userRepo.create(userOrError.getValue());

            return right(Result.ok<void>())
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        };
    };
}