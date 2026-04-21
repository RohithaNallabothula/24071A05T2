import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import CurrentWeatherCard from './CurrentWeatherCard';
import WeatherChart from './WeatherChart';
import { getCurrentWeather, getForecastWeather } from '../services/weatherService';

function WeatherPage() {
  const [city, setCity] = useState("Hyderabad");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  const fetchData = async () => {
    try {
      setError(null);
      const current = await getCurrentWeather(city);
      const forecast = await getForecastWeather(city);

      setCurrentWeather(current);
      setForecastData(Array.isArray(forecast.list) ? forecast.list : []);
    } catch (err) {
      setCurrentWeather(null);
      setForecastData([]);
      setError(err?.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {currentWeather && <CurrentWeatherCard data={currentWeather} />}

      {forecastData.length > 0 && (
        <WeatherChart forecastData={forecastData} />
      )}

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default WeatherPage;
