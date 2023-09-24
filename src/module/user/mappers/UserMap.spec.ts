import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { User, UserEmail, UserName, UserPassword } from "../domain/";
import { UserMapper } from "./UserMap";

/*
*   TODO: test sequence
*/
const testValues = {
    userDomain: User.create({
        name: UserName.create('test').getValue(),
        email: UserEmail.create('test').getValue(),
        password: UserPassword.create('test').getValue(),
        isEmailVerified: false,
    }, new UniqueEntityID('test')).getValue(),

    userPersistent: {
        id: 'test',
        name: 'test',
        email: 'test',
        password: 'test',
        isEmailVerified: false,
    },
};

describe('UserMap', () => {
    test('User toPersistent...', () => {
        const userPersist = UserMapper.toPersistence(testValues.userDomain);
        expect(userPersist).toStrictEqual(testValues.userPersistent);
    });

    test('User toDomain...', () => {
        const userDomainOrError = UserMapper.toDomain(testValues.userPersistent);
        expect(userDomainOrError.isFailure).not.toBe(true);
        expect(userDomainOrError.getValue()).toStrictEqual(testValues.userDomain);
    });
});