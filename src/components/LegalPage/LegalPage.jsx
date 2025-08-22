import React from "react";
import "./LegalPage.scss";
import SanityBlockContent from "@sanity/block-content-to-react";
import BlockContent from "@/utils/BlockContent/BlockContent";

export default function LegalPage({ data }) {
  return (
    <div className="legal-page">
      <div className="top container">
        <p className="date shadow">{data?.changedDate}</p>
        <h1 className="title">{data?.title}</h1>
      </div>

      <div className="content">
        {data?.blockContent && (
          <BlockContent content={data.blockContent} />
        )}
      </div>
    </div>
  );
}
