import {
    DataTypes,
    Model,
    Optional,
    Sequelize,
} from "sequelize";

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }

export interface UserOutput extends Required<UserAttributes> { }

export default class User extends Model<UserOutput, UserInput> implements UserAttributes {
    declare id: string;
    declare name: string;
    declare email: string;
    declare password: string;
    declare isEmailVerified: boolean;

    static Init(sequelize: Sequelize) {
        User.init(
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
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isEmailVerified: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'User',
                paranoid: true,
            }
        );
    }
}