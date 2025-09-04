import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import AboutPage from '@/components/AboutPage/AboutPage'
import JobContact from '@/utils/JobContact/JobContact'
import { client } from '@/lib/sanity/client'
import { ABOUT_QUERY } from '@/lib/sanity/queries'

export const revalidate = 60;

export default async function page() {
  const dataSanity = await client.fetch(ABOUT_QUERY, {
    lang: 'en'
  });

  return (
    <DataProvider data={dataSanity}>
      <AboutPage />
      <JobContact />
    </DataProvider>
  )
}
