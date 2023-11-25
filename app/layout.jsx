import "./globals.css";
import { montserrat } from "@/assets/fonts";
import { NavbarWithMegaMenu } from "@/components/Navbar";

export const metadata = {
  title: "API-Verse",
  description: "Website full of APIs!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-[#0d0d0d] text-white`}>
        <NavbarWithMegaMenu />
        <main>{children}</main>
      </body>
    </html>
  );
}
