import ProductPage from '@/components/ProductPage/ProductPage'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import Contact from '@/utils/Contact/Contact'
import { client } from '@/lib/sanity/client'
import { PRODUCT_DETAILS_QUERY } from '@/lib/sanity/queries'
import { generatePagesMetadata } from '@/lib/helpers/generatePagesMetadata'

export const revalidate = 60;

// Shared data fetching function
async function fetchProductData() {
  const params = { slug: 'heavy-shot', lang: 'en' };
  return await client.fetch(PRODUCT_DETAILS_QUERY, params);
}

export async function generateMetadata() {
  const dataSanity = await fetchProductData();
  return generatePagesMetadata(dataSanity?.seo);
}

export default async function page() {
  const dataSanity = await fetchProductData();

  return (
    <DataProvider data={dataSanity}>
      <ProductPage />
      <Contact />
    </DataProvider>
  )
}
