const fallbackData = {
  pageTitle: "RTRTS TMPLATE",
  keywords: ["nextjs", "next.js", "creative", "creative development", "framer-motion"],
  metaDescription:
    "the ideal template for creative work, featuring stunning components and fluid functionality on nextjs.",
  metaTitle: "RTRTS TMPLATE",
  openGraphImage: "/assets/screenshot.png",
};

export async function generatePagesMetadata(seoData) {
  const data = seoData || fallbackData;

  const pageTitle = data.pageTitle || fallbackData.pageTitle;
  const metaTitle = data.metaTitle || fallbackData.metaTitle;
  const metaDescription = data.metaDescription || fallbackData.metaDescription;
  const keywords = data.keywords || fallbackData.keywords;
  const openGraphImage = data.openGraphImage || fallbackData.openGraphImage;

  console.log("SEO DATA:", data);
  

  return {
    title: pageTitle,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: "",
      images: [
        {
          url: openGraphImage,
          width: 720,
          height: 405,
          alt: "OpenGraph",
        },
      ],
    },
  };
}
