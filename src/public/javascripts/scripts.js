// Обработка навигации без перезагрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для всех ссылок в навигации
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            loadPage(href);
            history.pushState({}, '', href);
            updateActiveLink(href);
        });
    });

    // Обработчик для кнопки "Назад"
    window.addEventListener('popstate', function() {
        loadPage(window.location.pathname);
        updateActiveLink(window.location.pathname);
    });

    // Загрузка начальной страницы
    if (window.location.pathname !== '/') {
        loadPage(window.location.pathname);
        updateActiveLink(window.location.pathname);
    }

    // Обработка форм
    document.addEventListener('submit', function(e) {
        if (e.target.matches('form')) {
            e.preventDefault();
            handleFormSubmit(e.target);
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

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Здесь можно добавить AJAX-отправку формы
    console.log('Form submitted:', data);
    
    // Временное уведомление
    alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
    form.reset();
}