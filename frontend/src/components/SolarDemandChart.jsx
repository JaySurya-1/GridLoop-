import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SolarDemandChart({ schedule = [] }) {
  if (!schedule || schedule.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        No hourly data available.
      </div>
    );
  }

  const data = {
    labels: schedule.map((item) => item.hour),

    datasets: [
      {
        label: "Solar Generation (kW)",
        data: schedule.map((item) => item.solar_generation_kw ?? 0),
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245,158,11,0.2)",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false,
      },

      {
        label: "Building Demand (kW)",
        data: schedule.map((item) => item.building_demand_kw ?? 0),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Solar Generation vs Building Demand",
        font: {
          size: 18,
          weight: "bold",
        },
      },

      tooltip: {
        enabled: true,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of Day",
        },
      },

      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Power (kW)",
        },
      },
    },
  };

  return (
    <div
      style={{
        height: "420px",
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default SolarDemandChart;