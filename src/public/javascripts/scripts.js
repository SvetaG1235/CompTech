
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a:not([data-no-ajax])').forEach(link => {
        link.addEventListener('click', function(e) {
    
            if (this.hasAttribute('data-no-ajax')) return;
            
            e.preventDefault();
            const href = this.getAttribute('href');
            loadPage(href);
            history.pushState({}, '', href);
            updateActiveLink(href);
        });
    });

    window.addEventListener('popstate', function() {
        loadPage(window.location.pathname);
        updateActiveLink(window.location.pathname);
    });
    if (window.location.pathname !== '/') {
        loadPage(window.location.pathname);
        updateActiveLink(window.location.pathname);
    }

   
    document.addEventListener('submit', function(e) {
        const form = e.target;
        

        if (form.matches('form[data-ajax]')) {
            e.preventDefault();
            handleFormSubmit(form);
        }
        
    
    });
});

async function loadPage(url) {
    try {
        const response = await fetch(url, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
        document.title = doc.title;
        
    } catch (error) {
        console.error('Error loading page:', error);

        window.location.href = url;
    }
}

function updateActiveLink(url) {
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === url) {
            a.classList.add('active');
        }
    });
}

async function handleFormSubmit(form) {
    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Ошибка сервера');
        
        const result = await response.json();
        
    
        if (result.success) {
            showNotification('Форма отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            form.reset();
        } else {
            showNotification(result.message || 'Ошибка отправки', 'error');
        }
        
    } catch (error) {
        console.error('Form submit error:', error);
        showNotification('Произошла ошибка при отправке', 'error');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}