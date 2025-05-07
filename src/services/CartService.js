class CartService {
  static initCart(req) {
      if (!req.session.cart) {
          req.session.cart = [];
      }
      return req.session.cart;
  }

  static addToCart(req, productId, name, price, quantity = 1) {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existingItem = req.session.cart.find(item => item.productId == productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        req.session.cart.push({
            productId,
            name,
            price,
            quantity
        });
    }
}

  static updateQuantity(req, productId, newQuantity) {
      const cart = this.initCart(req);
      const item = cart.find(item => item.productId == productId);
      
      if (item) {
          item.quantity = newQuantity > 0 ? newQuantity : 1;
      }
  }

  static removeFromCart(req, productId) {
      const cart = this.initCart(req);
      req.session.cart = cart.filter(item => item.productId != productId);
  }

  static getCart(req) {
      return this.initCart(req);
  }

  static getCartCount(req) {
    if (!req.session.cart) return 0;
    return req.session.cart.reduce((sum, item) => sum + item.quantity, 0);
}

  static clearCart(req) {
      req.session.cart = [];
  }
}

export default CartService;