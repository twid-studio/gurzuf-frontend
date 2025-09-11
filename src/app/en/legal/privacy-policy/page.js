import LegalPage from '@/components/LegalPage/LegalPage'
import { client } from '@/lib/sanity/client'
import { PRIVACY_POLICY_QUERY } from '@/lib/sanity/queries'
import React from 'react'

export const revalidate = 60;

export default async function page() {
  const dataSanity = await client.fetch(PRIVACY_POLICY_QUERY, {
<<<<<<< HEAD:src/app/legal/privacy-policy/page.jsx
    lang: 'ua'
=======
    lang: 'en'
>>>>>>> origin/preview:src/app/en/legal/privacy-policy/page.js
  });

  return (
    <LegalPage 
      data={dataSanity}
    />
  )
}
