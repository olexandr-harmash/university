import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface ProductNameAttributes {
    value: string;
};

export class ProductName extends ValueObject<ProductNameAttributes> {
    static readonly minLength = 2;
    static readonly maxLength = 20;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<ProductName> {
        const guardResult = Guard.inRange(value.length, this.minLength, this.maxLength, 'value');

        if (guardResult.isFailure) {
            return Result.fail<ProductName>(`Length must be in range ${this.minLength} and ${this.maxLength} symbols`);
        }

        const productName = new ProductName({value});

        return Result.ok<ProductName>(productName);
    };
};