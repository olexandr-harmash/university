import {
    DataTypes,
    Model,
    Optional,
    Sequelize,
} from "sequelize";

export interface ProductAttributes {
    id: string;
    name: string;
    price: number;
    rating: number;
    category: string;
}

export interface ProductInput extends Optional<ProductAttributes, 'id'> { }

export interface ProductOutput extends Required<ProductAttributes> { }

export default class Product extends Model<ProductOutput, ProductInput> implements ProductAttributes {
    declare id: string;
    declare name: string;
    declare price: number;
    declare rating: number;
    declare category: string;

    /**
     * TODO: add restricts to types
     */
    static Init(sequelize: Sequelize) {
        Product.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.REAL,
                    allowNull: false,
                },
                rating: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                category: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Product',
                paranoid: true,
            }
        );
    }
}