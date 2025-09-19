import HomePage from "@/components/HomePage/HomePage";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import Contact from "@/utils/Contact/Contact";
import { HOME_QUERY } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";

export const revalidate = 60;

// Shared data fetching function
async function fetchHomeData() {
  return await client.fetch(HOME_QUERY, {
    pageId: "homepage",
    lang: "ua"
  });
}

export async function generateMetadata() {
  const dataSanity = await fetchHomeData();
  return generatePagesMetadata(dataSanity?.seo);
}

export default async function Home() {
  const dataSanity = await fetchHomeData();

  return (
    <DataProvider data={dataSanity}>
      <HomePage />
    </DataProvider>
  );
}
