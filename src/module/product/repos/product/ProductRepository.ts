import { Sequelize, Op } from "sequelize";
import { models } from "../../../../infra/db/models";
import { Result } from "../../../../libs/core/Result";
import { UniqueEntityID } from "../../../../libs/domain/UniqueEntityID";
import { Product, ProductName, ProductPrice, ProductCategory, ProductList } from "../../domain";
import { ProductIdList } from "../../domain/ProductIdList";
import { ProductMapper } from "../../mappers/ProductMap";
import ProductRepository from "../ProductRepo";

export class ProductRepositoryImp implements ProductRepository {
    /**
     * TODO: strict type for models, or directly initialize models = models.
     */
    private models: typeof models;

    constructor(m: typeof models) {
        this.models = m;
    }
    /**
     * TODO: delete dublicates and pagination
     */

    async findByCategory(category: ProductCategory): Promise<Result<ProductList>> {
        const productModel = this.models.Product;

        const products = await productModel.findAll({
            where: {
                category: category.value
            }
        });

        const productListOrErrors = products.map(p => ProductMapper.toDomain(p));

        const productMapperResult = Result.combine(productListOrErrors);

        if (productMapperResult.isFailure) {
            return productMapperResult;
        };

        const productList = productListOrErrors.map(r => r.getValue());

        return Result.ok<ProductList>(ProductList.create(productList));
    }

    async findByPrice(productPrice: ProductPrice): Promise<Result<Product>> {
        const productModel = this.models.Product;

        const product = await productModel.findOne({
            where: {
                price: productPrice.value
            }
        });

        if (!product) return Result.fail<Product>('Product not found.');

        return ProductMapper.toDomain(product);
    };

    async getListByIds(ids: ProductIdList): Promise<Result<ProductList>> {
        const productModel = this.models.Product;

        const productIds = ids.getItems().map(i => i.stringValue);

        const sequilizeProductList = await productModel.findAll({
            where: {
                id: { [Op.in]: productIds }
            }
        });

        const isFullList = sequilizeProductList.length === productIds.length;

        if (!isFullList) {
            return Result.fail<ProductList>('Product not found.');
        }

        const productListOrErrors = sequilizeProductList.map(p => ProductMapper.toDomain(p));

        const productList = productListOrErrors.map(p => p.getValue());

        return Result.ok<ProductList>(ProductList.create(productList));
    };

    async findByName(productName: ProductName): Promise<Result<Product>> {
        const productModel = this.models.Product;

        const product = await productModel.findOne({
            where: {
                name: productName.value
            }
        });

        if (!product) return Result.fail<Product>('Product not found.');

        return ProductMapper.toDomain(product);
    };

    async existByName(productName: ProductName): Promise<boolean> {
        const productModel = this.models.Product;

        const product = await productModel.findOne({
            where: {
                name: productName.value
            }
        });

        return !!product === true;
    };

    /**
     * TODO: choose proper error handling for db layer.
     */
    async findById(id: UniqueEntityID) {
        const productModel = this.models.Product;

        const product = await productModel.findByPk(id.toString());

        if (!product) return Result.fail<Product>('Product not found.');

        return ProductMapper.toDomain(product);
    };

    async create(product: Product) {
        const productModel = this.models.Product;

        await productModel.create(ProductMapper.toPersistence(product));
    };
};