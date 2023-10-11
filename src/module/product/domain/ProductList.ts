import { WatchedList } from "../../../libs/domain/WatchedList";
import { Product } from "./Product";

export class ProductList extends WatchedList<Product> {
  private constructor (initialVotes: Product[]) {
    super(initialVotes)
  }

  public compareItems (a: Product, b: Product): boolean {
    return a.equals(b)
  }

  /**
   * TODO: prove reliability's right
   */
  public priceSummary() {
    return this.currentItems.reduce((p, c) => p += c.price.value, 0);
  }

  public static create (productList?: Product[]): ProductList {
    return new ProductList(productList ? productList : []);
  }
}