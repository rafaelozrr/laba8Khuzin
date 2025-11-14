import { Review, Product, User } from "../models.js";

class ReviewController {
    async create(req, res) {
        try {
            const { productId, userId, text } = req.body;
            const review = await Review.create({ productId, userId, text });
            res.status(201).json(review);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const reviews = await Review.findAll({
                include: [Product, User]
            });
            res.json(reviews);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByProduct(req, res) {
        try {
            const productId = req.params.productId;
            const reviews = await Review.findAll({
                where: { productId },
                include: [User]
            });
            res.json(reviews);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const review = await Review.findByPk(req.params.id, {
                include: [Product, User]
            });
            if (!review) return res.status(404).json({ message: "Review not found" });
            res.json(review);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id, text } = req.body;
            const review = await Review.findByPk(id);
            if (!review) return res.status(404).json({ message: "Review not found" });
            review.text = text ?? review.text;
            await review.save();
            res.json(review);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const review = await Review.findByPk(req.params.id);
            if (!review) return res.status(404).json({ message: "Review not found" });
            await review.destroy();
            res.json({ message: "Deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const reviewController = new ReviewController();