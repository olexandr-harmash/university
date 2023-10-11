import {
    DataTypes,
    Model,
    Optional,
    Sequelize,
} from "sequelize";

export interface BillAttributes {
    id: string;
    user_email: string;
    product_ids: string[];
    price: number;
    external_id: string;
    status: string;
}

export interface BillInput extends Optional<BillAttributes, 'id'> { }

export interface BillOutput extends Required<BillAttributes> { }

export default class Bill extends Model<BillOutput, BillInput> implements BillAttributes {
    declare id: string;
    declare user_email: string;
    declare product_ids: string[];
    declare price: number;
    declare external_id: string;
    declare status: string;

    /**
     * TODO: add restricts to types
     */
    static Init(sequelize: Sequelize) {
        Bill.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                product_ids: {
                    type: DataTypes.ARRAY(DataTypes.STRING)
                },
                external_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                user_email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.REAL,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Bill',
                paranoid: true,
            }
        );
    }
}