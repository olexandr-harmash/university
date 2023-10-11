import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface UserEmailAttributes {
    value: string;
};

export class UserEmail extends ValueObject<UserEmailAttributes> {
    static readonly minLength = 8;
    static readonly maxLength = 20;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<UserEmail> {
        const guardResult = Guard.inRange(value.length, this.minLength, this.maxLength, 'value');

        if (guardResult.isFailure) {
            return Result.fail<UserEmail>(`Length must be in range between ${this.minLength} and ${this.maxLength} symbols`);
        }

        const userName = new UserEmail({value});

        return Result.ok<UserEmail>(userName);
    };
};