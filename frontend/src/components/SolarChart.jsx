import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SolarChart({ data }) {

  const chartData = {
    labels: data.map(item => item.hour),

    datasets: [
      {
        label: "Solar Generation (kW)",
        data: data.map(item => item.solar_generation_kw),
        borderColor: "#FFD54F",
        backgroundColor: "#FFD54F",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="chart-card">
      <h2>Solar Generation</h2>

      <Line data={chartData}/>
    </div>
  );
}

export default SolarChart;