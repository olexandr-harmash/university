import { Application } from "express";
import Route from "../../../../libs/core/Router";
import { ProductController } from "../../useCases";

export class ProductRouter implements Route {
    private controller: ProductController;

    constructor(controller: ProductController) {
        this.controller = controller;
    }

    public async Rest(express: Application): Promise<void> {
        express.get('/product',
            (req, res) => this.controller.findProduct.execute(req, res)
        );

        express.post('/product',
            (req, res) => this.controller.createProduct.execute(req, res)
        );
    };
};
