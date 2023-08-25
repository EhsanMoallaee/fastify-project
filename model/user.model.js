import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export class User extends Model {}

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    birthday: { type: DataTypes.DATE },
    accessToken: { type: DataTypes.STRING, default: '' },
}, {
    sequelize,
    name: 'users'
})

// User.sync({ alter: true }).then(result => {
//     console.log('User Table : ', result);
// })