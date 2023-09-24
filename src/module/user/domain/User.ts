import { JWTToken, RefreshToken, UserEmail, UserId, UserName, UserPassword } from ".";
import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { AggregateRoot } from "../../../libs/domain/AggregateRoot";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";


export interface UserAttributes {
    name: UserName;
    email: UserEmail;
    password: UserPassword;
    isEmailVerified: boolean;
    accessToken?: JWTToken;
    refreshToken?: RefreshToken;
};

export class User extends AggregateRoot<UserAttributes> {
    get userId(): UserId {
        return UserId.create(this._id).getValue();
    }

    get name(): UserName {
        return this.props.name;
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    get refreshToken(): RefreshToken {
        return this.props.refreshToken
    }

    get accessToken(): string {
        return this.props.accessToken;
    }

    public isLoggedIn(): boolean {
        return !!this.props.accessToken && !!this.props.refreshToken
    }

    public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
        // this.addDomainEvent(new UserLoggedIn(this));
        this.props.accessToken = token;
        this.props.refreshToken = refreshToken;
        // this.props.lastLogin = new Date();
    }

    public static create(props: UserAttributes, id?: UniqueEntityID): Result<User> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.email, argumentName: 'email' },
            { argument: props.password, argumentName: 'password' },
            { argument: props.isEmailVerified, argumentName: 'isEmailVerified' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<User>(guardResult.getErrorValue());
        };

        const user = new User(props, id);

        return Result.ok<User>(user);
    };
}