import React from "react";
import { audiowide } from "@/assets/fonts";

const ApiTitle = ({ title, text }) => {
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <h1
        className={`${audiowide.className} bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 inline-block text-transparent bg-clip-text text-5xl md:text-7xl`}
      >
        {title}
      </h1>
      <p className="max-w-[300px] md:max-w-[500px] text-sm md:text-lg">
        {text}
      </p>
    </div>
  );
};

export default ApiTitle;
