import HomePage from "@/components/HomePage/HomePage";
import data from "./preparedData/home.json";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import Contact from "@/utils/Contact/Contact";

export default function Home() {
  return (
    <DataProvider data={data}>
      <HomePage />
      <Contact />
    </DataProvider>
  );
}
