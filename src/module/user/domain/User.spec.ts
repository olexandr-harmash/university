import { Result } from "../../../libs/core/Result";
import { User, UserEmail, UserName, UserPassword } from "../domain/";

const testValues = {
    userName: {
        proper: 'less20symbols',
        failure: 'more40symbols..................'
    },

    userEmail: {
        proper: 'less20symbols@.com',
        failure: 'more40symbols@.com..................'
    },

    userPassword: {
        proper: 'less20symbols',
        failure: 'more40symbols..................'
    },
};

describe('User', () => {
    test('User fabric testing success...', () => {
        const userNameOrError = UserName.create(testValues.userName.proper);
        const userEmailOrError = UserEmail.create(testValues.userEmail.proper);
        const userPasswordOrError = UserPassword.create(testValues.userPassword.proper);
        const userOrError = User.create({
            name: userNameOrError.getValue(),
            email: userEmailOrError.getValue(),
            password: userPasswordOrError.getValue(),
            isEmailVerified: false,
        });
        const userPropsResult = Result.combine([userNameOrError, userEmailOrError, userPasswordOrError, userOrError]);

        expect(userPropsResult.isFailure).not.toBe(true);
    });

    test('User fabric testing failure...', () => {
        const userNameOrError = UserName.create(testValues.userName.failure);
        const userEmailOrError = UserEmail.create(testValues.userEmail.failure);
        const userPasswordOrError = UserPassword.create(testValues.userPassword.failure);
        const userPropsResult = Result.combine([userNameOrError, userEmailOrError, userPasswordOrError]);

        expect(userPropsResult.isFailure).toBe(true);
    });
});