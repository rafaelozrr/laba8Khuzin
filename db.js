import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from "sequelize";

const seq = new Sequelize(String(process.env.DBNAME), String(process.env.DBUSER), String(process.env.DBPASS), {
    host: String(process.env.HOST),
    port: Number(process.env.DBPORT),
    dialect: "mysql"
});

export { seq };