import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyBarGraph = ({ weeklyData }) => {
  const data = {
    labels: weeklyData.map((item) => item.week),
    datasets: [
      {
        label: 'Weekly Data',
        data: weeklyData.map((item) => item.value),
        backgroundColor: 'rgba(50, 50, 50)',
        borderColor: 'rgba(30, 30, 30)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default WeeklyBarGraph;
