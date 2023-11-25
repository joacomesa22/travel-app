"use client";
import { ButtonDefault } from "@/components/Button";
import { DefaultSpinner } from "@/components/Spinner";
import { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertion, setConvertion] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "2cebc6a5bd86ec9f0887bce1";

  const convert = (from, to, amount) => {
    return fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`
    ).then((res) => res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await convert(fromCurr, toCurr, amount);
    setConvertion(data.conversion_result.toFixed(2));
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center gap-4 p-8 rounded-lg border-4 border-blue-500">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex items-center gap-4"
      >
        <select
          onChange={(e) => {
            setFromCurr(e.target.value);
          }}
          className="text-black ml-2 p-2 rounded-md"
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
        </select>
        <select
          onChange={(e) => {
            setToCurr(e.target.value);
          }}
          className="text-black ml-2 p-2 rounded-md"
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
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
        ) : (
          convertion !== null && <p className="text-4xl">{convertion}</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
