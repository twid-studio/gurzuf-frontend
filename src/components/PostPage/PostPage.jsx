import React from 'react'
import PostHero from './Hero/PostHero'
import PostSections from './PostSections/PostSections'

export default function PostPage() {
  return (
    <main className="post-page">
      <PostHero />
      <PostSections />
    </main>
  )
}
