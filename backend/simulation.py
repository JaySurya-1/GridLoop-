def generate_data(weather="Sunny"):
    # Solar generation profile (kW)
    if weather == "Sunny":
        solar = [
            0, 0, 0, 0, 0, 1, 3, 6, 10, 15, 18, 20,
            22, 20, 18, 14, 9, 4, 1, 0, 0, 0, 0, 0
        ]

        demand = [
            5, 5, 5, 5, 5, 6, 7, 8, 9, 9, 10, 11,
            12, 12, 11, 10, 9, 8, 8, 7, 6, 6, 5, 5
        ]

    elif weather == "Cloudy":
        solar = [
            0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10,
            11, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0
        ]

        # Slightly higher demand due to artificial lighting
        demand = [
            5, 5, 5, 5, 6, 7, 8, 9, 10, 10, 11, 12,
            13, 13, 12, 11, 10, 9, 9, 8, 7, 7, 6, 6
        ]

    elif weather == "Rainy":
        solar = [
            0, 0, 0, 0, 0, 0, 0, 0.5, 1, 2, 3, 4,
            5, 4, 3, 2, 1, 0.5, 0, 0, 0, 0, 0, 0
        ]

        # Highest demand due to lighting + HVAC
        demand = [
            6, 6, 6, 6, 7, 8, 9, 10, 11, 11, 12, 13,
            14, 14, 13, 12, 11, 10, 10, 9, 8, 8, 7, 7
        ]

    else:
        # Default to Sunny
        solar = [
            0, 0, 0, 0, 0, 1, 3, 6, 10, 15, 18, 20,
            22, 20, 18, 14, 9, 4, 1, 0, 0, 0, 0, 0
        ]

        demand = [
            5, 5, 5, 5, 5, 6, 7, 8, 9, 9, 10, 11,
            12, 12, 11, 10, 9, 8, 8, 7, 6, 6, 5, 5
        ]

    # Time-of-use electricity tariff (₹/kWh)
    tariff = [
        8, 8, 8, 8, 8, 7, 7, 6, 6, 6, 5, 5,
        5, 5, 6, 7, 8, 9, 10, 10, 9, 8, 8, 8
    ]

    return solar, demand, tariff