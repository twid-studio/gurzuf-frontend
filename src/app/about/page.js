import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import data from '../preparedData/about.json'
import AboutPage from '@/components/AboutPage/AboutPage'
import JobContact from '@/utils/JobContact/JobContact'
import { client } from '@/lib/sanity/client'
import { ABOUT_QUERY } from '@/lib/sanity/queries'
export const revalidate = 60;

export default async function page() {
  const dataSanity = await client.fetch(ABOUT_QUERY);
  return (
    <DataProvider data={dataSanity}>
      <AboutPage />
      <JobContact />
    </DataProvider>
  )
}
