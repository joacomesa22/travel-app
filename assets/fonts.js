import { Audiowide } from "next/font/google";
import { Montserrat } from "next/font/google";

export const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});
