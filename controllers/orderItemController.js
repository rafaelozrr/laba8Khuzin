import { OrderItem, Product, Order } from "../models.js";

class OrderItemController {
    async create(req, res) {
        try {
            const { orderId, productId, price_at_a_time, quantity } = req.body;
            const item = await OrderItem.create({ orderId, productId, price_at_a_time, quantity });
            res.status(201).json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const items = await OrderItem.findAll({
                include: [Product, Order]
            });
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getOne(req, res) {
        try {
            const item = await OrderItem.findByPk(req.params.id, {
                include: [Product, Order]
            });
            if (!item) return res.status(404).json({ message: "Item not found" });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id, quantity } = req.body;
            const item = await OrderItem.findByPk(id);
            if (!item) return res.status(404).json({ message: "Item not found" });
            if (quantity != null) item.quantity = quantity;
            await item.save();
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const item = await OrderItem.findByPk(req.params.id);
            if (!item) return res.status(404).json({ message: "Item not found" });
            await item.destroy();
            res.json({ message: "Deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export const orderItemController = new OrderItemController();