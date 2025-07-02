import { Inter } from "next/font/google";
import "@/styles/reset.scss";
import {
  ScrollProvider,
} from "@/lib/providers/ScrollProvider/ScrollProvider";
import Header from "@/utils/Header/Header";
import Footer from "@/utils/Footer/Footer";
import Contact from "@/utils/Contact/Contact";

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata = {
  title: "GURZUF DEFENCE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="html">
      <body className={`${inter.variable} body`}>
        <ScrollProvider scrollBar></ScrollProvider>
        <Header />
        {children}
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
