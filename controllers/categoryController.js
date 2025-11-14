import { Category } from "../models.js";

class CategoryController {
    // Создание категории
    async create(req, res) {
        try {
            const { name, description } = req.body;

            if (!name) {
                return res.status(400).json({ error: "Поле 'name' обязательно" });
            }

            const category = await Category.create({ name, description });


            res.status(201).json({
                id: category.id,
                name: category.name,
                description: category.description
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async getAll(req, res) {
        try {
            const categories = await Category.findAll({
                attributes: ["id", "name", "description"]
            });
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async update(req, res) {
        try {
            const { id, name, description } = req.body;
            const category = await Category.findByPk(id);
            if (!category) return res.status(404).json({ error: "Category not found" });

            category.name = name ?? category.name;
            category.description = description ?? category.description;

            await category.save();

            res.json({
                id: category.id,
                name: category.name,
                description: category.description
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


    async delete(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) return res.status(404).json({ error: "Category not found" });

            await category.destroy();
            res.json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const categoryController = new CategoryController();