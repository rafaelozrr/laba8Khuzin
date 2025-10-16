import { Category } from "../models.js";

class CategoryController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id, name } = req.body;
            const category = await Category.findByPk(id);
            if (!category) return res.status(404).json({ error: "Category not found" });

            category.name = name;
            await category.save();
            res.json(category);
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