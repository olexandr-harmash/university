import { ProductAttributes } from "../../../infra/db/models/Product";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { Product, ProductCategory, ProductName, ProductPrice } from "../domain";
import ProductRating from "../domain/ProductRating";
import ProductCardDTO from "../dtos/ProductCardDTO";


export class ProductMapper {
    static toDTO(product: Product): ProductCardDTO {
        return {
            id: product.ProductId.stringValue,
            name: product.name.value,
            price: product.price.value,
            rating: product.rating.value,
            category: product.category.value,
        }
    };

    static toDomain(props: ProductAttributes): Result<Product> {
        const productNameOrError = ProductName.create(props.name);
        const productPriceOrError = ProductPrice.create(props.price);
        const productRatingOrError = ProductRating.create(props.rating);
        const productCategoryOrError = ProductCategory.create(props.category);
        const productOrError = Product.create({
            name: productNameOrError.getValue(),
            price: productPriceOrError.getValue(),
            rating: productRatingOrError.getValue(),
            category: productCategoryOrError.getValue(),
        }, new UniqueEntityID(props.id));

        return productOrError;
    };

    static toPersistence(product: Product): ProductAttributes {
        return {
            id: product.ProductId.stringValue,
            name: product.name.value,
            price: product.price.value,
            rating: product.rating.value,
            category: product.category.value,
        }
    };
}