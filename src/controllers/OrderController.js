import OrderService from '../services/OrderService.js';
import CartService from '../services/CartService.js';

class OrderController {
    async showNewOrderForm(req, res) {
        try {
            if (!req.session.cart?.items?.length) {
                return res.redirect('/cart');
            }

            const cart = {
                items: req.session.cart.items,
                total: CartService.calculateTotal(req.session.cart)
            };

            res.render('order', {
                title: 'Оформление заказа',
                cart,
                user: req.session.user || {},
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            console.error('Order form error:', error);
            res.status(500).render('error', {
                title: 'Ошибка',
                message: 'Не удалось загрузить форму заказа'
            });
        }
    }

    async createOrder(req, res) {
        try {
            if (!req.session.cart?.items?.length) {
                return res.status(400).json({ error: 'Корзина пуста' });
            }

            const { name, phone, address } = req.body;
            
            if (!name || !phone || !address) {
                return res.status(400).json({ error: 'Все поля обязательны' });
            }

            const order = await OrderService.createOrder({
                userId: req.session.user?.id,
                name,
                phone,
                address,
                cartItems: req.session.cart.items
            });

            CartService.clearCart(req.session);

            return res.json({ 
                success: true,
                orderId: order.id
            });
        } catch (error) {
            console.error('Create order error:', error);
            return res.status(500).json({ 
                success: false,
                error: error.message || 'Не удалось оформить заказ'
            });
        }
    }

    async getOrderDetails(req, res) {
        try {
            const order = await OrderService.getOrderDetails(req.params.id);
            
            if (!order) {
                return res.status(404).render('404', {
                    title: 'Заказ не найден'
                });
            }

            res.render('order-details', {
                title: `Заказ #${order.id}`,
                order
            });
        } catch (error) {
            console.error('Order details error:', error);
            res.status(500).render('error', {
                title: 'Ошибка',
                message: 'Не удалось загрузить детали заказа'
            });
        }
    }
}

export default new OrderController();