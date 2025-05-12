document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const productId = this.dataset.id;
            const button = this;
            
            button.disabled = true;
            button.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
            
            try {
                const response = await fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'CSRF-Token': document.querySelector('[name="_csrf"]')?.value
                    },
                    body: JSON.stringify({ productId })
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.error || 'Ошибка сервера');
                }
                
                updateCartCount(result.cart);
                showToast('Товар добавлен в корзину!');
            } catch (error) {
                console.error('Error:', error);
                showToast(error.message || 'Не удалось добавить товар', 'error');
            } finally {
                button.disabled = false;
                button.innerHTML = 'В корзину';
            }
        });
    });

    function updateCartCount(cart) {
        const countElement = document.querySelector('.cart-count');
        if (countElement) {
            const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'block' : 'none';
        }
    }

    function showToast(message, type = 'success') {
        alert(message);
    }
});