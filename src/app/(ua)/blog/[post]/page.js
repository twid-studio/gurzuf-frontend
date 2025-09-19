import React from "react";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

import data from "../../../preparedData/post.json";
import data2 from "../../../preparedData/post2.json";
import Contact from "@/utils/Contact/Contact";
import PostPage from "@/components/PostPage/PostPage";
import { client } from "@/lib/sanity/client";
import { POST_QUERY } from "@/lib/sanity/queries";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";

export const revalidate = 60;

// Shared data fetching function
async function fetchPostData(slug) {
  try {
    const dataSanity = await client.fetch(POST_QUERY, {
      slug,
      lang: 'ua'
    });
    
    // Use Sanity data if available, otherwise fallback to local data
    return dataSanity || (slug === "azov-special-forces" ? data : data2);
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    
    // Fallback to local data if Sanity fetch fails
    return slug === "azov-special-forces" ? data : data2;
  }
}

export async function generateMetadata({ params }) {
  const { post: slug } = params;
  const postData = await fetchPostData(slug);
  return generatePagesMetadata(postData?.seo);
}

export default async function page({ params }) {
  const { post: slug } = params;
  const postData = await fetchPostData(slug);
  
  return (
    <DataProvider data={postData}>
      <PostPage />
    </DataProvider>
  );
}
