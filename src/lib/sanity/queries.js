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
  "privileges": {
    "title": privileges.title,
    "list": privileges.list[]{
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
    "list": news.list[]{
      "type": {
        "slug": type.slug,
        "text": type.text
      },
      "link": {
        "type": link.type,
        "slug": link.slug
      },
      "title": title,
      "image": image.asset->url,
      "source": {
        "active": source.active,
        "image": source.image.asset->url
      }
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
