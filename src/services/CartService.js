class CartService {
  static initCart(session) {
      if (!session.cart) {
          session.cart = { items: [] };
      }
      if (!Array.isArray(session.cart.items)) {
          session.cart.items = [];
      }
      return session.cart;
  }

  static addToCart(session, productId, name, price, quantity = 1) {
      const cart = this.initCart(session);
      const existingItem = cart.items.find(item => item.productId == productId);
      
      if (existingItem) {
          existingItem.quantity += Number(quantity) || 1;
      } else {
          cart.items.push({
              productId,
              name: String(name),
              price: Math.max(0, Number(price) || 0),
              quantity: Math.max(1, Number(quantity) || 1)
          });
      }
      return cart;
  }

  static getCartCount(session) {
      const cart = this.initCart(session);
      return cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }

  static removeFromCart(session, productId) {
      const cart = this.initCart(session);
      cart.items = cart.items.filter(item => item.productId != productId);
      return cart;
  }

  static calculateTotal(cart) {
      if (!cart?.items) return 0;
      return cart.items.reduce((total, item) => {
          return total + (item.price * item.quantity);
      }, 0);
  }
}

export default CartService;