import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface UserNameAttributes {
    value: string;
};

export class UserName extends ValueObject<UserNameAttributes> {
    private static maxLength = 20;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<UserName> {
        const guardResult = Guard.greaterThan(value.length, this.maxLength);

        if (guardResult.isFailure) {
            return Result.fail<UserName>(`Length must be less than ${this.maxLength} symbols`);
        }

        const userName = new UserName({value});

        return Result.ok<UserName>(userName);
    };
};