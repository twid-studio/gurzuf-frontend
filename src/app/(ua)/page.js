import HomePage from "@/components/HomePage/HomePage";
import data from "../preparedData/home.json";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import Contact from "@/utils/Contact/Contact";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";

export const revalidate = 60;

export default async function Home() {
  const dataSanity = await client.fetch(HOME_QUERY, {
    pageId: "homepage",
    lang: "ua"
  });
  
  return (
    <DataProvider data={dataSanity}>
      <HomePage />
      <Contact />
    </DataProvider>
  );
}
