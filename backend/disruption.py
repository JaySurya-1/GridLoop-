from simulation import generate_data

def apply_disruption():

    solar, demand, tariff = generate_data()

    for i in range(12,24):
        solar[i] = int(solar[i] * 0.6)

    return solar