import * as express from "express";
import { BaseController } from "../../../../libs/core/http/BaseController";
import { FindProductUseCase } from "./FindProductUseCase";
import { FindProductErrors } from "./FindProductErrors";
import { ProductMapper } from "../../mappers/ProductMap";


export class FindProductController extends BaseController {
    private createProduct: FindProductUseCase;

    constructor(createProduct: FindProductUseCase) {
        super();

        this.createProduct = createProduct;
    };

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        try {
            const createProductResult = await this.createProduct.execute({ category: req.query.category as string });

            if (createProductResult.isRight()) {
                const products = createProductResult.value.getValue().getItems();

                return this.ok(res, products.map(p => ProductMapper.toDTO(p)));
            } else {
                const error = createProductResult.value;

                switch (error.constructor) {
                    case FindProductErrors.CategoryDoesNotExistError:
                        return this.conflict(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            }
        } catch (err) {
            return this.fail(res, err);
        }
    }
}