document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    setInterval(loadStats, 30000);
  });
  
  async function loadStats() {
    try {
      const response = await fetch('/admin/api/stats');
      const stats = await response.json();
      
      document.getElementById('productsCount').textContent = stats.productsCount;
      document.getElementById('ordersCount').textContent = stats.ordersCount;
      document.getElementById('consultationsCount').textContent = stats.consultationsCount;
    
      updateSimpleBar('productsBar', stats.productsCount, 100);
      updateSimpleBar('ordersBar', stats.ordersCount, 50);
      updateSimpleBar('consultationsBar', stats.consultationsCount, 30);
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  }
  
  function updateSimpleBar(elementId, value, max) {
    const element = document.getElementById(elementId);
    if (element) {
      const percent = Math.min(100, (value / max) * 100);
      element.style.width = `${percent}%`;
      element.textContent = `${value}`;
    }
  }