"use client";

import { useState } from "react";
import { ButtonDefault } from "@/components/Button";
import { DefaultSpinner } from "@/components/Spinner";
import ApiTitle from "@/components/ApiTitle";

const Translator = () => {
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("es");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const translate = async (from, to, text) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      error && setError(false);
      const data = await translate(fromLang, toLang, text);
      setTranslation(data.responseData.translatedText);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ApiTitle
        title="Translator"
        text="Break language barriers instantly with the translator! Simply select the languages you need, add the text you want to translate and hit the Translate button!"
      />
      <div className="flex flex-col gap-4 p-6 md:p-8 rounded-lg border w-full sm:max-w-[400px]">
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
            required
          ></textarea>
          <ButtonDefault type="submit" text="Translate" />
        </form>
        <div className="flex flex-col justify-center items-center">
          <span className="text-base text-gray-300">Translation:</span>

          {loading ? (
            <div className="mt-4">
              <DefaultSpinner />
            </div>
          ) : error !== true ? (
            <div className="mt-4">
              {translation !== null && error !== true && (
                <p className="text-xl">{translation}</p>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-red-500">Something went wrong</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Translator;
