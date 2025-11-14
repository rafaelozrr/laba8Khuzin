import { Product, Category, User } from "../models.js";

class ProductController {

    async create(req, res) {
        try {
            const { name, flavor, weight, price, country, categoryId, userId, image, description, stock_quantity } = req.body;

            if (!name || !price) {
                return res.status(400).json({ error: "Поля 'name' и 'price' обязательны" });
            }

            const product = await Product.create({
                name,
                flavor,
                weight,
                price,
                country,
                categoryId,
                userId,
                image,
                description,
                stock_quantity
            });

            res.status(201).json({
                id: product.id,
                name: product.name,
                flavor: product.flavor,
                weight: product.weight,
                price: product.price,
                country: product.country,
                categoryId: product.categoryId,
                userId: product.userId,
                image: product.image,
                description: product.description,
                stock_quantity: product.stock_quantity
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async getAll(req, res) {
        try {
            const { categoryId, page = 1, limit = 10 } = req.query;
            const where = {};

            if (categoryId) {
                where.categoryId = Number(categoryId);
            }

            const pageNum = Number(page) || 1;
            const lim = Number(limit) || 10;
            const offset = (pageNum - 1) * lim;

            const { count, rows } = await Product.findAndCountAll({
                where,
                include: [
                    { model: Category, attributes: ["id", "name"] },
                    { model: User, attributes: ["id", "first_name", "last_name", "email"] }
                ],
                limit: lim,
                offset,
                order: [["id", "ASC"]]
            });

            const totalPages = Math.ceil(count / lim);

            res.json({
                items: rows.map(p => ({
                    id: p.id,
                    name: p.name,
                    flavor: p.flavor,
                    weight: p.weight,
                    price: p.price,
                    country: p.country,
                    category: p.Category ? { id: p.Category.id, name: p.Category.name } : null,
                    user: p.User ? { id: p.User.id, first_name: p.User.first_name, last_name: p.User.last_name, email: p.User.email } : null,
                    image: p.image,
                    description: p.description,
                    stock_quantity: p.stock_quantity
                })),
                meta: {
                    total: count,
                    page: pageNum,
                    limit: lim,
                    totalPages
                }
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async getOne(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [
                    { model: Category, attributes: ["id", "name"] },
                    { model: User, attributes: ["id", "first_name", "last_name", "email"] }
                ]
            });
            if (!product) return res.status(404).json({ error: "Product not found" });

            res.json({
                id: product.id,
                name: product.name,
                flavor: product.flavor,
                weight: product.weight,
                price: product.price,
                country: product.country,
                category: product.Category ? { id: product.Category.id, name: product.Category.name } : null,
                user: product.User ? { id: product.User.id, first_name: product.User.first_name, last_name: product.User.last_name, email: product.User.email } : null,
                image: product.image,
                description: product.description,
                stock_quantity: product.stock_quantity
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async update(req, res) {
        try {
            const { id, name, flavor, weight, price, country, categoryId, userId, image, description, stock_quantity } = req.body;
            const product = await Product.findByPk(id);
            if (!product) return res.status(404).json({ error: "Product not found" });

            product.name = name ?? product.name;
            product.flavor = flavor ?? product.flavor;
            product.weight = weight ?? product.weight;
            product.price = price ?? product.price;
            product.country = country ?? product.country;
            product.categoryId = categoryId ?? product.categoryId;
            product.userId = userId ?? product.userId;
            product.image = image ?? product.image;
            product.description = description ?? product.description;
            product.stock_quantity = stock_quantity ?? product.stock_quantity;

            await product.save();

            res.json({
                id: product.id,
                name: product.name,
                flavor: product.flavor,
                weight: product.weight,
                price: product.price,
                country: product.country,
                categoryId: product.categoryId,
                userId: product.userId,
                image: product.image,
                description: product.description,
                stock_quantity: product.stock_quantity
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async delete(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return res.status(404).json({ error: "Product not found" });

            await product.destroy();
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const productController = new ProductController();