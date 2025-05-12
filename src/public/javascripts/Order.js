document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
      orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = orderForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        
        try {
          // Получаем cartItems из sessionStorage или другого источника
          const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
          
          const formData = {
            name: orderForm.querySelector('[name="name"]').value,
            phone: orderForm.querySelector('[name="phone"]').value,
            address: orderForm.querySelector('[name="address"]').value,
            cartItems: cartItems
          };
          
          const response = await fetch('/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          
          if (response.ok) {
            const result = await response.json();
            window.location.href = `/orders/${result.orderId}`;
          } else {
            const error = await response.json();
            throw new Error(error.message || 'Ошибка оформления заказа');
          }
        } catch (error) {
          alert(error.message);
          console.error('Order error:', error);
        } finally {
          submitButton.disabled = false;
        }
      });
    }
  });