function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  }
  
  function getStatusText(status) {
    const statuses = {
      new: 'Новая',
      assigned: 'Назначена',
      completed: 'Завершена',
      pending: 'Ожидает',
      processed: 'В работе'
    };
    return statuses[status] || status;
  }
  
  function initModals() {
    document.querySelectorAll('[data-toggle="modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.target;
        document.querySelector(modalId).style.display = 'block';
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