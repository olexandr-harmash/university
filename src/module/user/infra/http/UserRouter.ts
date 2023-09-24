import { Application } from "express";
import Route from "../../../../libs/core/Router";
import { UserController } from "../../useCases";

export class UserRouter implements Route {
    private controller: UserController;

    constructor (controller: UserController) {
        this.controller = controller;
    }

    public async Rest(express: Application): Promise<void> {
        express.post('/',
            (req, res) => this.controller.createUser.execute(req, res)
        );

        express.post('/login',
            (req, res) => this.controller.loginUser.execute(req, res)
        );
    };
};
