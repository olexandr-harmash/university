import Router from "../../infra/http/router";
import { Server } from "../../infra/http/server";
import DomainController from "../../libs/core/DomainController";
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

            this.controllers.userController = new UserController(this._database);
            const router = new Router(this.server.express);

            await router.Init(this.controllers);
            await this.server.init();

            this.logger.info('App was setup.')
        } catch (error) {
            this.logger.error(error)
        }
    };
};