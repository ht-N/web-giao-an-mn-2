const prisma = require('../prisma');

const createOrder = async (req, res) => {
    try {
        const { lessonId } = req.body;
        const userId = req.user.id;

        if (!lessonId) {
            return res.status(400).json({ error: 'Lesson ID is required' });
        }

        const lesson = await prisma.lesson.findUnique({ where: { id: parseInt(lessonId) } });
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Mock payment gateway interaction here
        // For now, we auto-complete the order to 'paid'
        const order = await prisma.order.create({
            data: {
                userId,
                lessonId: parseInt(lessonId),
                status: 'paid' // Auto-approve for demo
            }
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user.id;

        let orders;
        if (role === 'admin') {
            // Admin sees all orders
            orders = await prisma.order.findMany({
                include: { user: true, lesson: true },
                orderBy: { createdAt: 'desc' }
            });
        } else {
            // User sees their orders
            orders = await prisma.order.findMany({
                where: { userId },
                include: { lesson: true },
                orderBy: { createdAt: 'desc' }
            });
        }

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOrder, getOrders };
