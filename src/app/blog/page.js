import ProductPage from '@/components/ProductPage/ProductPage'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'
import React from 'react'

import data from '../preparedData/blog.json'
import Contact from '@/utils/Contact/Contact'
import BlogPage from '@/components/BlogPage/BlogPage'

export default function page() {
  return (
    <DataProvider data={data}>
      <BlogPage />
    </DataProvider>
  )
}
