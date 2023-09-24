import { AppError } from "../../../../libs/core/AppError";
import { Either, Result, left, right } from "../../../../libs/core/Result";
import { UseCase } from "../../../../libs/core/UseCase";
import { JWTToken, RefreshToken, UserName, UserPassword } from "../../domain";
import { UserRepository } from "../../repos/UserRepo";
import { AuthService } from "../../services/AuthService";
import { LoginDTO, LoginDTOResponse } from "./LoginUserDTO";
import { LoginUserErrors } from "./LoginUserErrors";

type Response = Either<
    AppError.UnexpectedError |
    LoginUserErrors.UserNotFoundError |
    Result<any>,
    Result<LoginDTOResponse>
>

export class LoginUserUseCase implements UseCase<LoginDTO, Response> {
    private userRepo: UserRepository;
    private authService: AuthService;

    constructor(userRepo: UserRepository, authService: AuthService) {
        this.userRepo = userRepo;
        this.authService = authService;
    };

    async execute(request: LoginDTO): Promise<Response> {
        try {
            const userNameOrError = UserName.create(request.username);
            const userPasswordOrError = UserPassword.create(request.password);

            const propsResult = Result.combine([userNameOrError, userPasswordOrError]);

            if (propsResult.isFailure) {
                return left(new AppError.UnexpectedError(propsResult.getErrorValue()));
            };

            const userName = userNameOrError.getValue();
            const userPassword = userPasswordOrError.getValue();

            const userOrError = await this.userRepo.findByName(userName);

            if (userOrError.isFailure) {
                return left(new LoginUserErrors.UserNotFoundError());
            };

            const user = userOrError.getValue();

            const isTheSamePasswords = user.password.equals(userPassword);

            if (!isTheSamePasswords) {
                return left(new LoginUserErrors.UserNotFoundError());
            };

            const accessToken: JWTToken = this.authService.signJWT({
                name: user.name.value,
                email: user.email.value,
                isEmailVerified: user.isEmailVerified,
                userId: user.userId.stringValue,
            });

            const refreshToken: RefreshToken = this.authService
                .createRefreshToken();

            user.setAccessToken(accessToken, refreshToken);

            this.authService.saveAuthenticatedUser(user);

            return right(Result.ok({
                accessToken,
                refreshToken
            }));
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        };
    };
}