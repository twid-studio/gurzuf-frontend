import LegalPage from '@/components/LegalPage/LegalPage'
// import { client } from '@/lib/sanity/client'
// import { PRIVACY_POLICY_QUERY } from '@/lib/sanity/queries'
import React from 'react'

import data from '@/app/preparedData/privacyPolicy.json'

export default async function page() {
  // const dataSanity = await client.fetch(PRIVACY_POLICY_QUERY);

  // console.log("Privacy Policy Data:", dataSanity);

  return (
    <LegalPage 
      data={data}
    />
  )
}
