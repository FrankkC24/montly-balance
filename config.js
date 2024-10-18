export const config = {
    ui: {
      dashboard: {
        title: 'Balance Mensual',
        barChartTitle: 'Distribución de Ingresos y Gastos por Categoría',
        pieChartTitle: 'Distribución de Ingresos por Categoría',
        labels: {
          income: 'Ingresos',
          expenses: 'Gastos',
        },
      },
      form: {
        addTransaction: 'Añadir Transacción',
        amountLabel: 'Monto',
        categoryLabel: 'Categoría',
        dateLabel: 'Fecha',
        submitButton: 'Guardar',
      },
      export: {
        csvSuccess: 'CSV exportado exitosamente a la carpeta /exports',
        pdfSuccess: 'PDF generado exitosamente',
        exportCsvButton: 'Exportar a CSV',
        exportPdfButton: 'Exportar a PDF',
      },
    },

    notifications: {
      paymentReminderTitle: 'Recordatorio de Pago',
      paymentReminderBody: 'Tienes un pago pendiente para este mes.',
    },

    charts: {
      barColors: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
      pieColors: [
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 205, 86, 0.7)',
      ],
    },
  };
  