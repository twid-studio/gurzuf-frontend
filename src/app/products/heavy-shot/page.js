import ProductPage from '@/components/ProductPage/ProductPage'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import data from '../../preparedData/heavy-shot.json'
import Contact from '@/utils/Contact/Contact'

export default function page() {
  return (
    <DataProvider data={data}>
      <ProductPage />
      <Contact />
    </DataProvider>
  )
}
