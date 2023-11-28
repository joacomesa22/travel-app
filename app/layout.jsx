import "./globals.css";
import { montserrat } from "@/assets/fonts";
import Footer from "@/components/Footer";
import { NavbarWithMegaMenu } from "@/components/Navbar";

export const metadata = {
  title: "Travel Kit",
  description: "All-in-one website for travelers!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#181818] to-[#000] text-white `}
      >
        <NavbarWithMegaMenu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
