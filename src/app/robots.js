export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/legal/',
        '/en/legal/',
        '/_next/',
      ],
    },
    sitemap: 'https://gurzufdefence.com/sitemap.xml',
  }
}
