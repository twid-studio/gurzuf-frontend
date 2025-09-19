import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import AboutPage from '@/components/AboutPage/AboutPage'
import JobContact from '@/utils/JobContact/JobContact'
import { client } from '@/lib/sanity/client'
import { ABOUT_QUERY } from '@/lib/sanity/queries'
import { generatePagesMetadata } from '@/lib/helpers/generatePagesMetadata'

export const revalidate = 60;

// Shared data fetching function
async function fetchAboutData() {
  return await client.fetch(ABOUT_QUERY, {
    lang: 'ua'
  });
}

export async function generateMetadata() {
  const dataSanity = await fetchAboutData();
  return generatePagesMetadata(dataSanity?.seo);
}

export default async function page() {
  const dataSanity = await fetchAboutData();

  return (
    <DataProvider data={dataSanity}>
      <AboutPage />
      {/* <JobContact /> */}
    </DataProvider>
  )
}
