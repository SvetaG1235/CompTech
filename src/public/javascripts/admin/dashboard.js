document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  
  setInterval(loadStats, 30000);
  
  initStatsBars();
});

async function loadStats() {
  try {
    const response = await fetch('/admin/api/stats');
    if (!response.ok) throw new Error('Ошибка загрузки');
    
    const stats = await response.json();
    updateStatsUI(stats);
  } catch (error) {
    console.error('Ошибка:', error);
    showError('Не удалось загрузить статистику');
  }
}

function updateStatsUI(stats) {
  document.getElementById('productsCount').textContent = stats.productsCount;
  document.getElementById('consultationsCount').textContent = stats.consultationsCount;
  document.getElementById('masterRequestsCount').textContent = stats.masterRequestsCount;
  
  const productsList = document.getElementById('recentProducts');
  if (productsList) {
    productsList.innerHTML = stats.recentProducts.map(product => `
      <li>${product.name} - ${product.price} ₽</li>
    `).join('');
  }
}

function initStatsBars() {
  const bars = {
    products: document.getElementById('productsBar'),
    consultations: document.getElementById('consultationsBar'),
    masterRequests: document.getElementById('masterRequestsBar')
  };
  
  Object.values(bars).forEach(bar => {
    if (bar) {
      bar.style.height = '20px';
      bar.style.backgroundColor = '#e0e0e0';
      bar.style.borderRadius = '4px';
      bar.style.overflow = 'hidden';
      bar.style.position = 'relative';
      
      const fill = document.createElement('div');
      fill.style.position = 'absolute';
      fill.style.top = '0';
      fill.style.left = '0';
      fill.style.height = '100%';
      fill.style.backgroundColor = '#4e73df';
      fill.style.width = '0';
      fill.style.transition = 'width 0.5s ease';
      bar.appendChild(fill);
    }
  });
}

function showError(message) {
  const errorEl = document.getElementById('statsError');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}