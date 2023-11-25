"use client";

import { useState } from "react";
import { ButtonDefault } from "@/components/Button";
import { DefaultSpinner } from "@/components/Spinner";

const Translator = () => {
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const translate = (from, to, text) => {
    return fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`
    ).then((res) => res.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (text === "") {
      setError(true);
      return;
    }
    error && setError(false);
    const data = await translate(fromLang, toLang, text);
    setTranslation(data.responseData.translatedText);
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className=" flex flex-col gap-4 p-8 rounded-lg border-4 border-blue-500">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex justify-start gap-4">
            <div>
              <span>From</span>
              <select
                onChange={(e) => {
                  setFromLang(e.target.value);
                }}
                className="text-black ml-2 p-2 rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="chi">Chinese</option>
                <option value="ger">German</option>
                <option value="fre">French</option>
                <option value="dut">Dutch</option>
                <option value="heb">Hebrew</option>
                <option value="hin">Hindi</option>
              </select>
            </div>
            <div>
              <span>To</span>
              <select
                onChange={(e) => {
                  setToLang(e.target.value);
                }}
                className="text-black ml-2 p-2 rounded-md"
              >
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="it">Italian</option>
                <option value="chi">Chinese</option>
                <option value="ger">German</option>
                <option value="fre">French</option>
                <option value="dut">Dutch</option>
                <option value="heb">Hebrew</option>
                <option value="hin">Hindi</option>
              </select>
            </div>
          </div>
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="text-black resize-none rounded-lg p-2"
          ></textarea>
          <ButtonDefault type="submit" text="Translate" />
        </form>
        <div className="flex flex-col justify-center items-center">
          <span className="text-lg text-gray-300">Translation:</span>

          {loading ? (
            <div className="mt-4">
              <DefaultSpinner />
            </div>
          ) : error !== true ? (
            <div className="flex justify-center flex-col">
              {translation !== null && error !== true && (
                <p className="text-4xl">{translation}</p>
              )}
            </div>
          ) : (
            <div>Please enter a valid text</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translator;
