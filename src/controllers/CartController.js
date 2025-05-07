import CartService from '../services/CartService.js';
import Product from '../models/ProductsModel.js';

class CartController {
    async getCart(req, res) {
        try {
            const cartItems = CartService.getCart(req);
            
            if (!cartItems.length) {
                return res.render('cart', {
                    title: 'Корзина',
                    cartItems: [],
                    total: 0,
                    user: req.session.user
                });
            }
    
            const productIds = cartItems.map(item => item.productId);
            const products = await Product.findAll({
                where: { id: productIds }
            });
    
            const cartWithProducts = cartItems.map(item => {
                const product = products.find(p => p.id == item.productId);
                return product ? {
                    product: {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl || '/images/default-product.jpg'
                    },
                    quantity: item.quantity
                } : null;
            }).filter(Boolean);
    
            const total = cartWithProducts.reduce((sum, item) => {
                return sum + (item.product.price * item.quantity);
            }, 0);
    
            res.render('cart', { 
                title: 'Корзина',
                cartItems: cartWithProducts,
                total,
                user: req.session.user 
            });
        } catch (error) {
            res.status(500).render('error', { 
                title: 'Ошибка',
                message: 'Не удалось загрузить корзину',
                user: req.session.user
            });
        }
    }

    async addToCart(req, res) {
        try {
          const { productId, name, price, quantity } = req.body;
          
          if (!productId || !name || !price) {
            return res.status(400).json({ 
              success: false, 
              error: 'Неверные данные товара' 
            });
          }
      
          CartService.addToCart(req, productId, name, price, quantity);
          
          const count = CartService.getCartCount(req);
          res.json({ 
            success: true, 
            count,
            message: 'Товар добавлен в корзину',
            cart: CartService.getCart(req) // Добавлено для отладки
          });
        } catch (error) {
          console.error('Add to cart error:', error);
          res.status(500).json({ 
            success: false, 
            error: error.message 
          });
        }
      }

      async getCart(req, res) {
        try {
          const cartItems = CartService.getCart(req);
          const productIds = cartItems.map(item => item.productId);
          
          const products = await Product.findAll({
            where: { id: productIds }
          });
      
          const cartWithProducts = cartItems.map(item => {
            const product = products.find(p => p.id == item.productId);
            return {
              product: {
                id: product?.id || item.productId,
                name: product?.name || item.name,
                price: product?.price || item.price,
                imageUrl: product?.imageUrl || '/images/default-product.jpg'
              },
              quantity: item.quantity
            };
          });
      
          const total = cartWithProducts.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
          }, 0);
      
          res.render('cart', { 
            title: 'Корзина',
            cartItems: cartWithProducts,
            total,
            user: req.session.user 
          });
        } catch (error) {
          console.error('Get cart error:', error);
          res.status(500).render('error', { 
            title: 'Ошибка',
            message: 'Не удалось загрузить корзину',
            user: req.session.user
          });
        }
      }

    async updateCartItem(req, res) {
        try {
            const { quantity } = req.body;
            const { productId } = req.params;
            
            if (!quantity || quantity < 1) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Неверное количество' 
                });
            }

            CartService.updateQuantity(req, productId, parseInt(quantity));
            
            // Получаем обновленную корзину
            const cart = CartService.getCart(req);
            const item = cart.find(item => item.productId == productId);
            
            if (!item) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Товар не найден в корзине' 
                });
            }

            res.json({ 
                success: true,
                quantity: item.quantity,
                message: 'Количество обновлено'
            });
        } catch (error) {
            console.error('Update cart error:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    }

    async removeFromCart(req, res) {
        try {
            const { productId } = req.params;
            CartService.removeFromCart(req, productId);
            
            res.json({ 
                success: true,
                message: 'Товар удален из корзины'
            });
        } catch (error) {
            console.error('Remove from cart error:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    }

    async getCartCount(req, res) {
        try {
            const count = CartService.getCartCount(req);
            res.json({ success: true, count });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

export default new CartController();