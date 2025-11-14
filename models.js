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
    password:{
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
    },
    activationLink: {
        type: Sequelize.STRING,
        allowNull: false
    },
    activeted: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true
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
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
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
        allowNull: true
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
});

// Посты 
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

// Заказы
const Order = seq.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pending" 
    }
});

// Товары в заказе
const OrderItem = seq.define("order_item", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price_at_a_time: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

// Отзывы
const Review = seq.define("review", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});



User.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(User);

Category.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(Category);

User.hasMany(Post, {onDelete: "CASCADE"});
Post.belongsTo(User);

User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

Order.hasMany(OrderItem, { onDelete: "CASCADE" });
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem, { onDelete: "CASCADE" });
OrderItem.belongsTo(Product);

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User);

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product);

export { User, Category, Product, Post, Order, OrderItem, Review };