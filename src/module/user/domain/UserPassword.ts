import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface UserPasswordAttributes {
    value: string;
};

export class UserPassword extends ValueObject<UserPasswordAttributes> {
    static readonly minLength = 6;
    static readonly maxLength = 20;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<UserPassword> {
        const guardResult = Guard.inRange(value.length, this.minLength, this.maxLength, 'value');

        if (guardResult.isFailure) {
            return Result.fail<UserPassword>(`Length must be in range between ${this.minLength} and ${this.maxLength} symbols`);
        }

        const userPassword = new UserPassword({value});

        return Result.ok<UserPassword>(userPassword);
    };
};