import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function GridChart({ data }) {
  const chartData = {
    labels: data.map(item => item.hour),
    datasets: [
      {
        label: "Grid Import (kW)",
        data: data.map(item => item.grid_import_kw),
        borderColor: "#1976D2",
        backgroundColor: "#1976D2",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-card">
      <h2>Grid Import</h2>
      <Line data={chartData} />
    </div>
  );
}

export default GridChart;