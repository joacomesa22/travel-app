import { audiowide } from "@/assets/fonts";
import { Button } from "@material-tailwind/react";

export function ButtonDefault({ type, text }) {
  return (
    <Button
      type={type}
      className={`text-sm ${audiowide.className} bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600`}
    >
      {text}
    </Button>
  );
}
