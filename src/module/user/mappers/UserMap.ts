import { UserAttributes } from "../../../infra/db/models/User";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { User, UserEmail, UserName, UserPassword } from "../domain";

export class UserMapper {
    static toDTO() {

    };

    static toDomain(props: UserAttributes): Result<User> {
        const userNameOrError = UserName.create(props.name);
        const userEmailOrError = UserEmail.create(props.email);
        const userPasswordOrError = UserPassword.create(props.password);
        const userOrError = User.create({
            name: userNameOrError.getValue(),
            email: userEmailOrError.getValue(),
            password: userPasswordOrError.getValue(),
            isEmailVerified: props.isEmailVerified,
        }, new UniqueEntityID(props.id));

        return userOrError;
    };

    static toPersistence(user: User): UserAttributes {
        return {
            id: user.userId.stringValue,
            name: user.name.value,
            email: user.email.value,
            password: user.password.value,
            isEmailVerified: user.isEmailVerified,
        }
    };
}