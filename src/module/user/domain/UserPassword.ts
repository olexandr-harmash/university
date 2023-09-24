import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface UserPasswordAttributes {
    value: string;
};

export class UserPassword extends ValueObject<UserPasswordAttributes> {
    private static maxLength = 20;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<UserPassword> {
        const guardResult = Guard.greaterThan(value.length, this.maxLength);

        if (guardResult.isFailure) {
            return Result.fail<UserPassword>(`Length must be less than ${this.maxLength} symbols`);
        }

        const userPassword = new UserPassword({value});

        return Result.ok<UserPassword>(userPassword);
    };
};