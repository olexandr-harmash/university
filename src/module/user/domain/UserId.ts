import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface UserIdAttributes {
    id: UniqueEntityID;
};

export class UserId extends ValueObject<UserIdAttributes> {
    get stringValue(): string {
        return this.props.id.toString();
    }

    get value(): UniqueEntityID {
        return this.props.id;
    }

    public static create(id: UniqueEntityID): Result<UserId> {
        const guardResult = Guard.againstNullOrUndefined(id, 'id');

        if (guardResult.isFailure) {
            return Result.fail<UserId>(guardResult.getErrorValue());
        };

        return Result.ok<UserId>(new UserId({ id }));
    };
};