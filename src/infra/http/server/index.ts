
import { ServerInitializer } from "./initialize";
import { ServerListener } from "./listen";
import * as Http from 'http';
import * as Https from 'https';
import Morgan from 'morgan';
import bodyParser, * as BodyParser from 'body-parser';
import Express from 'express';
import Cors from 'cors';
import app from "../../../app";
import { BaseAbstract, BaseInterface } from "../../../app/Base";

export class Server extends BaseAbstract implements BaseInterface {
    public readonly express: Express.Application;

    protected _server: Http.Server | Https.Server;

    constructor(config: any) {
        super(config);

        // Init express
        this.express = Express();
        this.express.use(Cors());
        this.express.use(BodyParser.json(this._config.bodyParser));
        this.express.use(BodyParser.urlencoded(this._config.bodyParser));

        // Add morgan middleware to express
        this.express.use(
            Morgan(':remote-addr :method :url :status :user-agent', {
                stream: {
                    write: (msg: string): void => {
                        app.logger.info(msg.slice(0, -1));
                    }
                }
            })
        );
    };

    public async init() {
        this._server = await this.ServerInitializer();
        await this.ServerListener();
    }

    public ServerInitializer = ServerInitializer
    public ServerListener = ServerListener
}