import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { Product, ProductPrice, ProductName, ProductRating, ProductCategory } from "../domain";
import { ProductMapper } from "./ProductMap";

/*
*   TODO: test sequence
*/
const testValues = {
    productDomain: Product.create({
        name: ProductName.create('test').getValue(),
        price: ProductPrice.create(10.5).getValue(),
        rating: ProductRating.create(4.5).getValue(),
        category: ProductCategory.create('Milk & Meat').getValue(),
    }, new UniqueEntityID('test')).getValue(),

    productPersistent: {
        id: 'test',
        name: 'test',
        price: 10.5,
        rating: 4.5,
        category: 'Milk & Meat',
    },
};

describe('ProductMap', () => {
    test('Product toPersistent...', () => {
        const productPersist = ProductMapper.toPersistence(testValues.productDomain);
        expect(productPersist).toStrictEqual(testValues.productPersistent);
    });

    test('Product toDomain...', () => {
        const productDomainOrError = ProductMapper.toDomain(testValues.productPersistent);
        expect(productDomainOrError.isFailure).not.toBe(true);
        expect(productDomainOrError.getValue()).toStrictEqual(testValues.productDomain);
    });
});