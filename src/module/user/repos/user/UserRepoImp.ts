import { models } from "../../../../infra/db/models";
import { Result } from "../../../../libs/core/Result";
import { UniqueEntityID } from "../../../../libs/domain/UniqueEntityID";
import { User, UserEmail, UserName } from "../../domain";
import { UserMapper } from "../../mappers/UserMap";
import { UserRepository } from "../UserRepo";

export class UserRepositoryImp implements UserRepository {
    /**
     * TODO: strict type for models, or directly initialize models = models.
     */
    private models: typeof models;

    constructor(m: typeof models) {
        this.models = m;
    }
    async findByEmail(userEmail: UserEmail): Promise<Result<User>> {
        const userModel = this.models.User;

        const user = await userModel.findOne({
            where: {
                email: userEmail.value
            }
        });

        return UserMapper.toDomain(user);
    };

    async findByName(userName: UserName): Promise<Result<User>> {
        const userModel = this.models.User;

        const user = await userModel.findOne({
            where: {
                name: userName.value
            }
        });

        return UserMapper.toDomain(user);
    };

    async existByEmail(userEmail: UserEmail): Promise<boolean> {
        const userModel = this.models.User;

        const user = await userModel.findOne({
            where: {
                email: userEmail.value
            }
        });

        return !!user === true;
    };

    /**
     * TODO: choose proper error handling for db layer.
     */
    async findById(id: UniqueEntityID) {
        const userModel = this.models.User;

        const user = await userModel.findByPk(id.toString());

        if (!user) return Result.fail<User>('User not found.');

        return UserMapper.toDomain(user);
    };

    async create(user: User) {
        const userModel = this.models.User;

        await userModel.create(UserMapper.toPersistence(user));
    };
};