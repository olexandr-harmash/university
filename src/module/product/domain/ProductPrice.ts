import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface ProductPriceAttributes {
    value: number;
};

export default class ProductPrice extends ValueObject<ProductPriceAttributes> {
    get value() {
        return this.props.value;
    }

    public static create(value: number): Result<ProductPrice> {
        const guardResult = Guard.greaterThan(0, value);

        if (guardResult.isFailure) {
            return Result.fail<ProductPrice>(guardResult.getErrorValue());
        }

        const productPrice = new ProductPrice({ value });

        return Result.ok<ProductPrice>(productPrice);
    };
};