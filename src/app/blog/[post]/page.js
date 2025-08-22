import React from 'react'
import { DataProvider } from '@/lib/providers/DataProvider/DataProvider'

import data from '../../preparedData/post.json'
import data2 from '../../preparedData/post2.json'
import Contact from '@/utils/Contact/Contact'
import PostPage from '@/components/PostPage/PostPage'

export default function page({ params }) {
  const { post: slug } = params;
  
  return (
    <DataProvider data={slug === "azov-special-forces" ? data : data2}>
      <PostPage />
      <Contact />
    </DataProvider>
  )
}


