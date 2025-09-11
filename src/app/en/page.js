import HomePage from "@/components/HomePage/HomePage";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import Contact from "@/utils/Contact/Contact";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";

import data from './preparedData/home.json';

export const revalidate = 60;

export default async function Home() {
<<<<<<< HEAD:src/app/page.js
  // const dataSanity = await client.fetch(HOME_QUERY, {
  //   pageId: "homepage"
  // });
  
=======
  const dataSanity = await client.fetch(HOME_QUERY, {
    pageId: "homepage",
    lang: "en"
  });

>>>>>>> origin/preview:src/app/en/page.js
  return (
    <DataProvider data={data}>
      <HomePage />
      <Contact />
    </DataProvider>
  );
}
