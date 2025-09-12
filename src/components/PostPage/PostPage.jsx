"use client"
import React, { useEffect } from 'react'
import PostHero from './Hero/PostHero'
import PostSections from './PostSections/PostSections'
import { motion } from 'framer-motion'
import { anim, PageAnim } from '@/lib/helpers/anim'

export default function PostPage() {
    useEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, []);
  
  return (
    <motion.main className="post-page" {...anim(PageAnim)}>
      <PostHero />
      <PostSections />
    </motion.main>
  )
}
