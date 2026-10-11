import { useState } from "react";

function HourlyTable({ data }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((row) =>
    row.hour.toString().includes(search)
  );

  const exportCSV = () => {
    const headers = [
      "Hour",
      "Solar",
      "Demand",
      "Battery",
      "Charge",
      "Discharge",
      "Grid",
      "Export",
      "Price",
      "Cost",
    ];

    const rows = filtered.map((r) => [
      r.hour,
      r.solar_generation_kw,
      r.building_demand_kw,
      r.battery_energy_kwh,
      r.battery_charge_kw,
      r.battery_discharge_kw,
      r.grid_import_kw,
      r.grid_export_kw,
      r.electricity_price_per_kwh,
      r.hourly_cost,
    ]);

    const csv =
      [headers, ...rows]
        .map((e) => e.join(","))
        .join("\n");

    const blob = new Blob([csv]);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "GridLoop_Hourly_Report.csv";

    a.click();
  };

  const zeroGrid = data.filter(
    (d) => d.grid_import_kw === 0
  ).length;

  const peakHours = data.filter(
    (d) => d.hourly_cost > 0
  ).length;

  const totalCost = data.reduce(
    (a, b) => a + b.hourly_cost,
    0
  );

  return (
    <div className="table-card">

      <div className="table-top">

        <h2>📅 Hourly Energy Schedule</h2>

        <button
          className="export-btn"
          onClick={exportCSV}
        >
          Export CSV
        </button>

      </div>

      <div className="summary-strip">

        <div className="mini-card">
          <h4>Zero Grid Hours</h4>
          <h2>{zeroGrid}</h2>
        </div>

        <div className="mini-card">
          <h4>Peak Hours</h4>
          <h2>{peakHours}</h2>
        </div>

        <div className="mini-card">
          <h4>Total Cost</h4>
          <h2>₹{totalCost.toFixed(2)}</h2>
        </div>

      </div>

      <input
        className="search-box"
        placeholder="Search Hour..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="table-container">

        <table className="energy-table">

          <thead>

            <tr>

              <th>Hour</th>

              <th>Solar</th>

              <th>Demand</th>

              <th>Battery</th>

              <th>Charge</th>

              <th>Discharge</th>

              <th>Grid</th>

              <th>Export</th>

              <th>Price</th>

              <th>Cost</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((row) => (

              <tr key={row.hour}>

                <td>{row.hour}:00</td>

                <td>{row.solar_generation_kw} kW</td>

                <td>{row.building_demand_kw} kW</td>

                <td>{row.battery_energy_kwh} kWh</td>

                <td>{row.battery_charge_kw} kW</td>

                <td>{row.battery_discharge_kw} kW</td>

                <td>

                  <span
                    className={
                      row.grid_import_kw === 0
                        ? "badge-green"
                        : row.grid_import_kw < 3
                        ? "badge-yellow"
                        : "badge-red"
                    }
                  >
                    {row.grid_import_kw} kW
                  </span>

                </td>

                <td>{row.grid_export_kw}</td>

                <td>
                  ₹
                  {row.electricity_price_per_kwh}
                </td>

                <td>
                  ₹{row.hourly_cost}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default HourlyTable;