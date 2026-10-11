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

function BatteryChart({ data }) {

  const chartData = {
    labels: data.map(item => item.hour),

    datasets: [
      {
        label: "Battery Energy (kWh)",
        data: data.map(item => item.battery_energy_kwh),
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="chart-card">
      <h2>Battery Energy</h2>

      <Line data={chartData}/>
    </div>
  );
}

export default BatteryChart;