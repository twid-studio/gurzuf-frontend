import React from 'react'
import HeroAbout from './Hero/HeroAbout'
import TextAbout from './TextAbout/TextAbout'
import WhoWeAre from './WhoWeAre/WhoWeAre'
import ImportantToUs from './ImportantToUs/ImportantToUs'
import WhereWeGoing from './WhereWeGoing/WhereWeGoing'

export default function AboutPage() {
  return (
    <main className="about">
      {/* <div style={{ height: "100vh" }}></div> */}
      <HeroAbout />
      <TextAbout />
      <WhoWeAre />
      <ImportantToUs />
      {/* <WhereWeGoing /> */}
      {/* <div style={{ height: "100vh", border: "1px solid red" }}></div> */}
    </main>
  )
}
