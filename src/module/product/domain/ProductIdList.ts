import { WatchedList } from "../../../libs/domain/WatchedList";
import { ProductId } from "./ProductId";

export class ProductIdList extends WatchedList<ProductId> {
    private constructor(initialVotes: ProductId[]) {
        super(initialVotes)
    }

    public compareItems(a: ProductId, b: ProductId): boolean {
        return a.equals(b)
    }

    public static create(productList?: ProductId[]): ProductIdList {
        return new ProductIdList(productList ? productList : []);
    }
}