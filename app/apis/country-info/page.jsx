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
          data
            .filter((country) => country.name.common.includes(query))
            .slice(0, 6)
        )
    );
  };

  const capitalizer = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    error && setError(false);
    const data = await getCountries(capitalizer(query));
    if (data.length === 0) {
      setError(true);
    }
    setCountry(data);
    setLoading(false);
    setQuery("");
  };

  return (
    <div className="flex flex-col justify-start items-center gap-6 p-6 md:p-8 rounded-lg border max-w-[1200px] my-24">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col items-center gap-4"
      >
        <label
          htmlFor="countrySearch"
          className="text-2xl md:text-4xl text-center"
        >
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
          <div className="flex justify-center gap-6 flex-wrap">
            {country.map((country) => {
              return (
                <div
                  key={country.ccn3}
                  className="flex flex-col gap-2 items-start justify-start w-full md:w-[300px] border p-4 rounded-lg"
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="w-full md:w-[200px] h-[120px] md:h-[200px] object-cover md:object-contain"
                    />
                    <h3 className="text-2xl text-center">
                      {country.name.common}
                    </h3>
                  </div>
                  <div className="text-base md:text-lg">
                    <p>
                      <span className="text-gray-300 text-sm">Continent:</span>{" "}
                      {country.region}
                    </p>
                    <p>
                      <span className="text-gray-300 text-sm">Capital:</span>{" "}
                      {country.capital[0]}
                    </p>
                    <p>
                      <span className="text-gray-300 text-sm">Languages:</span>{" "}
                      {Object.values(country.languages)
                        ?.toString()
                        .split(",")
                        .join(", ")}
                    </p>
                    <p>
                      <span className="text-gray-300 text-sm">Population:</span>{" "}
                      {country.population}
                    </p>
                  </div>
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
