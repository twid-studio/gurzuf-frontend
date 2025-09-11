import ProductPage from '@/components/ProductPage/ProductPage'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import Contact from '@/utils/Contact/Contact'
import BlogPage from '@/components/BlogPage/BlogPage'
import { client } from '@/lib/sanity/client'
import { BLOG_LIST_QUERY } from '@/lib/sanity/queries'

export const revalidate = 60;

export default async function page() {
<<<<<<< HEAD:src/app/blog/page.js
  // const dataSanity = await client.fetch(BLOG_LIST_QUERY);
=======
  const dataSanity = await client.fetch(BLOG_LIST_QUERY, {
    lang: 'en'
  });
>>>>>>> origin/preview:src/app/en/blog/page.js

  return (
    <DataProvider data={data}>
      <BlogPage />
      <Contact />
    </DataProvider>
  )
}
