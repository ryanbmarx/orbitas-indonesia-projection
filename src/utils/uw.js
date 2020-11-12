// uw utils

/* helper to make a UW response */
export function UW({
  title = "",
  description = "",
  url = "",
  html = "",
  styles = [],
  scripts = [],
  meta = [],
  share_image = "",
  share_text = "",
  jsonld,
  ssts
}) {
  const uw = {
    type: "rich",
    url,
    html,
    jsonld
  };

  let links = styles.map(href => {
    return {
      rel: "stylesheet",
      href
    };
  });

  links.push({
    rel: "canonical",
    href: url
  });

  uw.tags = {
    title,
    script: scripts.map(src => {
      return {
        type: "text/javascript",
        src
      };
    }),

    link: links,

    meta: [
      {
        name: "og:type",
        content: "article"
      },
      {
        name: "og:url",
        content: url
      },
      {
        name: "description",
        content: description
      },
      {
        name: "og:description",
        content: description
      },
      {
        name: "twitter:description",
        content: description
      },
      {
        name: "og:title",
        content: share_text || title
      },
      {
        name: "twitter:title",
        content: share_text || title
      },
      {
        name: "og:image",
        content: share_image
      },
      {
        name: "twitter:image",
        content: share_image
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "twitter:site",
        content: "usatoday"
      },
      ...meta
    ]
  };

  // Going off of what we set for in-depth articles
  // https://github.com/GannettDigital/lab-microservices/blob/staging/controllers/longform.go#L797
  uw.meta = {
    url: url,
    short_url: url,
    mobile_url: url,
    page_url: url,
    ssts,
    headline: title // this sets prop44 i think

    // ignored fields, but technically supported
    // 'cst': '', // ?
    // 'datePublished': '' , // do we wamt to do this?
    // 'contentId': -1, // not needed
    // 'author': '', // can we do this for all chunks?
  };

  return uw;
}
