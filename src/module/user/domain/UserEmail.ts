import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface UserEmailAttributes {
    value: string;
};

export class UserEmail extends ValueObject<UserEmailAttributes> {
    private static maxLength = 20;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<UserEmail> {
        const guardResult = Guard.greaterThan(value.length, this.maxLength);

        if (guardResult.isFailure) {
            return Result.fail<UserEmail>(`Length must be less than ${this.maxLength} symbols`);
        }

        const userName = new UserEmail({value});

        return Result.ok<UserEmail>(userName);
    };
};