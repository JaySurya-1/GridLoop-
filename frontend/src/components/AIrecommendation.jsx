function AIrecommendation({ baseline, summary }) {
  const savings =
    baseline.total_cost - summary.total_electricity_cost;

  const gridReduction =
    (
      ((baseline.total_grid_import -
        summary.total_grid_import_kwh) /
        baseline.total_grid_import) *
      100
    ).toFixed(2);

  let recommendation = "";

  if (gridReduction > 30) {
    recommendation =
      "Excellent optimization! The battery is effectively reducing expensive grid usage.";
  } else if (gridReduction > 15) {
    recommendation =
      "Good optimization. Increasing battery capacity could improve savings further.";
  } else {
    recommendation =
      "Limited optimization due to low solar generation. Consider adding more PV panels or increasing battery storage.";
  }

  return (
    <div
      className="card"
      style={{
        marginTop: "25px",
        padding: "25px",
        width: "100%",
      }}
    >
      <h2>🤖 AI Recommendation</h2>

      <p>
        <strong>Daily Savings:</strong> ₹{savings.toFixed(2)}
      </p>

      <p>
        <strong>Grid Reduction:</strong> {gridReduction}%
      </p>

      <p>
        <strong>Recommendation:</strong>
      </p>

      <p>{recommendation}</p>
    </div>
  );
}

export default AIrecommendation;