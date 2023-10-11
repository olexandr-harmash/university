import * as express from "express";
import { BaseController } from "../../../../libs/core/http/BaseController";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { CreateProductErrors } from "./CreateProductErrors";

export class CreateProductController extends BaseController {
    private createProduct: CreateProductUseCase;

    constructor(createProduct: CreateProductUseCase) {
        super();

        this.createProduct = createProduct;
    };

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        try {
            const createProductResult = await this.createProduct.execute(req.body);

            if (createProductResult.isLeft()) {
                const error = createProductResult.value;

                switch (error.constructor) {
                    case CreateProductErrors.ProductAlreadyExistError:
                        return this.conflict(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                return this.ok(res);
            }
        } catch (err) {
            return this.fail(res, err);
        }
    }
}