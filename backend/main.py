from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from simulation import generate_data
from baseline import run_baseline
from optimizer import run_optimizer

app = FastAPI(title="GRIDLOOP AI")

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "GRIDLOOP AI Running"}


# Simulation Data
@app.get("/simulate")
def simulate(weather: str = Query("Sunny")):
    solar, demand, tariff = generate_data(weather)

    return {
        "weather": weather,
        "solar": solar,
        "demand": demand,
        "tariff": tariff,
    }


# Baseline Simulation
@app.get("/baseline")
def baseline(weather: str = Query("Sunny")):
    return run_baseline(weather)


# Optimized Simulation
@app.get("/optimize")
def optimize(weather: str = Query("Sunny")):

    baseline = run_baseline(weather)
    optimized = run_optimizer(weather)

    return {
        "baseline": baseline,
        "optimized": optimized,
    }