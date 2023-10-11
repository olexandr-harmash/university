import { AppError } from "../../../../libs/core/AppError";
import { Either, Result, left, right } from "../../../../libs/core/Result";
import { UseCase } from "../../../../libs/core/UseCase";
import { Product, ProductCategory, ProductName, ProductPrice, ProductRating } from "../../domain";
import ProductRepository from "../../repos/ProductRepo";
import { CreateProductErrors } from "./CreateProductErrors";

type Response = Either<
    AppError.UnexpectedError |
    CreateProductErrors.ProductAlreadyExistError |
    Result<any>,
    Result<void>
>

export class CreateProductUseCase implements UseCase<CreateProductDTO, Response> {
    private productRepo: ProductRepository;

    constructor(productRepo: ProductRepository) {
        this.productRepo = productRepo;
    };

    async execute(request: CreateProductDTO): Promise<Response> {
        try {
            const productNameOrError = ProductName.create(request.name);
            const productPriceOrError = ProductPrice.create(request.price);
            const productRatingOrError = ProductRating.create(0);
            const productCategoryOrError = ProductCategory.create(request.category);

            const resultOrError = Result.combine([productNameOrError, productPriceOrError, productRatingOrError, productCategoryOrError]);

            if (resultOrError.isFailure) {
                return left(new AppError.UnexpectedError(resultOrError.getErrorValue()));
            };

            const productName = productNameOrError.getValue();
            const productPrice = productPriceOrError.getValue();
            const productRating = productRatingOrError.getValue();
            const productCategory = productCategoryOrError.getValue();

            const existedProduct = await this.productRepo.existByName(productName);

            if (!!existedProduct) {
                return left(new CreateProductErrors.ProductAlreadyExistError())
            }

            const productOrError = Product.create({
                name: productName,
                price: productPrice,
                rating: productRating,
                category: productCategory,
            });

            if (productOrError.isFailure) {
                return left(new AppError.UnexpectedError(resultOrError.getErrorValue()));
            };

            await this.productRepo.create(productOrError.getValue());

            return right(Result.ok<void>())
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        };
    };
}