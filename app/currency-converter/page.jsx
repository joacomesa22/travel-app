"use client";
import { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertion, setConvertion] = useState(null);

  const API_KEY = "2cebc6a5bd86ec9f0887bce1";

  const convert = (from, to, amount) => {
    return fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`
    )
      .then((res) => res.json())
      .then((data) => setConvertion(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    convert(fromCurr, toCurr, amount);
  };
  return (
    <section className="mt-40 ml-40 text-black">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <select
          onChange={(e) => {
            setFromCurr(e.target.value);
          }}
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
        </select>
        <select
          onChange={(e) => {
            setToCurr(e.target.value);
          }}
        >
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="number"
          placeholder="34"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <input
          type="submit"
          value="Convert"
          className="text-white p-4 bg-blue-400 cursor-pointer"
        />
      </form>
      <div className="text-white">
        <h3>
          Convertion from {fromCurr} to {toCurr}:
        </h3>
        <p>{convertion?.conversion_result}</p>
      </div>
    </section>
  );
};

export default CurrencyConverter;
