"use client";
import React, { useEffect } from "react";
import "./LegalPage.scss";
import SanityBlockContent from "@sanity/block-content-to-react";
import BlockContent from "@/utils/BlockContent/BlockContent";
import { motion } from "framer-motion";
import { anim, PageAnim } from "@/lib/helpers/anim";

export default function LegalPage({ data }) {
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  return (
    <motion.main className="legal-page" {...anim(PageAnim)}>
      <div className="top container">
        <p className="date shadow">{data?.changedDate}</p>
        <h1 className="title">{data?.title}</h1>
      </div>

      <div className="content">
        {data?.blockContent && <BlockContent content={data.blockContent} />}
      </div>
    </motion.main>
  );
}
