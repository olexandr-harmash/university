import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface PaymentStatusAttributes {
    value: string;
};

export class PaymentStatus extends ValueObject<PaymentStatusAttributes> {
    get value(): string {
        return this.props.value;
    }

    public static create(value: string): Result<PaymentStatus> {
        const guardResult = Guard.againstNullOrUndefined(value, 'value');

        if (guardResult.isFailure) {
            return Result.fail<PaymentStatus>(guardResult.getErrorValue());
        };

        return Result.ok<PaymentStatus>(new PaymentStatus({ value }));
    };
};