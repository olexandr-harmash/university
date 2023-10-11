import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { ValueObject } from "../../../libs/domain/ValueObject";

interface ProductCategoryAttributes {
    value: string;
};

export class ProductCategory extends ValueObject<ProductCategoryAttributes> {
    static readonly minLength = 2;
    static readonly maxLength = 16;

    get value() {
        return this.props.value
    }

    public static create(value: string): Result<ProductCategory> {
        const guardResult = Guard.inRange(value.length, this.minLength, this.maxLength, 'value');

        if (guardResult.isFailure) {
            return Result.fail<ProductCategory>(`Length must be in range ${this.minLength} and ${this.maxLength} symbols`);
        }

        const productCategory = new ProductCategory({value});

        return Result.ok<ProductCategory>(productCategory);
    };
};