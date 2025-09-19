"use client";
import { usePathname } from "next/navigation";
import React from "react";
import JobContact from "../JobContact/JobContact";
import Contact from "../Contact/Contact";

export default function ContactWrapper({ data, lang }) {
  const path = usePathname();

  if (path.includes("/about")) {
    return <JobContact data={data.jobContactForm} />;
  } else if (path.includes("/legal")) {
    return null;
  } else {
    return <Contact data={data.contactForm} />;
  }
}
