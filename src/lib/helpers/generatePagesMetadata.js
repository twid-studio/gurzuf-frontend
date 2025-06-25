const fallbackData = {
  documentTitle: "RTRTS TMPLATE",
  documentKeywords:
    "nextjs, next.js, creative, creative development, framer-motion",
  documentDescription:
    "the ideal template for creative work, featuring stunning components and fluid functionality on nextjs.",
  documentImage: "/images/screenshot.png",
};

export async function generatePagesMetadata(endpoint) {
  const preparedData = await fetch(endpoint, {
    next: { revalidate: 120 },
  }).then((response) => response.json());

  const data = preparedData.seo || fallbackData;

  return {
    title: data.documentTitle,
    keywords: data.documentKeywords,
    description: data.documentDescription,
    openGraph: {
      title: data.documentTitle,
      keywords: data.documentKeywords,
      description: data.documentDescription,
      url: "",
      images: [
        {
          url: data.documentImage,
          width: 720,
          height: 405,
          alt: "OpenGraph",
        },
      ],
    },
  };
}
