function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function getStatusText(status) {
  const statuses = {
    new: 'Новая',
    assigned: 'Назначена',
    completed: 'Завершена',
    pending: 'Ожидает',
    processed: 'В работе',
    shipped: 'Отправлен',
    delivered: 'Доставлен'
  };
  return statuses[status] || status;
}

function initModals() {
  document.querySelectorAll('[data-toggle="modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-target');
      const modal = document.getElementById(modalId.substring(1));
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });

  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initModals();
});