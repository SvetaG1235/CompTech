document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.id;
      });
    });
  
    document.querySelectorAll('form[action*="/delete"]').forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!confirm('Вы уверены, что хотите удалить этот товар?')) {
          e.preventDefault();
        }
      });
    });
  });