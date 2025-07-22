import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import data from '../preparedData/about.json'
import AboutPage from '@/components/AboutPage/AboutPage'

export default function page() {
  return (
    <DataProvider data={data}>
      <AboutPage />
    </DataProvider>
  )
}
