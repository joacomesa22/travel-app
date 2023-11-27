"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ButtonDefault } from "@/components/Button";
import { DefaultSpinner } from "@/components/Spinner";

const API_KEY = "89763055f86210c1808b9b40f60c6e47";

const icons = {
  "01d": "sun.png",
  "01n": "sun.png",
  "02d": "cloud-sun.png",
  "02n": "cloud-sun.png",
  "03d": "cloud.png",
  "03n": "cloud.png",
  "04d": "cloud.png",
  "04n": "cloud.png",
  "09d": "cloud-showers-heavy.png",
  "09n": "cloud-showers-heavy.png",
  "10d": "cloud-bolt.png",
  "10n": "cloud-bolt.png",
  "13d": "snowflake.png",
  "13n": "snowflake.png",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserWeather = (city) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    ).then((res) => res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    error && setError(false);
    const data = await getUserWeather(query);
    if (data.cod == "404") {
      setError(true);
    } else {
      setCityData({
        name: data.name,
        temp: data.main.temp.toFixed(),
        wind: data.wind.speed,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
      });
    }
    setLoading(false);
    setQuery("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col items-center gap-6"
      >
        <label
          htmlFor="weatherSearch"
          className="text-2xl md:text-4xl text-center"
        >
          Enter city name!
        </label>
        <input
          type="text"
          id="weatherSearch"
          className="text-black p-2 rounded-full"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Buenos Aires..."
          value={query}
          required
        />
        <ButtonDefault type={"submit"} text={"Search"} />
      </form>
      {loading ? (
        <div className="mt-4">
          <DefaultSpinner />
        </div>
      ) : (
        cityData !== null &&
        error === false && (
          <div className="flex flex-col items-center w-full ">
            <Image
              src={`/images/${icons[cityData.icon]}`}
              width={140}
              height={140}
              alt="Weather Icon"
            />
            <span className="text-3xl">{cityData.temp}&deg;</span>
            <p className="text-2xl">{cityData.name}</p>
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  src={`/images/wind.png`}
                  width={60}
                  height={60}
                  alt="Wind Icon"
                />{" "}
                <p>{cityData.wind} km/h</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  src={`/images/humidity.png`}
                  width={60}
                  height={60}
                  alt="Humidiy Icon"
                />{" "}
                <p>{cityData.humidity} %</p>
              </div>
            </div>
          </div>
        )
      )}
      {error === true && (
        <div className="mt-6">
          <p className="text-red-500">Please enter a valid city</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
