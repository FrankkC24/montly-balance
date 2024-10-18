import * as yup from 'yup';
import { config } from '../../config.js';
import { addTransaction } from '../main/db.js'; // Nueva importación para agregar transacción

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transactionForm');
  const successMessage = document.getElementById('successMessage');

  // Asignar textos desde config.js
  document.getElementById('addTransactionTitle').textContent = config.ui.form.addTransaction;
  document.getElementById('amountLabel').textContent = config.ui.form.amountLabel;
  document.getElementById('categoryLabel').textContent = config.ui.form.categoryLabel;
  document.getElementById('dateLabel').textContent = config.ui.form.dateLabel;
  document.getElementById('submitButton').textContent = config.ui.form.submitButton;

  // Esquema de validación con Yup
  const transactionSchema = yup.object().shape({
    amount: yup.number().positive().required(),
    category: yup.string().oneOf(['hogar', 'transporte', 'entretenimiento']).required(),
    date: yup.date().required(),
  });

  // Manejar el evento de envío del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      amount: parseFloat(form.amount.value),
      category: form.category.value,
      date: form.date.value,
    };

    try {
      // Validar los datos
      await transactionSchema.validate(formData);

      // Enviar los datos a la base de datos (ahora con SQLite)
      await addTransaction(formData);

      // Mostrar mensaje de éxito desde config.js
      successMessage.textContent = config.ui.form.submitButton + ' exitoso!';
      successMessage.style.display = 'block';

      // Resetear el formulario
      form.reset();

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    } catch (error) {
      alert('Error en el formulario: ' + error.message);
    }
  });
});