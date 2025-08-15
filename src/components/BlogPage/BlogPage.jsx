"use client";

import React, { useContext, useState } from "react";

import Hero from "./Hero/Hero";
import { AnimatePresence } from "framer-motion";
import HotNews from "./HotNews/HotNews";
import { DataContext } from "@/lib/providers/DataProvider/context";
import BlogList from "./BlogList/BlogList";

export default function BlogPage() {
  const [activeFilters, setActiveFilters] = useState("all");
  const { data } = useContext(DataContext);

  return (
    <main className="blog">
      <Hero activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

      <AnimatePresence mode="wait">
        {activeFilters === "all" && <HotNews data={data?.blogList} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <BlogList data={data?.blogList} />
      </AnimatePresence>

      <div style={{ height: "100vh" }}></div>
    </main>
  );
}
