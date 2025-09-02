"use client"
import React, { useEffect } from 'react'
import HeroAbout from './Hero/HeroAbout'
import TextAbout from './TextAbout/TextAbout'
import WhoWeAre from './WhoWeAre/WhoWeAre'
import ImportantToUs from './ImportantToUs/ImportantToUs'
// import WhereWeGoing from './WhereWeGoing/WhereWeGoing'
import { motion } from 'framer-motion'
import { anim, PageAnim } from '@/lib/helpers/anim'
import NewWhereWeGoing from './NewWhereWeGoing/NewWhereWeGoing'

export default function AboutPage() {
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  return (
    <motion.main className="about" {...anim(PageAnim)}>
      <HeroAbout />
      <TextAbout />
      <WhoWeAre />
      <ImportantToUs />
      <NewWhereWeGoing />
    </motion.main>
  )
}
