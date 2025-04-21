class CartService {
    static addToCart(req, productId, quantity = 1) {
      if (!req.session.cart) {
        req.session.cart = [];
      }
      
      const existingItem = req.session.cart.find(item => item.productId == productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        req.session.cart.push({ productId, quantity });
      }
    }
  
    static removeFromCart(req, productId) {
      if (!req.session.cart) return;
      
      req.session.cart = req.session.cart.filter(item => item.productId != productId);
    }
  
    static getCart(req) {
      return req.session.cart || [];
    }
  
    static clearCart(req) {
      req.session.cart = [];
    }
  }
  
  export default CartService;