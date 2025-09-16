import { Inter } from "next/font/google";
import "@/styles/reset.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import Header from "@/utils/Header/Header";
import Footer from "@/utils/Footer/Footer";
import Contact from "@/utils/Contact/Contact";
import { LocaleProvider } from "@/lib/providers/LocaleProvider/LocaleProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata = {
  title: "GURZUF DEFENCE",
  description: "Gurzuf Defence виробляє багатоцільові модульні безпілотні системи, які точково б’ють техніку ворога й бережуть життя наших захисників. Працюємо, доки не звільнимо всю країну — від Сумщини до Криму.",
  openGraph: {
    title: "GURZUF DEFENCE",
    description: "",
    url: "https://www.gurzufdefence.com.ua",
    siteName: "GURZUF DEFENCE",
    images: [
      {
        url: "/assets/OPENGRAPH.webp",
        width: 1200,
        height: 630,
        alt: "GURZUF Logo",
      },
    ],
    locale: "ua_UA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua" className="html">
      <body className={`${inter.variable} body`}>
        <ScrollProvider scrollBar></ScrollProvider>
        <LocaleProvider>
          <Header />
          {children}
          {/* <Contact /> */}
          <Footer />
        </LocaleProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
