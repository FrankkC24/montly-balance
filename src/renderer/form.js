import { config } from '../../config.js';
import { addTransaction } from '../main/db.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transactionForm');
  const successMessage = document.getElementById('successMessage');

  document.getElementById('addTransactionTitle').textContent = config.ui.form.addTransaction;
  document.getElementById('amountLabel').textContent = config.ui.form.amountLabel;
  document.getElementById('categoryLabel').textContent = config.ui.form.categoryLabel;
  document.getElementById('dateLabel').textContent = config.ui.form.dateLabel;
  document.getElementById('submitButton').textContent = config.ui.form.submitButton;

  const transactionSchema = yup.object().shape({
    amount: yup.number().positive().required(),
    category: yup.string().oneOf(['hogar', 'transporte', 'entretenimiento']).required(),
    date: yup.date().required(),
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      amount: parseFloat(form.amount.value),
      category: form.category.value,
      date: new Date(form.date.value),
    };

    try {
      await transactionSchema.validate(formData);

      await addTransaction(formData);

      successMessage.textContent = config.ui.form.submitButton + ' exitoso!';
      successMessage.style.display = 'block';

      form.reset();

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    } catch (error) {
      alert('Error en el formulario: ' + error.message);
    }
  });
});
