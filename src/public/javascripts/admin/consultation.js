document.addEventListener('DOMContentLoaded', () => {
  loadConsultations();
  setupEventListeners();
});

async function loadConsultations() {
  try {
    const response = await fetch('/admin/api/consultations');
    const consultations = await response.json();
    renderConsultationsTable(consultations);
  } catch (error) {
    console.error('Ошибка загрузки консультаций:', error);
  }
}

function renderConsultationsTable(consultations) {
  const tableBody = document.querySelector('#consultationsTable tbody');
  tableBody.innerHTML = consultations.map(consultation => `
    <tr>
      <td>${consultation.id}</td>
      <td>${consultation.User?.name || 'N/A'}<br>${consultation.User?.phone || ''}</td>
      <td class="question-cell">${consultation.question.substring(0, 50)}...</td>
      <td><span class="status-badge status-${consultation.status}">${getStatusText(consultation.status)}</span></td>
      <td>
        <select class="status-select" data-id="${consultation.id}">
          <option value="new" ${consultation.status === 'new' ? 'selected' : ''}>Новая</option>
          <option value="processed" ${consultation.status === 'processed' ? 'selected' : ''}>В работе</option>
          <option value="completed" ${consultation.status === 'completed' ? 'selected' : ''}>Завершена</option>
        </select>
      </td>
      <td>
        <button class="btn-view" data-id="${consultation.id}">Просмотр</button>
      </td>
    </tr>
  `).join('');
}

function setupEventListeners() {
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-view')) {
      const consultationId = e.target.dataset.id;
      await showConsultationDetails(consultationId);
    }
  });
}

async function showConsultationDetails(id) {
  try {
    const response = await fetch(`/admin/api/consultations/${id}`);
    const data = await response.json();
    
    document.getElementById('modalQuestion').textContent = data.question;
    document.getElementById('modalComment').value = data.adminComment || '';
    document.getElementById('consultationModal').style.display = 'block';
  } catch (error) {
    console.error('Ошибка загрузки консультации:', error);
  }
}