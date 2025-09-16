const fallbackData = {
  keywords: [
    "Gurzuf Defence",
    "Gurzuf",
    "Гурзуф",
    "Гурзуф Дефенс",
    "Gurzuf Drones",
    "БПЛА",
    "дрони",
    "Україна",
    "Ukraine",
    "military drones",
    "військові дрони",
    "розвідка",
    "ударні дрони",
    "ударний дрон",
    "розвідувальні дрони",
  ],
  metaDescription:
    "Gurzuf Defence виробляє багатоцільові модульні безпілотні системи, які точково б’ють техніку ворога й бережуть життя наших захисників. Працюємо, доки не звільнимо всю країну — від Сумщини до Криму.",
  metaTitle: "Блог Gurzuf Defence",
  openGraphImage:
    "https://cdn.sanity.io/images/36epaiqm/production/39ae896caf0d842e18cb61d1a0b5dd169f510a45-1200x630.webp",
  pageTitle: "Блог Gurzuf Defence",
};

export async function generatePagesMetadata(seoData) {
  const data = seoData || fallbackData;

  const pageTitle = data.pageTitle || fallbackData.pageTitle;
  const metaTitle = data.metaTitle || fallbackData.metaTitle;
  const metaDescription = data.metaDescription || fallbackData.metaDescription;
  const keywords = data.keywords || fallbackData.keywords;
  const openGraphImage = data.openGraphImage || fallbackData.openGraphImage;

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
