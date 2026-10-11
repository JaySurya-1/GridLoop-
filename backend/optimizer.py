from dataclasses import dataclass
from simulation import generate_data


@dataclass
class BuildingConfig:
    battery_capacity_kwh: float = 20.0
    initial_battery_kwh: float = 10.0
    max_battery_charge_kw: float = 5.0
    max_battery_discharge_kw: float = 5.0
    charge_efficiency: float = 0.95
    discharge_efficiency: float = 0.95


def simulate_energy_schedule(
    solar_generation,
    building_demand,
    electricity_prices,
    config=None,
):

    if config is None:
        config = BuildingConfig()

    battery = config.initial_battery_kwh

    hourly = []

    total_cost = 0
    total_grid_import = 0
    total_grid_export = 0
    total_solar_used = 0

    PEAK_PRICE = 8

    for hour in range(len(solar_generation)):

        solar = solar_generation[hour]
        demand = building_demand[hour]
        price = electricity_prices[hour]

        # -----------------------------
        # Step 1 : Solar serves demand
        # -----------------------------
        solar_to_building = min(solar, demand)

        remaining_demand = demand - solar_to_building
        surplus_solar = solar - solar_to_building

        # -----------------------------
        # Step 2 : Charge battery
        # -----------------------------
        battery_charge = min(
            surplus_solar,
            config.max_battery_charge_kw,
            (config.battery_capacity_kwh - battery)
            / config.charge_efficiency,
        )

        battery += battery_charge * config.charge_efficiency

        surplus_solar -= battery_charge

        # -----------------------------
        # Step 3 : Smart discharge
        # -----------------------------
        battery_discharge = 0

        if price >= PEAK_PRICE:

            battery_discharge = min(
                remaining_demand,
                config.max_battery_discharge_kw,
                battery * config.discharge_efficiency,
            )

            battery -= battery_discharge / config.discharge_efficiency

        # -----------------------------
        # Grid
        # -----------------------------
        grid_import = max(0, remaining_demand - battery_discharge)
        grid_export = surplus_solar

        hourly_cost = grid_import * price

        total_cost += hourly_cost
        total_grid_import += grid_import
        total_grid_export += grid_export
        total_solar_used += solar_to_building + battery_charge

        hourly.append(
            {
                "hour": hour,
                "solar_generation_kw": round(solar, 2),
                "building_demand_kw": round(demand, 2),
                "solar_to_building_kw": round(solar_to_building, 2),
                "battery_charge_kw": round(battery_charge, 2),
                "battery_discharge_kw": round(battery_discharge, 2),
                "battery_energy_kwh": round(battery, 2),
                "grid_import_kw": round(grid_import, 2),
                "grid_export_kw": round(grid_export, 2),
                "electricity_price_per_kwh": price,
                "hourly_cost": round(hourly_cost, 2),
            }
        )

    total_solar = sum(solar_generation)

    utilization = (
        total_solar_used / total_solar * 100
        if total_solar > 0
        else 0
    )

    return {
        "hourly_schedule": hourly,
        "summary": {
            "total_grid_import_kwh": round(total_grid_import, 2),
            "total_grid_export_kwh": round(total_grid_export, 2),
            "total_solar_used_kwh": round(total_solar_used, 2),
            "solar_utilization_percent": round(utilization, 2),
            "total_electricity_cost": round(total_cost, 2),
            "final_battery_energy_kwh": round(battery, 2),
        },
    }


def run_optimizer(weather="Sunny"):

    solar, demand, prices = generate_data(weather)

    config = BuildingConfig(
        battery_capacity_kwh=20,
        initial_battery_kwh=10,
        max_battery_charge_kw=5,
        max_battery_discharge_kw=5,
    )

    return simulate_energy_schedule(
        solar_generation=solar,
        building_demand=demand,
        electricity_prices=prices,
        config=config,
    )