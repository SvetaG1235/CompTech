document.addEventListener('DOMContentLoaded', () => {
    const orderForms = document.querySelectorAll('.order-form');
    
    orderForms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const response = await fetch('/orders', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          window.location.href = '/orders?success=true';
        } else {
          alert('Ошибка при оформлении заказа');
        }
      });
    });
  });