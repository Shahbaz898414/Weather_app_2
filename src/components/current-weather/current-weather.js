import React, {useState} from "react";

import "./current-weather.css";

const CurrentWeather = ({data}) => {

  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const temperatureUnit = isCelsius ? "°C" : "°F";
  const temperatureValue = isCelsius
    ? Math.round(data.main.temp)
    : Math.round((data.main.temp * 9) / 5 + 32);

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">
          {temperatureValue}
          {temperatureUnit}
        </p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
               {temperatureValue}
              {temperatureUnit}
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
        

        

      </div>

      <button onClick={toggleTemperatureUnit} className="button">
      {isCelsius ? "Change to Fahrenheit" : "Change to Celsius"}
        </button>
    </div>
  );
};


export default CurrentWeather;
