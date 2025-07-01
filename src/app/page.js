import HomePage from "@/components/HomePage/HomePage";
import data from "./preparedData/home.json";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export default function Home() {
  return (
    <DataProvider data={data}>
      <HomePage />
    </DataProvider>
  );
}
