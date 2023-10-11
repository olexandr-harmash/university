import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface PaymentIdAttributes {
    id: UniqueEntityID;
};

export class PaymentId extends ValueObject<PaymentIdAttributes> {
    get stringValue(): string {
        return this.props.id.toString();
    }

    get value(): UniqueEntityID {
        return this.props.id;
    }

    public static create(id: UniqueEntityID): Result<PaymentId> {
        const guardResult = Guard.againstNullOrUndefined(id, 'id');

        if (guardResult.isFailure) {
            return Result.fail<PaymentId>(guardResult.getErrorValue());
        };

        return Result.ok<PaymentId>(new PaymentId({ id }));
    };
};