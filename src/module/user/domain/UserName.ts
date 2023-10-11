import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface UserNameAttributes {
    value: string;
};

export class UserName extends ValueObject<UserNameAttributes> {
    static readonly minLength = 3;
    static readonly maxLength = 20;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<UserName> {
        const guardResult = Guard.inRange(value.length, this.minLength, this.maxLength, 'value');

        if (guardResult.isFailure) {
            return Result.fail<UserName>(`Length must be in range between ${this.minLength} and ${this.maxLength} symbols`);
        }

        const userName = new UserName({value});

        return Result.ok<UserName>(userName);
    };
};