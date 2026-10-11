import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ComparisonChart({ baseline, optimized }) {
  const data = {
    labels: ["Electricity Cost (₹)", "Grid Import (kWh)"],
    datasets: [
      {
        label: "Baseline",
        data: [
          baseline.total_cost,
          baseline.total_grid_import,
        ],
        backgroundColor: "#ef4444",
        borderRadius: 8,
      },
      {
        label: "Optimized",
        data: [
          optimized.summary.total_electricity_cost,
          optimized.summary.total_grid_import_kwh,
        ],
        backgroundColor: "#22c55e",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Baseline vs Optimized Performance",
        font: {
          size: 18,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        marginBottom: "30px",
        height: "400px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default ComparisonChart;