import ProductPage from '@/components/ProductPage/ProductPage'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import Contact from '@/utils/Contact/Contact'
import BlogPage from '@/components/BlogPage/BlogPage'
import { client } from '@/lib/sanity/client'
import { BLOG_LIST_QUERY } from '@/lib/sanity/queries'
import { generatePagesMetadata } from '@/lib/helpers/generatePagesMetadata'

export const revalidate = 60;

// Shared data fetching function
async function fetchBlogData() {
  return await client.fetch(BLOG_LIST_QUERY, {
    lang: 'en'
  });
}

export async function generateMetadata() {
  const dataSanity = await fetchBlogData();
  return generatePagesMetadata(dataSanity?.seo);
}

export default async function page() {
  const dataSanity = await fetchBlogData();

  return (
    <DataProvider data={dataSanity}>
      <BlogPage />
      <Contact />
    </DataProvider>
  )
}
