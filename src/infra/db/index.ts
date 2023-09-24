import { Op, Sequelize } from "sequelize";
import { join } from "path";
import { models } from "./models";

export default class Database {
    public readonly models = models;
    public readonly sequelize: Sequelize;

    /**
     * TODO: check sequilize sync methods and implement the best pattern
     */
    constructor(config: any) {
        config.operatorsAliases = Op;
        config.models = [join(__dirname, 'models')];

        this.sequelize = new Sequelize(config);

        this.initModels();
    };

    initModels() {
        Object.keys(this.models).map(k => {
            this.models[k].Init(this.sequelize);
        });
    };
};