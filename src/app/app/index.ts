import Router from "../../infra/http/router";
import { Server } from "../../infra/http/server";
import DomainController from "../../libs/core/DomainController";
import { BillRepositoryImp } from "../../module/billing/repos/bill/BillRepo";
import { BillingController } from "../../module/billing/useCases";
import { ProductRepositoryImp } from "../../module/product/repos/product/ProductRepository";
import { ProductController } from "../../module/product/useCases";
import { UserRepositoryImp } from "../../module/user/repos/user/UserRepoImp";
import { UserController } from "../../module/user/useCases";
import { AppAbstract } from "../Base";

export default class App extends AppAbstract {
    public readonly server: Server;
    public readonly controllers: { [key: string]: DomainController };

    constructor(config: any) {
        super(config);

        this.server = new Server(config);
        this.controllers = {};
    };

    async init() {
        try {
            this._database.sequelize.authenticate();

            const userRepo = new UserRepositoryImp(this._database.models);
            const productRepo = new ProductRepositoryImp(this._database.models);
            const billRepo = new BillRepositoryImp(this._database.models);
            
            this.controllers.userController = new UserController(userRepo);
            this.controllers.productController = new ProductController(productRepo);
            this.controllers.billingController = new BillingController(productRepo, billRepo);

            const router = new Router(this.server.express);

            await router.Init(this.controllers);
            await this.server.init();

            this.logger.info('App was setup.')
        } catch (error) {
            this.logger.error(error)
        }
    };
};