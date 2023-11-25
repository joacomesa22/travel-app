"use client";
import React, { useState } from "react";

const CountryInfo = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(null);

  const getCountry = async (query) => {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    setCountry(data.filter((country) => country.name.common.includes(query)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getCountry(query);
  };
  return (
    <section className="pt-40 pl-40">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        Search a country
        <input
          type="search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="text-black"
        />
        <input type="submit" value="Search" className="p-3 bg-blue-400" />
      </form>
      <div>
        {country?.map((country) => {
          return (
            <div key={country.ccn3}>
              <img src={country.flags.png} alt={country.name.common} />
              <p>Name{country.name.common}</p>
              <p>Continent{country.region}</p>
              <p>Capital{country.capital[0]}</p>
              <p>
                Idiomas
                {Object.values(country.languages)
                  ?.toString()
                  .split(",")
                  .join(", ")}
              </p>
              <p>Population{country.population}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CountryInfo;
