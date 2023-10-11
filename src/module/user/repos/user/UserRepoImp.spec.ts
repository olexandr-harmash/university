import { UniqueEntityID } from "../../../../libs/domain/UniqueEntityID";
import { UserPassword, UserEmail, UserName, User } from "../../domain";
import  UserModel from "../../../../infra/db/models/User";
import  ProductModel from "../../../../infra/db/models/Product";
import { UserRepositoryImp } from "./UserRepoImp";
import app from "../../../../app";

/**
 * TODO: get repo from app
 */
//UserModel.Init(app._database.sequelize);

//const userRepo = new UserRepositoryImp({ User: UserModel, Product: ProductModel });
/*
*   TODO: test sequence
*/
const testValues = {
    userDomain: User.create({
        name: UserName.create('test').getValue(),
        email: UserEmail.create('test').getValue(),
        password: UserPassword.create('test').getValue(),
        isEmailVerified: false,
    }, new UniqueEntityID('9e9287d9-c12d-4e31-906e-f9afffa0bffa')).getValue(),

    userPersistent: {
        id: '9e9287d9-c12d-4e31-906e-f9afffa0bffa',
        name: 'test',
        email: 'test',
        password: 'test',
        isEmailVerified: false,
    },
};

describe('UserMap', () => {
    afterEach(async () => {
        //await UserModel.destroy({ where: { email: testValues.userPersistent.email }, force: true });
    });

    test(`UserRepositoeyImp create... ${Object.keys(app._database)}`, async () => {
        // await userRepo.create(testValues.userDomain)

        // const user = await userRepo.existByEmail(testValues.userDomain.email);

        // expect(user).toBe(true);
    });
});