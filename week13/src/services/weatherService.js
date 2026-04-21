const API_KEY = "c6705827d574311e59ec976ddceb8b93";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const parseResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Weather API request failed');
  }
  return data;
};

export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return parseResponse(response);
};

export const getForecastWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return parseResponse(response);
};
