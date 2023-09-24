import { BaseInterface, AppAbstract } from "../Base";

export default class Command extends AppAbstract implements BaseInterface {
    public readonly _args: string[] | null;

    public constructor(config: any) {
        super(config);

        this._args = process.argv.length > 3 ? process.argv.slice(3) : null;
    };

    public async init(): Promise<void> {
        // Run command
        this.RunCommand(process.argv[2]);
    };

    private async RunCommand(command: string): Promise<void> {
        try {
            switch (command) {
                case 'db:create':
                    /**
                     * Check logical of this code, main idea rerun Init() in case, when database need to be updated.
                     * Maybe traking of updates is needed.
                     */
                    await this._database.sequelize.sync({force: false});

                    break;
                default:
                    throw new Error(`Invalid command ${command}`);
            }
        } catch (err) {
            this.logger.error(`Command ${process.argv[2]} returned error`, err);
        };
    };
};