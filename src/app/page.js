import HomePage from "@/components/HomePage/HomePage";
import data from "./preparedData/home.json";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import Contact from "@/utils/Contact/Contact";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";

export default async function Home() {
  const dataSanity = await client.fetch(HOME_QUERY);
  
  return (
    <DataProvider data={dataSanity}>
      <HomePage />
      <Contact />
    </DataProvider>
  );
}
