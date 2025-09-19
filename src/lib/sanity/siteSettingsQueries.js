export const FOOTER_SETTINGS_QUERY = `*[_type == "footerSettings"][0]{
  "navigation": {
    "pages": {
      "title": coalesce(pages.title[$lang], pages.title.ua),
      "items": pages.items[]{
        "text": coalesce(text[$lang], text.ua),
        "href": coalesce(href[$lang], href.ua, href)
      }
    },
    "contact": {
      "title": coalesce(contact.title[$lang], contact.title.ua),
      "items": contact.items[]{
        "text": text,
        "href": href
      },
      "socials": contact.socials[]{
        "icon": icon.asset->url,
        "href": href
      }
    },
    "other": {
      "title": coalesce(other.title[$lang], other.title.ua),
      "items": other.items[]{
        "text": coalesce(text[$lang], text.ua),
        "href": coalesce(href[$lang], href.ua, href)
      },
      "madeBy": {
        "text": coalesce(other.madeBy.text[$lang], other.madeBy.text.ua),
        "href": coalesce(other.madeBy.href[$lang], other.madeBy.href.ua)
      }
    }
  }
}`;

export const CONTACT_SETTINGS_QUERY = `*[_type == "contactSettings"][0]{
  "top": {
    "title": coalesce(top.title[$lang], top.title.ua),
    "text": coalesce(top.text[$lang], top.text.ua)
  },
  "form": {
    "sucessText": {
      "text": coalesce(successText.text[$lang], successText.text.ua),
      "subText": coalesce(successText.subText[$lang], successText.subText.ua),
      "buttonText": coalesce(successText.buttonText[$lang], successText.buttonText.ua)
    },
    "name": {
      "text": coalesce(name.text[$lang], name.text.ua),
      "requiredErrorText": coalesce(name.requiredErrorText[$lang], name.requiredErrorText.ua),
      "validationErrorText": coalesce(name.validationErrorText[$lang], name.validationErrorText.ua)
    },
    "company": {
      "text": coalesce(company.text[$lang], company.text.ua),
      "requiredErrorText": coalesce(company.requiredErrorText[$lang], company.requiredErrorText.ua)
    },
    "country": {
      "text": coalesce(country.text[$lang], country.text.ua),
      "requiredErrorText": coalesce(country.requiredErrorText[$lang], country.requiredErrorText.ua),
      "list": country.list[]{
        "text": coalesce(text[$lang], text.ua),
        "value": value
      }
    },
    "industry": {
      "text": coalesce(industry.text[$lang], industry.text.ua),
      "requiredErrorText": coalesce(industry.requiredErrorText[$lang], industry.requiredErrorText.ua),
      "list": industry.list[]{
        "text": coalesce(text[$lang], text.ua),
        "value": value
      }
    },
    "email": {
      "text": coalesce(email.text[$lang], email.text.ua),
      "requiredErrorText": coalesce(email.requiredErrorText[$lang], email.requiredErrorText.ua),
      "validationErrorText": coalesce(email.validationErrorText[$lang], email.validationErrorText.ua)
    },
    "phone": {
      "text": coalesce(phone.text[$lang], phone.text.ua),
      "requiredErrorText": coalesce(phone.requiredErrorText[$lang], phone.requiredErrorText.ua),
      "validationErrorText": coalesce(phone.validationErrorText[$lang], phone.validationErrorText.ua)
    },
    "message": {
      "text": coalesce(message.text[$lang], message.text.ua),
      "requiredErrorText": coalesce(message.requiredErrorText[$lang], message.requiredErrorText.ua)
    },
    "sendButtonText": coalesce(sendButtonText[$lang], sendButtonText.ua)
  }
}`;

// Job Contact Settings Query
export const JOB_CONTACT_SETTINGS_QUERY = `*[_type == "jobContactSettings"][0]{
  "top": {
    "title": coalesce(top.title[$lang], top.title.ua),
    "text": coalesce(top.text[$lang], top.text.ua)
  },
  "form": {
    "sucessText": {
      "text": coalesce(successText.text[$lang], successText.text.ua),
      "subText": coalesce(successText.subText[$lang], successText.subText.ua),
      "buttonText": coalesce(successText.buttonText[$lang], successText.buttonText.ua)
    },
    "name": {
      "text": coalesce(name.text[$lang], name.text.ua),
      "requiredErrorText": coalesce(name.requiredErrorText[$lang], name.requiredErrorText.ua),
      "validationErrorText": coalesce(name.validationErrorText[$lang], name.validationErrorText.ua)
    },
    "surname": {
      "text": coalesce(surname.text[$lang], surname.text.ua),
      "requiredErrorText": coalesce(surname.requiredErrorText[$lang], surname.requiredErrorText.ua),
      "validationErrorText": coalesce(surname.validationErrorText[$lang], surname.validationErrorText.ua)
    },
    "email": {
      "text": coalesce(email.text[$lang], email.text.ua),
      "requiredErrorText": coalesce(email.requiredErrorText[$lang], email.requiredErrorText.ua),
      "validationErrorText": coalesce(email.validationErrorText[$lang], email.validationErrorText.ua)
    },
    "phone": {
      "text": coalesce(phone.text[$lang], phone.text.ua),
      "requiredErrorText": coalesce(phone.requiredErrorText[$lang], phone.requiredErrorText.ua),
      "validationErrorText": coalesce(phone.validationErrorText[$lang], phone.validationErrorText.ua)
    },
    "position": {
      "text": coalesce(position.text[$lang], position.text.ua),
      "requiredErrorText": coalesce(position.requiredErrorText[$lang], position.requiredErrorText.ua)
    },
    "cvFile": {
      "text": coalesce(cvFile.text[$lang], cvFile.text.ua),
      "requiredErrorText": coalesce(cvFile.requiredErrorText[$lang], cvFile.requiredErrorText.ua),
      "validationErrorText": coalesce(cvFile.validationErrorText[$lang], cvFile.validationErrorText.ua),
      "sizeErrorText": coalesce(cvFile.sizeErrorText[$lang], cvFile.sizeErrorText.ua),
      "buttonText": coalesce(cvFile.buttonText[$lang], cvFile.buttonText.ua)
    },
    "message": {
      "text": coalesce(message.text[$lang], message.text.ua)
    },
    "submitButton": {
      "text": coalesce(submitButton.text[$lang], submitButton.text.ua)
    }
  }
}`;

export const HEADER_SETTINGS_QUERY = `*[_type == "headerSettings"][0]{
  "navList": navList[]{
    "text": coalesce(text[$lang], text.ua),
    "href": coalesce(href[$lang], href.ua)
  }
}`;

export const SITE_SETTINGS_QUERY = `{
  "contactForm": ${CONTACT_SETTINGS_QUERY},
  "jobContactForm": ${JOB_CONTACT_SETTINGS_QUERY},
  "header": ${HEADER_SETTINGS_QUERY},
  "footer": ${FOOTER_SETTINGS_QUERY}
}`