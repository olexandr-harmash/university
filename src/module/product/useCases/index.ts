import DomainController from "../../../libs/core/DomainController";
import { BaseController } from "../../../libs/core/http/BaseController";
import ProductRepository from "../repos/ProductRepo";
import { ProductRepositoryImp } from "../repos/product/ProductRepository";
import { CreateProductController } from "./createProduct/CreateProductController";
import { CreateProductUseCase } from "./createProduct/CreateProductUseCase";
import { FindProductController } from "./findProduct/FindProductController";
import { FindProductUseCase } from "./findProduct/FindProductUseCase";


export class ProductController extends DomainController {
    readonly findProduct: BaseController;
    readonly createProduct: BaseController;

    constructor (productRepo: ProductRepository) {
        super();

        const findProduct = new FindProductUseCase(productRepo);
        const createProduct = new CreateProductUseCase(productRepo);

        this.findProduct = new FindProductController(findProduct);
        this.createProduct = new CreateProductController(createProduct);
    };
};
