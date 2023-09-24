import path = require("path");
import { Logger, LoggerInterface } from "../libs/services";
import Database from "../infra/db";
import { NODE_ENV } from "../config";

export interface BaseInterface {
    /**
     * TODO: decide why ts emit error that app has no logger property
     */
    [x: string]: any;
    init (...args: any[]): Promise<void>;
}

export class BaseAbstract {
    protected _config: any;
    protected _rootDir: string;

    constructor(config: any) {
        this._config = config;

        this._rootDir = path.resolve(__dirname, '..', '..');
    };
};

export class AppAbstract extends BaseAbstract {
    public readonly logger: LoggerInterface;

    public readonly _database: Database;

    constructor(config: any) {
        super(config);
        // Init logger
        this.logger = new Logger(config).getLogger();

        // Init model
        // Add logger to sequelize
        this._config.test.logging = this.logger.info;
        this._config.development.logging = this.logger.info;

        this._database = new Database(this._config[NODE_ENV]);

        this._database.initModels();
    };
};