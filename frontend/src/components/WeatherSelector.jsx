import { useState } from "react";

function WeatherSelector({ onWeatherChange }) {
  const [weather, setWeather] = useState("Sunny");

  const handleChange = (e) => {
    const value = e.target.value;
    setWeather(value);
    onWeatherChange(value);
  };

  return (
    <div className="weather-card">
      <h2>🌤 Weather</h2>

      <select value={weather} onChange={handleChange}>
        <option>Sunny</option>
        <option>Cloudy</option>
        <option>Rainy</option>
      </select>
    </div>
  );
}

export default WeatherSelector;