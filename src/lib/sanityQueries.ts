export const siteContentQuery = `{
  "brand": *[_type == "brand" && _id == "brand"][0]{
    name,
    tagline,
    shortDescription
  },
  "hero": *[_type == "hero" && _id == "hero"][0]{
    alt,
    "imageUrl": image.asset->url,
    image
  },
  "collections": *[_type == "collection"] | order(order asc){
    "id": slug.current,
    name,
    tagline,
    alt,
    aspectRatio,
    href,
    "imageUrl": image.asset->url,
    image
  },
  "plants": *[_type == "plantItem"] | order(order asc){
    "id": slug.current,
    name,
    koreanName,
    category,
    alt,
    tagline,
    features,
    care,
    "imageUrl": image.asset->url,
    image
  },
  "storyBlocks": *[_type == "storyBlock"] | order(order asc){
    "id": slug.current,
    alt,
    size,
    "imageUrl": image.asset->url,
    image
  },
  "hydroponic": *[_type == "hydroponic" && _id == "hydroponic"][0]{
    title,
    description,
    alt,
    "imageUrl": image.asset->url,
    image
  },
  "storeInfo": *[_type == "storeInfo" && _id == "storeInfo"][0]{
    name,
    address,
    addressDetail,
    hours,
    phone,
    mapUrl,
    placeUrl,
    instagramUrl,
    alt,
    "imageUrl": image.asset->url,
    image
  },
  "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    navItems,
    footerLinks,
    naverStoreUrl,
    privacyPolicyUrl
  }
}`
