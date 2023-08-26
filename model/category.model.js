import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, unique: true },
    ParentId: { type: DataTypes.INTEGER },
});

Category.hasMany(Category, {as: 'children', foreignKey: 'ParentId'});
Category.belongsTo(Category, { as: 'Parent', foreignKey: 'ParentId'});

// Category.sync({alter: true}).then(() => {
//     console.log('Category sync done');
// })