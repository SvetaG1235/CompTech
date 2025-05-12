import Product from '../models/ProductsModel.js';
import CartService from '../services/CartService.js';

class CartController {
    async getCart(req, res) {
        try {
            const cart = CartService.initCart(req.session);
            const products = await Product.findAll({
                where: { id: cart.items.map(item => item.productId) }
            });
            
            const cartItems = cart.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                    ...item,
                    product: {
                        imageUrl: product?.imageUrl || '/images/default-product.jpg'
                    }
                };
            });
            
            res.render('cart', {
                title: 'Корзина',
                cartItems,
                total: CartService.calculateTotal(cart),
                user: req.session.user
            });
        } catch (error) {
            console.error('Get cart error:', error);
            res.status(500).render('error', {
                title: 'Ошибка',
                message: 'Не удалось загрузить корзину'
            });
        }
    }

    async addToCart(req, res) {
        try {
            const { productId } = req.body;
            const product = await Product.findByPk(productId);
            
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const cart = CartService.addToCart(
                req.session,
                product.id,
                product.name,
                product.price
            );

            await new Promise((resolve, reject) => {
                req.session.save(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            return res.json({ 
                success: true,
                cart
            });
        } catch (error) {
            console.error('Add to cart error:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    async removeFromCart(req, res) {
        try {
            const { productId } = req.params;
            const cart = CartService.removeFromCart(req.session, productId);

            await new Promise((resolve, reject) => {
                req.session.save(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            return res.json({ 
                success: true,
                cart
            });
        } catch (error) {
            console.error('Remove from cart error:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

const cartController = new CartController();
export default cartController;