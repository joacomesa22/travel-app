import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center px-10 py-4 border-t w-full bg-[#0d0d0d]">
      <p className="text-xs">
        Built by{" "}
        <Link href={"https://www.joacomesa.com.ar/"} target="_blank">
          <span className="bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600 inline-block text-transparent bg-clip-text font-bold">
            Joaco
          </span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
