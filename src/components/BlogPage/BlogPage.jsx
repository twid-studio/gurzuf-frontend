"use client";

import React, { useState } from 'react'

import Hero from './Hero/Hero'

export default function BlogPage() {
  const [activeFilters, setActiveFilters] = useState("all");

  return (
    <main className="blog">
      <Hero
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
    </main>
  )
}
