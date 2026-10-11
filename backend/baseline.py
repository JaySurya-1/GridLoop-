from simulation import generate_data


def simulate_baseline(solar, demand, tariff):
    """
    Baseline Strategy

    - Solar is used immediately to satisfy building demand.
    - No battery is used.
    - Remaining demand is imported from the grid.

    This represents a conventional building without energy optimization.
    """

    grid_import = []
    total_grid_import = 0.0
    total_cost = 0.0
    solar_used = 0.0

    hourly_schedule = []

    for hour in range(24):

        # Solar directly supplies demand
        solar_to_load = min(solar[hour], demand[hour])

        # Remaining demand comes from grid
        grid = max(0, demand[hour] - solar_to_load)

        # Cost
        cost = grid * tariff[hour]

        grid_import.append(round(grid, 2))

        total_grid_import += grid
        total_cost += cost
        solar_used += solar_to_load

        hourly_schedule.append(
            {
                "hour": hour,
                "solar_generation_kw": solar[hour],
                "building_demand_kw": demand[hour],
                "solar_used_kw": round(solar_to_load, 2),
                "grid_import_kw": round(grid, 2),
                "battery_energy_kwh": 0,
                "hourly_cost": round(cost, 2),
            }
        )

    total_solar = sum(solar)

    if total_solar > 0:
        solar_utilization = (solar_used / total_solar) * 100
    else:
        solar_utilization = 0

    return {
        "hourly_schedule": hourly_schedule,
        "grid_import": grid_import,
        "total_grid_import": round(total_grid_import, 2),
        "total_cost": round(total_cost, 2),
        "solar_utilization_percent": round(solar_utilization, 2),
        "final_battery_energy_kwh": 0,
    }


def run_baseline(weather="Sunny"):
    solar, demand, tariff = generate_data(weather)

    return simulate_baseline(solar, demand, tariff)


if __name__ == "__main__":

    result = run_baseline("Sunny")

    print("\n===== BASELINE RESULT =====")
    print("Total Grid Import :", result["total_grid_import"], "kWh")
    print("Total Cost        : ₹", result["total_cost"])
    print("Solar Utilization :", result["solar_utilization_percent"], "%")