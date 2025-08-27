import ProductPage from '@/components/ProductPage/ProductPage'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import data from '../preparedData/blog.json'
import Contact from '@/utils/Contact/Contact'
import BlogPage from '@/components/BlogPage/BlogPage'
import { client } from '@/lib/sanity/client'
import { BLOG_LIST_QUERY } from '@/lib/sanity/queries'

export default async function page() {
  const dataSanity = await client.fetch(BLOG_LIST_QUERY);

  console.log(dataSanity);

  console.log('Sanity data:', dataSanity);
  
  return (
    <DataProvider data={dataSanity}>
      <BlogPage />
      <Contact />
    </DataProvider>
  )
}
