import { client } from "@/lib/sanity/client";
import { FOOTER_SETTINGS_QUERY } from "@/lib/sanity/queries";
import {
  CONTACT_SETTINGS_QUERY,
  HEADER_SETTINGS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/lib/sanity/siteSettingsQueries";
import Contact from "@/utils/Contact/Contact";
import ContactWrapper from "@/utils/ContactWrapper/ContactWrapper";
import Footer from "@/utils/Footer/Footer";
import Header from "@/utils/Header/Header";
import React from "react";

export default async function layout({ children }) {
  const data = await client.fetch(SITE_SETTINGS_QUERY, {
    lang: "ua",
  });

  return (
    <>
      <Header data={data.header} />
      {children}
      <ContactWrapper data={data} />
      <Footer data={data.footer} />
    </>
  );
}
