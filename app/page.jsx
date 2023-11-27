import { audiowide } from "@/assets/fonts";
import {
  BanknotesIcon,
  FlagIcon,
  SunIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { createElement } from "react";

const apiCards = [
  {
    title: "Language Translator",
    text: "Break language barriers instantly with the translator!",
    icon: LanguageIcon,
    route: "translator",
  },
  {
    title: "Currency Converter",
    text: "Stay on top of exchange rates with the currency converter app.",
    icon: BanknotesIcon,
    route: "currency-converter",
  },
  {
    title: "Weather",
    text: "Get real-time weather info from all around the world",
    icon: SunIcon,
    route: "weather",
  },
  {
    title: "Country Information",
    text: "Explore countries with ease through the country info app.",
    icon: FlagIcon,
    route: "country-info",
  },
];

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center gap-10 my-24 lg:my-0 md:h-screen px-3 md:pt-10">
      <div className="max-w-[1000px] text-center flex flex-col justify-center items-center gap-3">
        <p className="text-xl md:text-4xl">Welcome to</p>
        <h1
          className={`${audiowide.className} text-5xl sm:text-6xl md:text-9xl bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 inline-block text-transparent bg-clip-text`}
        >
          Travel Kit
        </h1>
        <p className="text-base md:text-xl max-w-[600px] mb-4">
          An all-in-one website for travelers! From live weather updates and
          currency conversion to language translation and detailed country
          information, these API-powered apps provide instant access to
          essential data.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1400px]">
        {apiCards.map(({ title, text, icon, route }, key) => (
          <Link
            href={`apis/${route}`}
            key={key}
            className="hover:-translate-y-1 duration-200"
          >
            <div className="flex flex-col h-full items-start gap-2 max-w-[300px] bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 p-6 rounded-2xl">
              {createElement(icon, {
                className: "h-16 md:h-24 text-white",
                strokeWidth: "1",
              })}
              <h3 className="text-lg md:text-xl font-bold">{title}</h3>
              <p className="text-sm">{text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
