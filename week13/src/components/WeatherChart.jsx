import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function WeatherChart({ forecastData }) {

  const labels = forecastData.map(item => item.dt_txt);
  const temperatures = forecastData.map(item => item.main.temp);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="mt-5">
      <h3>5-Day Temperature Forecast</h3>
      <Line data={data} />
    </div>
  );
}

export default WeatherChart;
