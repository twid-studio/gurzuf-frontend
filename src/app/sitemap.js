import { client } from '@/lib/sanity/client';

export default async function sitemap() {
  const baseUrl = 'https://www.gurzufdefence.com.ua';
  
  // Static routes
  const staticRoutes = [
    // Ukrainian routes
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products/heavy-shot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // English routes
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/products/heavy-shot`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  let dynamicRoutes = [];

  try {
    // Fetch blog posts for dynamic routes
    const blogPostsQuery = `*[_type == "post" && defined(slug.current)] {
      slug,
      _updatedAt,
      "translations": *[_type == "translation.metadata" && references(^._id)] {
        language,
        "slug": *[_type == "post" && language == ^.language && references(^.schemaType)][0].slug.current
      }
    }`;

    const blogPosts = await client.fetch(blogPostsQuery);

    // Generate blog post URLs for both languages
    blogPosts.forEach(post => {
      if (post.slug?.current) {
        // Ukrainian blog post
        dynamicRoutes.push({
          url: `${baseUrl}/blog/${post.slug.current}`,
          lastModified: new Date(post._updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });

        // English blog post (check if translation exists)
        const englishTranslation = post.translations?.find(t => t.language === 'en');
        if (englishTranslation?.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/en/blog/${englishTranslation.slug}`,
            lastModified: new Date(post._updatedAt),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Continue with static routes only if Sanity fetch fails
  }

  return [...staticRoutes, ...dynamicRoutes];
}
