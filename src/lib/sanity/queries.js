export const HOME_QUERY = `
*[_type == "homePage" && _id == "homepage"][0]{
  "hero": {
    "background": hero.background.asset->url,
    "title": coalesce(hero.title[$lang], hero.title.ua),
    "text": coalesce(hero.text[$lang], hero.text.ua),
    "button": {
      "text": coalesce(hero.button.text[$lang], hero.button.text.ua),
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
      "alt": coalesce(alt[$lang], alt.ua)
    },
    "title": coalesce(about.title[$lang], about.title.ua),
    "text": coalesce(about.text[$lang], about.text.ua),
    "list": coalesce(about.list[][$lang], about.list[][].ua)
  },
  
"products": {
    "isVisible": products.isVisible,
    "list": products.list[]->{
      // Get only preview group and slug from productDetailsPage
      "name": coalesce(preview.name[$lang], preview.name.ua),
      "description": coalesce(preview.description[$lang], preview.description.ua),
      "slug": slug.current,
      "image": preview.image.asset->url,
      "button": {
        "text": coalesce(preview.buttonText[$lang], preview.buttonText.ua),
        "href": select(
          defined(slug.current) => select(
          $lang == "en" => "/en/products/" + slug.current,
          "/products/" + slug.current),
          "#"
        )
      },
      "characteristics": preview.characteristics[]{
        "title": coalesce(title[$lang], title.ua),
        "value": coalesce(value[$lang], value.ua)
      }
    }
  },
    
  "privilages": {
    "isVisible": privilages.isVisible,
    "title": coalesce(privilages.title[$lang], privilages.title.ua),
    "list": privilages.list[]{
      "title": coalesce(title[$lang], title.ua),
      "text": coalesce(text[$lang], text.ua)
    }
  },
  
  "operations": {
    "isVisible": operations.isVisible,
    "title": coalesce(operations.title[$lang], operations.title.ua),
    "text": coalesce(operations.text[$lang], operations.text.ua),
    "list": operations.list[]{
      "text": coalesce(text[$lang], text.ua),
      "content": content.asset->url,
      "characteristics": coalesce(characteristics[$lang], characteristics.ua)
    }
  },
  
  "quote": {
    "isVisible": quote.isVisible,
    "text": coalesce(quote.text[$lang], quote.text.ua),
    "author": {
      "name": coalesce(quote.author.name[$lang], quote.author.name.ua),
      "position": coalesce(quote.author.position[$lang], quote.author.position.ua),
      "image": quote.author.image.asset->url
    },
    "button": {
      "active": quote.button.active,
      "text": coalesce(quote.button.text[$lang], quote.button.text.ua),
      "href": select($lang == "en" => "/en" + quote.button.href, quote.button.href)
    }
  },
  
  "news": {
    "isVisible": news.isVisible,
    "title": coalesce(news.title[$lang], news.title.ua),
    "list": news.list[]-> {
      "type": {
        "slug": preview.type,
        "text": select(
          preview.type == "news" => select(
            $lang == "en" => "News",
            coalesce("Новини"[$lang], "Новини")
          ),
          preview.type == "interview" => select(
            $lang == "en" => "Interview",
            coalesce("Інтерв'ю"[$lang], "Інтерв'ю")
          ),
          preview.type == "special-project" => select(
            $lang == "en" => "Special Projects",
            coalesce("Спецпроєкти"[$lang], "Спецпроєкти")
          ),
          preview.type == "military-speak" => select(
            $lang == "en" => "Military Speak",
            coalesce("Військові говорять"[$lang], "Військові говорять")
          ),
          select(
            $lang == "en" => "Unknown type",
            coalesce("Невідомий тип"[$lang], "Невідомий тип")
          )
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
      "title": coalesce(preview.title[$lang], preview.title.ua),
      "image": preview.mainImage.asset->url,
      "source": {
        "active": defined(preview.sourceLogo),
        "image": preview.sourceLogo.asset->url
      },
      "date": preview.publishedAt
    },
    "button": {
      "active": news.button.active,
      "text": coalesce(news.button.text[$lang], news.button.text.ua),
      "href": select($lang == "en" => "/en" + news.button.href, news.button.href)
    }
  },
  
  "reviews": {
    "isVisible": reviews.isVisible,
    "title": coalesce(reviews.title[$lang], reviews.title.ua),
    "list": reviews.list[]{
      "text": coalesce(text[$lang], text.ua),
      "author": {
        "position": coalesce(author.position[$lang], author.position.ua)
      }
    }
  }
}
`;

export const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicyPage"][0]{
  "title": coalesce(title[$lang], title.ua),
  "changedDate": coalesce(changedDate[$lang], changedDate.ua),
  "blockContent": coalesce(blockContentNew[$lang], blockContentNew.ua)
}`;

export const BLOG_LIST_QUERY = `
{
  "hero": *[_type == "blogsPage"][0].hero {
    "title": coalesce(title[$lang], title.en, title.ua),
    "text": coalesce(text[$lang], text.en, text.ua),
  },
  "blogList": {
    "titleHotNews": coalesce(*[_type == "blogsPage"][0].blogList.titleHotNews[$lang], *[_type == "blogsPage"][0].blogList.titleHotNews.en, *[_type == "blogsPage"][0].blogList.titleHotNews.ua),
    "list": *[_type == "blogPost" && isVisible == true] | order(_createdAt desc) {
      _id,
      "type": {
        "slug": preview.type,
        "text": select(
          preview.type == "news" => select(
            $lang == "en" => "News",
            coalesce("Новини"[$lang], "Новини")
          ),
          preview.type == "interview" => select(
            $lang == "en" => "Interview",
            coalesce("Інтерв'ю"[$lang], "Інтерв'ю")
          ),
          preview.type == "special-project" => select(
            $lang == "en" => "Special Projects",
            coalesce("Спецпроєкти"[$lang], "Спецпроєкти")
          ),
          preview.type == "military-speak" => select(
            $lang == "en" => "Military Speak",
            coalesce("Військові говорять"[$lang], "Військові говорять")
          ),
          select(
            $lang == "en" => "Unknown type",
            coalesce("Невідомий тип"[$lang], "Невідомий тип")
          )
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
      "title": coalesce(preview.title[$lang], preview.title.en, preview.title.ua),
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

export const POST_QUERY = `
*[_type == "blogPost" && preview.slug.current == $slug][0]{
  _id,
  isVisible,
  "hero": {
    "title": coalesce(preview.title[$lang], preview.title.ua),
    "type": {
      "slug": preview.type,
      "text": select(
          preview.type == "news" => select(
            $lang == "en" => "News",
            coalesce("Новини"[$lang], "Новини")
          ),
          preview.type == "interview" => select(
            $lang == "en" => "Interview",
            coalesce("Інтерв'ю"[$lang], "Інтерв'ю")
          ),
          preview.type == "special-project" => select(
            $lang == "en" => "Special Projects",
            coalesce("Спецпроєкти"[$lang], "Спецпроєкти")
          ),
          preview.type == "military-speak" => select(
            $lang == "en" => "Military Speak",
            coalesce("Військові говорять"[$lang], "Військові говорять")
          ),
          select(
            $lang == "en" => "Unknown type",
            coalesce("Невідомий тип"[$lang], "Невідомий тип")
          )
        )
    },
    "date": coalesce(preview.publishedAt, _createdAt),
    "image": {
      "active": defined(content.hero.image) && defined(content.hero.image.src),
      "src": content.hero.image.src.asset->url,
      "alt": coalesce(content.hero.image.alt[$lang], content.hero.image.alt.ua, content.hero.image.src.alt, "")
    }
  },
  preview {
    "title": coalesce(title[$lang], title.ua),
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
        "alt": coalesce(alt[$lang], alt.ua, src.alt, "")
      }
    },
    sections[] {
      _type == "richText" => {
        "type": "rich-text",
        "text": coalesce(text[$lang], text.ua)
      },
      _type == "video" => {
        "type": "video",
        video {
          "src": src.asset->url,
          "preview": preview.asset->url
        },
        text {
          active,
          "content": coalesce(content[$lang], content.ua)
        }
      },
      _type == "quote" => {
        "type": "quote",
        "quote": coalesce(quote[$lang], quote.ua),
        "author": coalesce(author[$lang], author.ua)
      },
      _type == "slider" => {
        "type": "slider",
        "slides": slides[].asset->url,
        text {
          active,
          "content": coalesce(content[$lang], content.ua)
        }
      }
    }
  }
} 
`;

export const ABOUT_QUERY = `
*[_type == "aboutPage"][0]{
  "hero": {
    "title": coalesce(hero.title[$lang], hero.title.ua),
    "text": coalesce(hero.text[$lang], hero.text.ua),
    "background": hero.background.asset->url
  },
  "about": {
    "text1": {
      "part1": coalesce(about.text1.part1[$lang], about.text1.part1.ua),
      "part2": coalesce(about.text1.part2[$lang], about.text1.part2.ua),
      "link": {
        "image": about.text1.link.image.asset->url,
        "title": coalesce(about.text1.link.title[$lang], about.text1.link.title.ua),
        "text": coalesce(about.text1.link.text[$lang], about.text1.link.text.ua),
        "button": {
          "active": about.text1.link.button.active,
          "text": coalesce(about.text1.link.button.text[$lang], about.text1.link.button.text.ua),
          "link": about.text1.link.button.link
        }
      }
    },
    "text2": coalesce(about.text2[$lang], about.text2.ua),
    "text3": coalesce(about.text3[$lang], about.text3.ua)
  },
  "whoWeAre": {
    "title": coalesce(whoWeAre.title[$lang], whoWeAre.title.ua),
    "list": coalesce(whoWeAre.list[][$lang], whoWeAre.list.ua)
  },
  "importantToUs": {
    "title": coalesce(importantToUs.title[$lang], importantToUs.title.ua),
    "text": coalesce(importantToUs.text[$lang], importantToUs.text.ua),
    "list": importantToUs.list[]{
      "icon": icon.asset->url,
      "text": coalesce(text[$lang], text.ua)
    }
  },
  "whereWeGoing": {
    "title": coalesce(whereWeGoing.title[$lang], whereWeGoing.title.ua),
    "text": coalesce(whereWeGoing.text[$lang], whereWeGoing.text.ua),
  }
}
`;

export const PRODUCT_DETAILS_QUERY = `*[_type == "productDetailsPage" && slug.current == $slug][0]{
  hero {
    "title": coalesce(title[$lang], title.ua),
    "text": coalesce(text[$lang], text.ua),
    characteristicsList[] {
      "title": coalesce(title[$lang], title.ua),
      "text": coalesce(text[$lang], text.ua)
    }
  },
  features {
    isVisible,
    "title": coalesce(title[$lang], title.ua),
    list[] {
      "title": coalesce(title[$lang], title.ua),
      "text": coalesce(text[$lang], text.ua)
    }
  },
  gallery {
    isVisible,
    "title": coalesce(title[$lang], title.ua),
    list[] {
      "content": content.asset->url
    }
  },
  keyBenefits {
    isVisible,
    "title": coalesce(title[$lang], title.ua),
    "text": coalesce(text[$lang], text.ua),
    list[] {
      "title": coalesce(title[$lang], title.ua),
      "icon": icon.asset->url
    },
    "image": image.asset->url
  },
  characteristics {
    isVisible,
    "title": coalesce(title[$lang], title.ua),
    "text": coalesce(text[$lang], text.ua),
    table[] {
      type,
      "title": coalesce(title[$lang], title.ua),
      "value": coalesce(value[$lang], value.ua),
      "subtitle": coalesce(subtitle[$lang], subtitle.ua),
      lines[] {
        "title": coalesce(title[$lang], title.ua),
        "value": coalesce(value[$lang], value.ua)
      }
    },
    notes {
      active,
      "title": coalesce(title[$lang], title.ua),
      "list": coalesce(list[][$lang], list[][].ua)
    }
  },
  equipment {
    isVisible,
    "title": coalesce(equipment.title[$lang], equipment.title.ua),
    "text": coalesce(equipment.text[$lang], equipment.text.ua),
    list[] {
      "title": coalesce(title[$lang], title.ua),
      "image": image.asset->url
    }
  },
  "slug": slug.current
}`;
