import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface PaymentExternalIdAttributes {
    id: UniqueEntityID;
};

export class PaymentExternalId extends ValueObject<PaymentExternalIdAttributes> {
    get stringValue(): string {
        return this.props.id.toString();
    }

    get value(): UniqueEntityID {
        return this.props.id;
    }

    public static create(id: UniqueEntityID): Result<PaymentExternalId> {
        const guardResult = Guard.againstNullOrUndefined(id, 'id');

        if (guardResult.isFailure) {
            return Result.fail<PaymentExternalId>(guardResult.getErrorValue());
        };

        return Result.ok<PaymentExternalId>(new PaymentExternalId({ id }));
    };
};