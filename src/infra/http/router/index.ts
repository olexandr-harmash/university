import { Application } from "express";
import { UserRouter } from "../../../module/user/infra/http/UserRouter";
import Route from "../../../libs/core/Router";
import { ProductRouter } from "../../../module/product/infra/http/ProductRouter";
import { BillingRouter } from "../../../module/billing/infra/http/PaymentRouter";

export default class Router {
  private readonly express: Application;

  // Routers
  public user: UserRouter;
  public product: ProductRouter;
  public billing: BillingRouter;

  public constructor(express: Application) {
    this.express = express;
  }
  public async Init(controllers: { [key: string]: any }): Promise<void> {
    const routes: Route[] = [];

    // Load routes
    this.user = new UserRouter(controllers.userController);
    this.product = new ProductRouter(controllers.productController);
    this.billing = new BillingRouter(controllers.billingController);

    routes.push(this.user, this.product, this.billing);

    // Init servers
    for (const router of routes) {
      // Init express and socket
      if (router.Rest) {
        await router.Rest(this.express);
      }
      if (router.General) {
        await router.General();
      }
    }
  }
}