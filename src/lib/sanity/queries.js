export const HOME_QUERY = `*[_type == "homePage" && _id == $pageId][0]{
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
    "isVisible": about.isVisible,
    "logos": about.logos[]{
      "src": src.asset->url,
      "alt": alt
    },
    "title": about.title,
    "text": about.text,
    "list": about.list
  },
  "products": {
    "isVisible": products.isVisible,
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
    "isVisible": privilages.isVisible,
    "title": privilages.title,
    "list": privilages.list[]{
      "title": title,
      "text": text
    }
  },
  "operations": {
    "isVisible": operations.isVisible,
    "title": operations.title,
    "text": operations.text,
    "list": operations.list[]{
      "text": text,
      "content": content.asset->url,
      "characteristics": characteristics
    }
  },
  "quote": {
    "isVisible": quote.isVisible,
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
    "isVisible": news.isVisible,
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
    "isVisible": reviews.isVisible,
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
  "title": coalesce(title[$lang], title.ua),
  "changedDate": coalesce(changedDate[$lang], changedDate.ua),
  "blockContent": coalesce(blockContentNew[$lang], blockContentNew.ua)
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
    "list": *[_type == "blogPost" && isVisible == true] | order(_createdAt desc) {
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

export const ABOUT_QUERY = `*[_type == "aboutPage"][0]{
  "hero": {
    "title": hero.title,
    "text": hero.text,
    "background": hero.background.asset->url
  },
  "about": {
    "text1": {
      "part1": about.text1.part1,
      "part2": about.text1.part2,
      "link": {
        "image": about.text1.link.image.asset->url,
        "title": about.text1.link.title,
        "text": about.text1.link.text,
        "button": {
          "active": about.text1.link.button.active,
          "text": about.text1.link.button.text,
          "link": about.text1.link.button.link
        }
      }
    },
    "text2": about.text2,
    "text3": about.text3
  },
  "whoWeAre": {
    "title": whoWeAre.title,
    "list": whoWeAre.list
  },
  "importantToUs": {
    "title": importantToUs.title,
    "text": importantToUs.text,
    "list": importantToUs.list[]{
      "icon": icon.asset->url,
      "text": text
    }
  },
  "whereWeGoing": {
    "title": whereWeGoing.title,
    "text": whereWeGoing.text,
  }
}`;

export const PRODUCT_DETAILS_QUERY = `*[_type == "productDetailsPage" && slug.current == $slug][0]{
  hero {
    "title": title[$lang],
    "text": text[$lang],
    characteristicsList[] {
      "title": title[$lang],
      "text": text[$lang]
    }
  },
  features {
    isVisible,
    "title": title[$lang],
    list[] {
      "title": title[$lang],
      "text": text[$lang]
    }
  },
  gallery {
    isVisible,
    "title": title[$lang],
    list[] {
      "content": content.asset->url
    }
  },
  keyBenefits {
    isVisible,
    "title": title[$lang],
    "text": text[$lang],
    list[] {
      "title": title[$lang],
      "icon": icon.asset->url
    },
    "image": image.asset->url
  },
  characteristics {
    isVisible,
    "title": title[$lang],
    "text": text[$lang],
    table[] {
      type,
      "title": title[$lang],
      "value": value[$lang],
      "subtitle": subtitle[$lang],
      lines[] {
        "title": title[$lang],
        "value": value[$lang]
      }
    },
    notes {
      active,
      "title": title[$lang],
      "list": list[][$lang]
    }
  },
  equipment {
    isVisible,
    "title": equipment.title[$lang],
    "text": equipment.text[$lang],
    list[] {
      "title": title[$lang],
      "image": image.asset->url
    }
  },
  "slug": slug.current
}`;
