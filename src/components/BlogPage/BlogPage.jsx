"use client";

import React, { useContext, useEffect, useState } from "react";

import Hero from "./Hero/Hero";
import { AnimatePresence } from "framer-motion";
import HotNews from "./HotNews/HotNews";
import { DataContext } from "@/lib/providers/DataProvider/context";
import BlogList from "./BlogList/BlogList";

const filters = [
  {
    title: "Всі",
    slug: "all",
  },
  {
    title: "Новини",
    slug: "news",
  },
  {
    title: "Інтервʼю",
    slug: "interview",
  },
  {
    title: "Спецпроєкти",
    slug: "special-project",
  },
  {
    title: "Військові говорять",
    slug: "military-speak",
  },
];

export default function BlogPage() {
  const { data } = useContext(DataContext);

  const [activeFilters, setActiveFilters] = useState("all");
  const [blogList, setBlogList] = useState(data?.blogList);
  const [cachedBlogList, setCachedBlogList] = useState(null);
  const [availableFilters, setAvailableFilters] = useState(filters);

  // Cache the original blog list when data is first loaded
  useEffect(() => {
    if (data?.blogList && !cachedBlogList) {
      setCachedBlogList(data.blogList);
      setBlogList(data.blogList);
    }
  }, [data?.blogList, cachedBlogList]);

  // Filter available filter options based on actual post types in the list
  useEffect(() => {
    if (!cachedBlogList?.list) return;

    // Get unique post types from the blog list
    const availableTypes = new Set(
      cachedBlogList.list.map((item) => item.type?.slug).filter(Boolean)
    );

    // Filter the filters array to only include types that have posts
    const filteredFilters = filters.filter((filter) => {
      // Always include "all" filter
      if (filter.slug === "all") return true;
      // Include filter only if there are posts of this type
      return availableTypes.has(filter.slug);
    });

    setAvailableFilters(filteredFilters);
  }, [cachedBlogList]);

  // Handle filtering using cached data
  useEffect(() => {
    if (!cachedBlogList) return;

    if (activeFilters === "all") {
      setBlogList(cachedBlogList);
    } else {
      const filteredList = {
        ...cachedBlogList,
        list:
          cachedBlogList.list?.filter(
            (item) => item.type?.slug === activeFilters
          ) || [],
      };
      setBlogList(filteredList);
    }
  }, [cachedBlogList, activeFilters]);

  return (
    <main className="blog">
      <Hero 
        filtersData={availableFilters} 
        activeFilters={activeFilters} 
        setActiveFilters={setActiveFilters} 
      />

      <AnimatePresence mode="wait" initial={false}>
        {activeFilters === "all" && blogList?.list.length && (
          <HotNews data={blogList} />
        )}
      </AnimatePresence>

      <BlogList data={blogList} activeFilters={activeFilters} />
    </main>
  );
}
