import { useEffect, useState } from "react";
import axios from "axios";
import CountUpModule from "react-countup";

const CountUp = CountUpModule.default ?? CountUpModule;

import "./App.css";

import WeatherSelector from "./components/WeatherSelector";
import ComparisonChart from "./components/ComparisonChart";
import SolarDemandChart from "./components/SolarDemandChart";
import SolarChart from "./components/SolarChart";
import BatteryChart from "./components/BatteryChart";
import GridChart from "./components/GridChart";
import HourlyTable from "./components/HourlyTable";
import AIrecommendation from "./components/AIrecommendation";

function App() {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState("Sunny");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/optimize?weather=${weather}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, [weather]);

  if (!data) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        ⚡ Loading GRIDLOOP AI...
      </div>
    );
  }

  const baseline = data.baseline;
  const optimized = data.optimized;
  const summary = optimized.summary;

  const savings =
    baseline.total_cost - summary.total_electricity_cost;

  const gridReduction =
    baseline.total_grid_import > 0
      ? (
          ((baseline.total_grid_import -
            summary.total_grid_import_kwh) /
            baseline.total_grid_import) *
          100
        ).toFixed(2)
      : "0.00";

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="header">
        <h1>⚡ GRIDLOOP AI</h1>

        <p className="subtitle">
          Smart Energy Management Dashboard
        </p>

        <WeatherSelector onWeatherChange={setWeather} />

        <h3 className="weather">
          🌤 Current Weather : {weather}
        </h3>
      </div>

      {/* KPI */}

      <div className="cards">

        <div className="card">
          <h3>💰 Baseline Cost</h3>
          <h1>
            ₹{" "}
            <CountUp
              end={baseline.total_cost}
              duration={2}
              decimals={2}
            />
          </h1>
        </div>

        <div className="card">
          <h3>⚡ Optimized Cost</h3>
          <h1>
            ₹{" "}
            <CountUp
              end={summary.total_electricity_cost}
              duration={2}
              decimals={2}
            />
          </h1>
        </div>

        <div className="card savings">
          <h3>📈 Savings</h3>
          <h1 style={{ color: "#16a34a" }}>
            ₹{" "}
            <CountUp
              end={savings}
              duration={2}
              decimals={2}
            />
          </h1>
        </div>

        <div className="card">
          <h3>🔌 Grid Reduction</h3>

          <div className="progress">
            <div
              className="progress-fill blue"
              style={{
                width: `${gridReduction}%`,
              }}
            />
          </div>

          <h2>
            <CountUp
              end={Number(gridReduction)}
              duration={2}
              decimals={2}
            />
            %
          </h2>
        </div>

        <div className="card">
          <h3>☀ Solar Utilization</h3>

          <div className="progress">
            <div
              className="progress-fill yellow"
              style={{
                width: `${summary.solar_utilization_percent}%`,
              }}
            />
          </div>

          <h2>
            <CountUp
              end={summary.solar_utilization_percent}
              duration={2}
              decimals={2}
            />
            %
          </h2>
        </div>

      </div>

      {/* AI Recommendation */}

      <AIrecommendation
        baseline={baseline}
        summary={summary}
      />

      {/* Comparison */}

      <h2 className="section-title">
        📊 Baseline vs Optimized Performance
      </h2>

      <ComparisonChart
        baseline={baseline}
        optimized={optimized}
      />

      {/* Solar vs Demand */}

      <h2 className="section-title">
        ☀ Solar Generation vs Demand
      </h2>

      <div className="chart-card">
        <SolarDemandChart
          schedule={optimized.hourly_schedule}
        />
      </div>

      {/* Battery */}

      <h2 className="section-title">
        🔋 Battery Performance
      </h2>

      <div className="charts">
        <SolarChart data={optimized.hourly_schedule} />
        <BatteryChart data={optimized.hourly_schedule} />
      </div>

      {/* Grid */}

      <h2 className="section-title">
        ⚡ Grid Import Analysis
      </h2>

      <GridChart data={optimized.hourly_schedule} />

      {/* Table */}

      <h2 className="section-title">
        📅 Hourly Energy Schedule
      </h2>

      <HourlyTable
        data={optimized.hourly_schedule}
      />

      <footer
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "#777",
          padding: "20px",
        }}
      >
        ⚡ Powered by <b>GRIDLOOP AI</b> | Smart Energy Optimization
      </footer>

    </div>
  );
}

export default App;