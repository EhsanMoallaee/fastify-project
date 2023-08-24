import { Sequelize } from "sequelize";
import './fastifyenv.config.js';

const POSTGRES_URL = process.env.POSTGRES_URL;

export const sequelize = new Sequelize(POSTGRES_URL);
const dbConnection = async() => {
    await sequelize.authenticate();
    console.log('Postgres database connected successfully');
}

dbConnection();
