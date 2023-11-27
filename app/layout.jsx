import "./globals.css";
import { montserrat } from "@/assets/fonts";
import Footer from "@/components/Footer";
import { NavbarWithMegaMenu } from "@/components/Navbar";

export const metadata = {
  title: "Travel Kit",
  description: "Pocket guide for travelers!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-[#0d0d0d] text-white`}>
        <NavbarWithMegaMenu />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
