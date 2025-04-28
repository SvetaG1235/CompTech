document.addEventListener('DOMContentLoaded', () => {
    initOrdersTable();
    setupOrderStatusUpdates();
  });
  
  function initOrdersTable() {
    $('#ordersTable').DataTable({
      ajax: '/admin/api/orders',
      columns: [
        { data: 'id' },
        { 
          data: 'User',
          render: (data) => `${data.name}<br>${data.phone}`
        },
        { data: 'total' },
        { 
          data: 'status',
          render: (data) => `<span class="status-badge status-${data}">${getStatusText(data)}</span>`
        },
        {
          data: null,
          render: (data) => `
            <button class="btn-items" data-id="${data.id}">Товары (${data.Products.length})</button>
          `
        },
        {
          data: null,
          render: (data) => `
            <select class="status-select" data-id="${data.id}">
              <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Ожидает</option>
              <option value="processing" ${data.status === 'processing' ? 'selected' : ''}>В обработке</option>
              <option value="shipped" ${data.status === 'shipped' ? 'selected' : ''}>Отправлен</option>
              <option value="delivered" ${data.status === 'delivered' ? 'selected' : ''}>Доставлен</option>
            </select>
          `
        }
      ]
    });
  }