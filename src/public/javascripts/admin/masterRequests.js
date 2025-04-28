document.addEventListener('DOMContentLoaded', () => {
    loadRequests();
    setupEventListeners();
  });
  
  async function loadRequests() {
    try {
      const response = await fetch('/admin/api/master-requests');
      const requests = await response.json();
      renderRequestsTable(requests);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    }
  }
  
  function renderRequestsTable(requests) {
    const tableBody = document.querySelector('#requestsTable tbody');
    tableBody.innerHTML = requests.map(request => `
      <tr>
        <td><input type="checkbox" class="request-check" data-id="${request.id}"></td>
        <td>${request.id}</td>
        <td>${request.User?.name || 'N/A'}<br>${request.User?.phone || ''}</td>
        <td>${request.address}</td>
        <td>${request.problem}</td>
        <td><span class="status-badge status-${request.status}">${getStatusText(request.status)}</span></td>
        <td>${request.AssignedMaster?.name || 'Не назначен'}</td>
        <td>
          <select class="status-select" data-id="${request.id}">
            <option value="new" ${request.status === 'new' ? 'selected' : ''}>Новая</option>
            <option value="assigned" ${request.status === 'assigned' ? 'selected' : ''}>Назначена</option>
            <option value="completed" ${request.status === 'completed' ? 'selected' : ''}>Завершена</option>
          </select>
        </td>
      </tr>
    `).join('');
  }
  
  function setupEventListeners() {
    document.addEventListener('change', async (e) => {
      if (e.target.classList.contains('status-select')) {
        await updateRequestStatus(
          e.target.dataset.id, 
          e.target.value
        );
      }
    });
  }
  
  async function updateRequestStatus(id, status) {
    try {
      await fetch(`/admin/master-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadRequests(); 
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
    }
  }