"use client";
import { ButtonDefault } from "@/components/Button";
import { DefaultSpinner } from "@/components/Spinner";
import { useState } from "react";
import ApiTitle from "@/components/ApiTitle";

const CurrencyConverter = () => {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertion, setConvertion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const API_KEY = "2cebc6a5bd86ec9f0887bce1";

  const convert = async (from, to, amount) => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      error && setError(false);
      const data = await convert(fromCurr, toCurr, amount);
      setConvertion(data.conversion_result.toFixed(2));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ApiTitle
        title="Currency Converter"
        text="Stay on top of exchange rates with the currency converter app. Simply select the currencies you need, add the amount and hit the Convert button!"
      />
      <div className="flex flex-col items-center gap-4 p-4 mdp:-8 rounded-lg border">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <select
            onChange={(e) => {
              setFromCurr(e.target.value);
            }}
            className="text-black ml-2 p-2 rounded-md"
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="NZD">NZD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ARS">ARS</option>
            <option value="MXN">MXN</option>
            <option value="BRL">BRL</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
            <option value="CNY">CNY</option>
          </select>
          <select
            onChange={(e) => {
              setToCurr(e.target.value);
            }}
            className="text-black ml-2 p-2 rounded-md"
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="NZD">NZD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ARS">ARS</option>
            <option value="MXN">MXN</option>
            <option value="BRL">BRL</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
            <option value="CNY">CNY</option>
          </select>
          <input
            type="number"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            defaultValue={1}
            className="text-black p-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <ButtonDefault type="submit" text="convert" />
        </form>
        <div className="flex flex-col items-center gap-4">
          <span className="text-lg text-gray-300">
            Convertion from {fromCurr} to {toCurr}:
          </span>
          {loading ? (
            <DefaultSpinner />
          ) : error ? (
            <div>
              <p className="text-red-500">Something went wrong</p>
            </div>
          ) : (
            convertion !== null &&
            error === false && <p className="text-4xl">{convertion}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
