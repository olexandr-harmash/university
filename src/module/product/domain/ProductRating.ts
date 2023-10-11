import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";
import { mapToArray } from "../../../libs/help/Array";

interface ProductRatingAttributes {
    value: number;
};

export default class ProductRating extends ValueObject<ProductRatingAttributes> {
    get value() {
        return this.props.value;
    }

    get stringValue() {
        return `${this.props.value} from 5`
    }

    public static create(value: number): Result<ProductRating> {
        const guardResult = Guard.inRange(value, 0, 5, 'value');

        if (guardResult.isFailure) {
            return Result.fail<ProductRating>(guardResult.getErrorValue());
        }

        const productRating = new ProductRating({ value });

        return Result.ok<ProductRating>(productRating);
    };
};