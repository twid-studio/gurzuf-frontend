"use client";

import React, { useContext, useEffect, useState } from "react";

import Hero from "./Hero/Hero";
import { AnimatePresence } from "framer-motion";
import HotNews from "./HotNews/HotNews";
import { DataContext } from "@/lib/providers/DataProvider/context";
import BlogList from "./BlogList/BlogList";

export default function BlogPage() {
  const { data } = useContext(DataContext);

  const [activeFilters, setActiveFilters] = useState("all");
  const [blogList, setBlogList] = useState(data?.blogList);

  useEffect(() => {
    if (activeFilters === "all") {
      setBlogList(data?.blogList);
    } else {
      const filteredList = {
        ...data?.blogList,
        list:
          data?.blogList?.list?.filter(
            (item) => item.type.slug === activeFilters
          ) || [],
      };
      setBlogList(filteredList);
    }
  }, [data?.blogList, activeFilters]);

  return (
    <main className="blog">
      <Hero activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      <AnimatePresence mode="wait" initial={false}>
        {activeFilters === "all" && <HotNews data={blogList} />}
      </AnimatePresence>

      <BlogList data={blogList} activeFilters={activeFilters} />
    </main>
  );
}
