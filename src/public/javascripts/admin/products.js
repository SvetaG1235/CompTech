document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
  });
  
  async function loadProducts() {
    try {
      const response = await fetch('/admin/api/products');
      const products = await response.json();
      renderProductsTable(products);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    }
  }
  
  function renderProductsTable(products) {
    const tableBody = document.querySelector('#productsTable tbody');
    tableBody.innerHTML = products.map(product => `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.price} ₽</td>
        <td>${product.stock} шт.</td>
        <td>
          <button class="btn-edit" data-id="${product.id}">✏️</button>
          <button class="btn-delete" data-id="${product.id}">🗑️</button>
        </td>
      </tr>
    `).join('');
  }
  
  function setupEventListeners() {
    document.getElementById('addProductForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      try {
        const response = await fetch('/admin/products', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          loadProducts();
          e.target.reset();
        }
      } catch (error) {
        console.error('Ошибка добавления товара:', error);
      }
    });
  
    document.addEventListener('click', async (e) => {
      if (e.target.classList.contains('btn-delete')) {
        if (confirm('Удалить товар?')) {
          await deleteProduct(e.target.dataset.id);
        }
      }
    });
  }
  
  async function deleteProduct(id) {
    try {
      await fetch(`/admin/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (error) {
      console.error('Ошибка удаления товара:', error);
    }
  }