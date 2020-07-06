import React, { useState, useEffect } from "react";
// import Skycons from "../../skycons";
import ReactAnimatedWeather from "react-animated-weather";

import axios from "axios";
function SearchResult({ latitude, longitude, name }) {
  //var skycons = new Skycons({ color: "white" });
  const defaults = {
    icon: "SNOW",
    color: "black",
    size: 100,
    animate: true,
  };
  const api = `e719b62385ce15fed830faf549432a2f`;
  const tempLat = "37.8267";
  const tempLong = "-122.4233";
  // const [coordinates, setCoordinates] = useState({
  //   lat: latitude,
  //   long: longitude,
  // });
  const [Icon, setIcon] = useState(defaults.icon);
  const [summary, setSummary] = useState(
    "Possible light rain tomorrow night and in the morning"
  );
  const [humidity, setHumidity] = useState(74);
  const [windspeed, setWindSpeed] = useState(74);
  const [dewPoint, setDewPoint] = useState(5);
  const [uvIndex, setUVIndex] = useState(0);
  const [pressure, setPressure] = useState(1000);
  const [temperature, setTemperature] = useState(23.64);
  const [currentlySummarly, setCurrentlySummary] = useState("SNOW");

  var proxy = `https://cors-anywhere.herokuapp.com/`;

  useEffect(() => {
    console.log("dark sky api in the play");
    const api = process.env.REACT_APP_DARK_SKY_API_KEY;
    const params = {
      units: "auto",
    };
    axios
      .get(
        `${proxy}https://api.darksky.net/forecast/${api}/${latitude},${longitude}`,
        { params }
      )
      .then((response) => {
        // console.log(response.data);
        const { latitude, longitude, currently, daily, hourly } = response.data;
        console.log(currently);
        //const currently = data.data.currently;
        // console.log(currently);
        const {
          icon,
          summary,
          humidity,
          windSpeed,
          uvIndex,
          dewPoint,
          time,
          temperature,
          pressure,
        } = currently;

        //  const { data } = hourly;
        const skycon = icon.toUpperCase().replace(/-/g, "_");
        console.log("icon " + skycon);
        setIcon(skycon);
        setCurrentlySummary(summary);
        setHumidity(humidity);
        setWindSpeed(windSpeed);
        setDewPoint(dewPoint);
        setUVIndex(uvIndex);
        setPressure(pressure);
        setTemperature(temperature);
        setSummary(hourly.summary);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [latitude]);

  return (
    <section className="search-result">
      <div className="place">
        <p>{name}</p>

        <div className="coordinates">
          <div className="latitude">
            {" "}
            <small>
              {" "}
              <span>Lat</span> : {latitude}
            </small>
          </div>
          <div className="longitude">
            <small>
              {" "}
              <span>Long</span> :{longitude}
            </small>
          </div>
        </div>
      </div>

      <div className="place-details-currently">
        <p>
          <span>Wind</span>
          {windspeed} kph
        </p>
        <p>
          <span>Humidity</span>
          {Math.round(humidity * 100)}%
        </p>
        <p>
          <span>Dew Pt . </span>
          {dewPoint}
        </p>
        <p>
          <span>UV Index</span>:{uvIndex}
        </p>
        <p>
          <span>Pressure</span>:{pressure} hpa
        </p>
      </div>
      <div className="place-details-hourly">
        <div className="hour-detail">
          <div className="icon">
            {/* <span className="material-icons" id="cloud">
              {Icon}
            </span> */}
            {/* <canvas width="128" height="128" id="icon">
              {Icon}
            </canvas> */}
            <ReactAnimatedWeather
              icon={Icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
          <div className="hourly-detail">
            <div>
              {Math.floor(temperature)}
              <span>{currentlySummarly}</span>
            </div>
          </div>
        </div>
        <div className="hour-summary">
          <p> {summary}</p>
        </div>
      </div>
    </section>
  );
}

export default SearchResult;
