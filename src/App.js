import React, { useState } from "react";
import "./App.css";
import { BiSearchAlt } from "react-icons/bi";
import { WiHumidity, WiThermometer, WiWindy } from "react-icons/wi";

function App() {
  const API_KEY = "8e662ccf2d270d1e801dde706b54c990";

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchCity = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=es`
    );
    const data = await response.json();
    setData(data);
  };

  return (
    <div className="content">
      <div className="main">
        <div className="top">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                searchCity(location);
              }
            }}
            placeholder="Buscar"
            type="text"
          />
          <BiSearchAlt
            className="searchIcon"
            onClickCapture={(event) => {
              event.preventDefault();
              searchCity(location);
            }}
          />
        </div>
        {data.main ? (
          <div className="weather">
            <div className="weather__content">
              {data.main ? <h1 className="city_name">{data.name}</h1> : null}

              {data.main ? (
                <div className="city_data">
                  <div className="city_container">
                    <WiThermometer className="weatherIcon iconTemp" />
                    <h1 className="city_info">
                      {Math.trunc(data.main.temp)}
                      <sup>°C</sup>
                    </h1>
                  </div>
                  <hr className="lineW" />
                  <div className="city_container">
                    <WiHumidity className="weatherIcon" />
                    <h1 className="city_info hum">
                      {Math.trunc(data.main.humidity)}
                      <sup>%</sup>
                    </h1>
                  </div>
                  <hr className="lineW" />
                  <div className="city_container">
                    <WiWindy className="weatherIcon" />
                    <h1 className="city_info vien">
                      {Math.trunc(data.wind.speed * 3.6)}
                      <sup>k</sup>
                    </h1>
                  </div>
                </div>
              ) : null}
              {data.main ? (
                <img
                  className="icon"
                  alt="Icon that represents weather state"
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="welcome">
            <div className="welcome__content">
              <h1>DOD</h1>
              <hr className="line" />
              <span>
                Ingrese el nombre de una ciudad en el buscador para ver los
                datos del dia.
              </span>
            </div>
          </div>
        )}
        <div className="bot">
          <p>
            DOD - Data of Day
            <br />
            Developed by Goorezy
          </p>
          <p>
            Images from Unsplash
            <br />
            Build using OpenWeather API
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
