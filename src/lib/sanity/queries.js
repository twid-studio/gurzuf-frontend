export const HOME_QUERY = `*[_type == "homePage"][0]{
  "hero": {
    "background": hero.background.asset->url,
    "title": hero.title,
    "text": hero.text,
    "button": {
      "text": hero.button.text,
      "href": hero.button.href
    },
    "video": {
      "src": hero.video.src.asset->url,
      "preview": hero.video.preview.asset->url
    }
  },
  "about": {
    "logos": about.logos[]{
      "src": src.asset->url,
      "alt": alt
    },
    "title": about.title,
    "text": about.text,
    "list": about.list
  },
  "products": {
    "list": products.list[]{
      "name": name,
      "description": description,
      "slug": slug.current,
      "image": image.asset->url,
      "button": {
        "text": button.text,
        "href": button.href
      },
      "characteristics": characteristics[]{
        "title": title,
        "value": value
      }
    }
  },
  "privilages": {
    "title": privilages.title,
    "list": privilages.list[]{
      "title": title,
      "text": text
    }
  },
  "operations": {
    "title": operations.title,
    "text": operations.text,
    "list": operations.list[]{
      "text": text,
      "content": content.asset->url,
      "characteristics": characteristics
    }
  },
  "quote": {
    "text": quote.text,
    "author": {
      "name": quote.author.name,
      "position": quote.author.position,
      "image": quote.author.image.asset->url
    },
    "button": {
      "active": quote.button.active,
      "text": quote.button.text,
      "href": quote.button.href
    }
  },
  "news": {
    "title": news.title,
    "list": news.list[]-> {
      "type": {
        "slug": preview.type,
        "text": select(
          preview.type == "news" => "Новини",
          preview.type == "interview" => "Інтерв'ю",
          preview.type == "special-project" => "Спецпроєкти",
          preview.type == "military-speak" => "Військові говорять",
          "Невідомий тип"
        )
      },
      "link": select(
        preview.linkType == "internal" => {
          "type": "slug",
          "slug": preview.slug.current
        },
        preview.linkType == "external" => {
          "type": "href",
          "href": preview.externalLink
        },
        {
          "type": "slug",
          "slug": preview.slug.current
        }
      ),
      "title": preview.title,
      "image": preview.mainImage.asset->url,
      "source": {
        "active": defined(preview.sourceLogo),
        "image": preview.sourceLogo.asset->url
      },
      "date": preview.publishedAt
    },
    "button": {
      "active": news.button.active,
      "text": news.button.text,
      "href": news.button.href
    }
  },
  "reviews": {
    "title": reviews.title,
    "list": reviews.list[]{
      "text": text,
      "author": {
        "position": author.position
      }
    }
  }
}`;

export const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicyPage"][0]{
  title,
  changedDate,
  blockContent
}`;

export const BLOG_LIST_QUERY = `{
  "hero": *[_type == "blogsPage"][0].hero {
    title,
    text,
    filters[] {
      title,
      slug
    }
  },
  "blogList": {
    "titleHotNews": *[_type == "blogsPage"][0].blogList.titleHotNews,
    "list": *[_type == "blogPost" && isVisible == true] | order(preview.publishedAt desc) {
      _id,
      "type": {
        "slug": preview.type,
        "text": select(
          preview.type == "news" => "Новини",
          preview.type == "interview" => "Інтерв'ю",
          preview.type == "special-project" => "Спецпроєкти",
          preview.type == "military-speak" => "Військові говорять",
          "Невідомий тип"
        )
      },
      "link": select(
        preview.linkType == "internal" => {
          "type": "slug",
          "slug": preview.slug.current
        },
        preview.linkType == "external" => {
          "type": "href",
          "href": preview.externalLink
        }
      ),
      "title": preview.title,
      "image": preview.mainImage.asset->url,
      "source": {
        "active": defined(preview.sourceLogo),
        "image": preview.sourceLogo.asset->url
      },
      "date": preview.publishedAt
    }
  }
}
`;

export const POST_QUERY = (
  slug
) => `*[_type == "blogPost" && preview.slug.current == "${slug}"][0]{
  _id,
  isVisible,
  "hero": {
    "title": preview.title,
    "type": {
      "slug": preview.type,
      "text": select(
        preview.type == "news" => "Новини",
        preview.type == "interview" => "Інтерв'ю",
        preview.type == "special-project" => "Спецпроєкти",
        preview.type == "military-speak" => "Військові говорять",
        "Невідомий тип"
      )
    },
    "date": coalesce(preview.publishedAt, _createdAt),
    "image": {
      "active": defined(content.hero.image) && defined(content.hero.image.src),
      "src": content.hero.image.src.asset->url,
      "alt": coalesce(content.hero.image.alt, content.hero.image.src.alt, "")
    }
  },
  preview {
    title,
    "slug": slug.current,
    linkType,
    externalLink,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "sourceLogo": sourceLogo.asset->url,
    type
  },
  content {
    hero {
      image {
        active,
        "src": src.asset->url,
        "alt": coalesce(alt, src.alt, "")
      }
    },
    sections[] {
      _type == "richText" => {
        "type": "rich-text",
        text
      },
      _type == "video" => {
        "type": "video",
        video {
          "src": src.asset->url,
          "preview": preview.asset->url
        },
        text {
          active,
          content
        }
      },
      _type == "quote" => {
        "type": "quote",
        quote,
        author
      },
      _type == "slider" => {
        "type": "slider",
        "slides": slides[].asset->url,
        text {
          active,
          content
        }
      }
    }
  }
}`;
