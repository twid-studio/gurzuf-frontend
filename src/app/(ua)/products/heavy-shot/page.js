import ProductPage from '@/components/ProductPage/ProductPage'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import Contact from '@/utils/Contact/Contact'
import { client } from '@/lib/sanity/client'
import { PRODUCT_DETAILS_QUERY } from '@/lib/sanity/queries'

export const revalidate = 60;

export default async function page() {
  const params = { slug: 'heavy-shot', lang: 'ua' };
  const dataSanity =  await client.fetch(PRODUCT_DETAILS_QUERY, params);

  return (
    <DataProvider data={dataSanity}>
      <ProductPage />
      <Contact />
    </DataProvider>
  )
}
