import { Order, OrderItem, Product, User } from "../models.js";

class OrderController {
    // Создать заказ (в теле: userId, items: [{productId, quantity}])
    async create(req, res) {
        try {
            const { userId, items } = req.body;
            if (!userId || !items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "userId и items обязательны" });
            }

            // считаем сумму и создаем заказ
            let total = 0;
            const order = await Order.create({ userId, amount: 0, status: "pending" });

            for (const it of items) {
                const product = await Product.findByPk(it.productId);
                if (!product) continue;
                const priceAtTime = product.price;
                const quantity = Number(it.quantity) || 1;
                total += priceAtTime * quantity;

                await OrderItem.create({
                    orderId: order.id,
                    productId: product.id,
                    price_at_a_time: priceAtTime,
                    quantity
                });

                // уменьшаем склад (если задано)
                if (product.stock_quantity != null) {
                    product.stock_quantity = Math.max(0, product.stock_quantity - quantity);
                    await product.save();
                }
            }

            order.amount = total;
            await order.save();

            const created = await Order.findByPk(order.id, {
                include: [{ model: OrderItem, include: [Product] }, User]
            });

            res.status(201).json(created);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Получить все заказы (админ)
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [{ model: OrderItem, include: [Product] }, User],
                order: [['date', 'DESC']]
            });
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Получить заказы конкретного пользователя по userId (query или params)
    async getUserOrders(req, res) {
        try {
            const userId = req.params.userId || req.query.userId;
            if (!userId) return res.status(400).json({ message: "userId обязателен" });

            const orders = await Order.findAll({
                where: { userId },
                include: [{ model: OrderItem, include: [Product] }],
                order: [['date', 'DESC']]
            });

            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Получить один заказ с товарами
    async getOne(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [{ model: OrderItem, include: [Product] }, User]
            });
            if (!order) return res.status(404).json({ message: "Order not found" });
            res.json(order);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Обновить статус/данные заказа
    async update(req, res) {
        try {
            const { id, status } = req.body;
            const order = await Order.findByPk(id);
            if (!order) return res.status(404).json({ message: "Order not found" });

            if (status) order.status = status;
            await order.save();

            res.json(order);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) return res.status(404).json({ message: "Order not found" });
            await order.destroy();
            res.json({ message: "Deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
export const orderController = new OrderController();