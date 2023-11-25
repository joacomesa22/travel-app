"use client";
import { ButtonDefault } from "@/components/Button";
import { DefaultSpinner } from "@/components/Spinner";
import React, { useState } from "react";

const CountryInfo = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCountries = (query) => {
    return fetch("https://restcountries.com/v3.1/all").then((res) =>
      res
        .json()
        .then((data) =>
          data.filter((country) => country.name.common.includes(query))
        )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    error && setError(false);
    const data = await getCountries(query);
    if (data.length === 0) {
      setError(true);
    }
    setCountry(data);
    setLoading(false);
    setQuery("");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-lg border-4 border-blue-500">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col items-center gap-4"
      >
        <label htmlFor="countrySearch" className="text-4xl">
          Search for a country!
        </label>
        <input
          type="search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="text-black p-2 rounded-full"
          id="countrySearch"
          placeholder="Argentina"
          value={query}
          required
        />
        <ButtonDefault type="submit" text="Search" />
      </form>

      {loading ? (
        <div className="mt-4">
          <DefaultSpinner />
        </div>
      ) : (
        country !== null &&
        error === false && (
          <div className="flex justify-center gap-4 max-w-[800px] flex-wrap">
            {country.map((country) => {
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
        )
      )}
      {error === true && (
        <div className="mt-4">
          <p className="text-red-500">Please enter a valid country</p>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
