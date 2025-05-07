class CartService {
  static initCart(req) {
    if (!req.session.cart) {
      req.session.cart = { items: [] }; // Изменено на объект с массивом items
    }
    return req.session.cart;
  }

  static addToCart(req, productId, name, price, quantity = 1) {
    const cart = this.initCart(req);
    const existingItem = cart.items.find(item => item.productId == productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity)
      });
    }
    
    // Сохраняем изменения в сессии
    req.session.save();
  }

  static getCart(req) {
    return this.initCart(req).items;
  }

  static getCartCount(req) {
    return this.getCart(req).reduce((sum, item) => sum + item.quantity, 0);
  }


  static clearCart(req) {
      req.session.cart = [];
  }
}

export default CartService;