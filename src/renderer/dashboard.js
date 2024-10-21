import { config } from '../../config.js';

// Asegúrate de que Chart esté disponible de forma global
document.addEventListener('DOMContentLoaded', () => {
  const ctxBar = document.getElementById('barChart').getContext('2d');
  const ctxPie = document.getElementById('pieChart').getContext('2d');

  const labels = ['Hogar', 'Transporte', 'Entretenimiento'];
  const data = {
    incomes: [200, 150, 300],
    expenses: [180, 130, 220],
  };

  generateBarChart(ctxBar, data, labels);
  generatePieChart(ctxPie, data.incomes, labels);
});

const generateBarChart = (ctx, data, labels) => {
  new Chart(ctx, {  // Ahora Chart está disponible globalmente
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: config.ui.dashboard.labels.income,
          data: data.incomes,
          backgroundColor: config.charts.barColors[0],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: config.ui.dashboard.labels.expenses,
          data: data.expenses,
          backgroundColor: config.charts.barColors[1],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: config.ui.dashboard.barChartTitle,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Monto ($)',
          },
          beginAtZero: true,
        },
      },
    },
  });
};

const generatePieChart = (ctx, data, labels) => {
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: config.charts.pieColors,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });
};
