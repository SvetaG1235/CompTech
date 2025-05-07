// Обработчик для кнопок "Добавить в корзину"
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            e.stopPropagation();
            
            const button = e.target;
            const productId = button.dataset.id;
            const productName = button.dataset.name;
            const productPrice = button.dataset.price;
            
            button.disabled = true;
            const originalText = button.textContent;
            button.textContent = 'Добавляем...';
            
            try {
                const response = await fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({
                        productId,
                        name: productName,
                        price: productPrice,
                        quantity: 1
                    })
                });
                
                if (!response.ok) throw new Error('Ошибка сервера');
                
                const result = await response.json();
                
                if (!result.success) throw new Error(result.error || 'Ошибка сервера');
                
                updateCartCounter(result.count);
                showCartNotification('Товар добавлен в корзину');
                
                button.classList.add('btn--in-cart');
                button.textContent = '✓ В корзине';
                
            } catch (error) {
                console.error('Error:', error);
                showCartNotification(error.message || 'Не удалось добавить товар', 'error');
                button.textContent = originalText;
            } finally {
                setTimeout(() => {
                    button.disabled = false;
                }, 2000);
            }
        }
    });
    
    function updateCartCounter(count) {
        const counters = document.querySelectorAll('.cart-counter');
        counters.forEach(counter => {
            counter.textContent = count;
        });
    }
    
    function showCartNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Инициализация счетчика при загрузке
    fetch('/cart/count')
        .then(response => response.json())
        .then(data => updateCartCounter(data.count))
        .catch(console.error);
});