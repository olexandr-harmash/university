import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface ProductIdAttributes {
    id: UniqueEntityID;
};

export class ProductId extends ValueObject<ProductIdAttributes> {
    get stringValue(): string {
        return this.props.id.toString();
    }

    get value(): UniqueEntityID {
        return this.props.id;
    }

    public static create(id: UniqueEntityID): Result<ProductId> {
        const guardResult = Guard.againstNullOrUndefined(id, 'id');

        if (guardResult.isFailure) {
            return Result.fail<ProductId>(guardResult.getErrorValue());
        };

        return Result.ok<ProductId>(new ProductId({ id }));
    };
};