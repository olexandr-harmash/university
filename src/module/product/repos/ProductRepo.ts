import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ProductCategory, ProductList } from "../domain";
import { Product } from "../domain/Product";
import { ProductIdList } from "../domain/ProductIdList";
import { ProductName } from "../domain/ProductName";
import ProductPrice from "../domain/ProductPrice";

export default interface ProductRepository {
    create(product: Product): Promise<void>;
    findById(id: UniqueEntityID): Promise<Result<Product>>;
    getListByIds(ids: ProductIdList): Promise<Result<ProductList>>;
    findByName(productName: ProductName): Promise<Result<Product>>;
    findByPrice(productEmail: ProductPrice): Promise<Result<Product>>;
    existByName(productEmail: ProductName): Promise<boolean>;
    findByCategory(category: ProductCategory): Promise<Result<ProductList>>
}