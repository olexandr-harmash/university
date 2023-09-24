import { Application } from "express";
import { UserRouter } from "../../../module/user/infra/http/UserRouter";
import Route from "../../../libs/core/Router";

export default class Router {
  private readonly express: Application;

  // Routers
  public user: UserRouter;

  public constructor(express: Application) {
    this.express = express;
  }
  public async Init(controllers: { [key: string]: any }): Promise<void> {
    const routes: Route[] = [];

    // Load routes
    this.user = new UserRouter(controllers.userController);

    routes.push(this.user);

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