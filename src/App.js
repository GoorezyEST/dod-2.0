import React, { useState } from "react";
import "./App.css";
import { BiSearchAlt } from "react-icons/bi";

function App() {
  const API_KEY = "14a63d07773ee5bf37ef4709622929f1";

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
                  <h1 className="city_info">
                    Temperatura&nbsp;
                    <span>{Math.trunc(data.main.temp)}°C</span>
                  </h1>
                  <h1 className="city_info">
                    Humedad&nbsp;<span>{Math.trunc(data.main.humidity)} %</span>
                  </h1>
                  <h1 className="city_info">
                    Viento&nbsp;
                    <span>{Math.trunc(data.wind.speed * 3.6)} KM/H</span>
                  </h1>
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
              <span>
                Ingrese una ciudad valida
                <br />
                en el buscador.
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
