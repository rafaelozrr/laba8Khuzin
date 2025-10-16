import { Sequelize } from "sequelize";
import { seq } from "./db.js";

// Пользователь
const User = seq.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Категории
const Category = seq.define("category", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// продукт
const Product = seq.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    flavor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


const Post = seq.define("post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});




User.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(User);

Category.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(Category);

User.hasMany(Post, {onDelete: "CASCADE"});
Post.belongsTo(User);

export { User, Category, Product, Post };