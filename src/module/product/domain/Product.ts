import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { AggregateRoot } from "../../../libs/domain/AggregateRoot";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ProductCategory } from "./ProductCategory";
import { ProductId } from "./ProductId";
import { ProductName } from "./ProductName";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

interface ProductAttributes {
    name: ProductName;
    price: ProductPrice;
    rating: ProductRating;
    category: ProductCategory;
}

export class Product extends AggregateRoot<ProductAttributes> {
    get ProductId(): ProductId {
        return ProductId.create(this._id).getValue();
    }

    get name(): ProductName {
        return this.props.name;
    }

    get rating(): ProductRating {
        return this.props.rating;
    }

    get price(): ProductPrice {
        return this.props.price;
    }

    get category(): ProductCategory {
        return this.props.category;
    }

    public static create(props: ProductAttributes, id?: UniqueEntityID): Result<Product> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.price, argumentName: 'price' },
            { argument: props.rating, argumentName: 'rating' },
            { argument: props.category, argumentName: 'category' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Product>(guardResult.getErrorValue());
        };

        const product = new Product(props, id);

        return Result.ok<Product>(product);
    };
}