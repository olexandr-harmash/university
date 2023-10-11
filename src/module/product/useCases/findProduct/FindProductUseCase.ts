import { AppError } from "../../../../libs/core/AppError";
import { Either, Result, left, right } from "../../../../libs/core/Result";
import { UseCase } from "../../../../libs/core/UseCase";
import { Product, ProductCategory, ProductList, ProductName, ProductPrice, ProductRating } from "../../domain";
import ProductRepository from "../../repos/ProductRepo";
import { FindProductErrors } from "./FindProductErrors";


type Response = Either<
    AppError.UnexpectedError |
    FindProductErrors.CategoryDoesNotExistError |
    Result<any>,
    Result<ProductList>
>

export class FindProductUseCase implements UseCase<FindProductDTO, Response> {
    private productRepo: ProductRepository;

    constructor(productRepo: ProductRepository) {
        this.productRepo = productRepo;
    };

    async execute(request: FindProductDTO): Promise<Response> {
        try {
            const categoryOrError = ProductCategory.create(request.category);

            if (categoryOrError.isFailure) {
                return left(new FindProductErrors.CategoryDoesNotExistError());
            }

            const category = categoryOrError.getValue();

            const productListOrError = await this.productRepo.findByCategory(category);

            if (productListOrError.isFailure) {
                return left(new AppError.UnexpectedError(productListOrError.getErrorValue()));
            }

            const productList = productListOrError.getValue();

            return right(Result.ok<ProductList>(productList));
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        };
    };
}