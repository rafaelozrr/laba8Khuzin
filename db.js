import { Sequelize } from "sequelize";

const seq = new Sequelize("blog_app", "root", "root", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

export { seq };