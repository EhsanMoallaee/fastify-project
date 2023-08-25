import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, unique: true },
    // parent: { type: DataTypes.STRING, unique: true },
});

Category.sync({alter: true}).then(() => {
    console.log('Category sync done');
})