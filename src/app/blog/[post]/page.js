import React from "react";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

import data from "../../preparedData/post.json";
import data2 from "../../preparedData/post2.json";
import Contact from "@/utils/Contact/Contact";
import PostPage from "@/components/PostPage/PostPage";
import { client } from "@/lib/sanity/client";
import { POST_QUERY } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function page({ params }) {
  const { post: slug } = params;
  
  try {
    const dataSanity = await client.fetch(POST_QUERY(slug));
    console.log('Sanity data:', dataSanity);
    
    // Use Sanity data if available, otherwise fallback to local data
    const postData = dataSanity || (slug === "azov-special-forces" ? data : data2);
    
    return (
      <DataProvider data={postData}>
        <PostPage />
        <Contact />
      </DataProvider>
    );
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    
    // Fallback to local data if Sanity fetch fails
    return (
      <DataProvider data={slug === "azov-special-forces" ? data : data2}>
        <PostPage />
        <Contact />
      </DataProvider>
    );
  }
}
