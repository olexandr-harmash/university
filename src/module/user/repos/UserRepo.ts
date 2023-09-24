import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { User, UserEmail, UserName } from "../domain";

export interface UserRepository {
    create(user: User): Promise<void>;
    findById(id: UniqueEntityID): Promise<Result<User>>;
    findByName(userName: UserName): Promise<Result<User>>;
    findByEmail(userEmail: UserEmail): Promise<Result<User>>;
    existByEmail(userEmail: UserEmail): Promise<boolean>;
}