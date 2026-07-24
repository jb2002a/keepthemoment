import type {
  Collection,
  FragranceBrand,
  GiftOption,
  HydroponicGuideSection,
  NavItem,
  PlantItem,
  SocialLink,
  StoryBlock,
} from './siteData'
import {
  brand as fallbackBrand,
  collections as fallbackCollections,
  footerLinks as fallbackFooterLinks,
  fragranceBrands as fallbackFragranceBrands,
  fragrancePageContent as fallbackFragrancePageContent,
  giftOptions as fallbackGiftOptions,
  giftPageContent as fallbackGiftPageContent,
  hero as fallbackHero,
  hydroponic as fallbackHydroponic,
  navItems as fallbackNavItems,
  naverStoreUrl as fallbackNaverStoreUrl,
  plantItems as fallbackPlantItems,
  privacyPolicyUrl as fallbackPrivacyPolicyUrl,
  rarePlantItems as fallbackRarePlantItems,
  storeInfo as fallbackStoreInfo,
  storyBlocks as fallbackStoryBlocks,
  storyPageContent as fallbackStoryPageContent,
} from './siteData'

export type SiteContent = {
  brand: {
    name: string
    tagline: string
    shortDescription: string
  }
  navItems: NavItem[]
  hero: {
    images: {
      src: string
      mobileSrc?: string
      alt: string
      mobileOnly?: boolean
      objectPosition?: string
    }[]
  }
  collections: Collection[]
  rarePlantItems: PlantItem[]
  plantItems: PlantItem[]
  storyBlocks: StoryBlock[]
  storyPage: {
    eyebrow: string
    title: string
    lead: string
  }
  fragrancePage: {
    eyebrow: string
    title: string
    lead: string
    note: string
    brands: FragranceBrand[]
  }
  giftPage: {
    eyebrow: string
    title: string
    lead: string
    note: string
    options: GiftOption[]
  }
  hydroponic: {
    title: string
    description: string
    image: string
    alt: string
    intro: string[]
    sections: HydroponicGuideSection[]
  }
  storeInfo: {
    eyebrow: string
    title: string
    name: string
    address: string
    addressDetail: string
    hours: { day: string; time: string }[]
    phone: string
    mapUrl: string
    placeUrl: string
    instagramUrl: string
    image: string
    alt: string
  }
  footerLinks: SocialLink[]
  naverStoreUrl: string
  privacyPolicyUrl: string
  source: 'payload' | 'fallback'
}

export function getFallbackSiteContent(): SiteContent {
  return {
    brand: fallbackBrand,
    navItems: fallbackNavItems,
    hero: fallbackHero,
    collections: fallbackCollections,
    rarePlantItems: fallbackRarePlantItems,
    plantItems: fallbackPlantItems,
    storyBlocks: fallbackStoryBlocks,
    storyPage: fallbackStoryPageContent,
    fragrancePage: {
      ...fallbackFragrancePageContent,
      brands: fallbackFragranceBrands,
    },
    giftPage: {
      ...fallbackGiftPageContent,
      options: fallbackGiftOptions,
    },
    hydroponic: fallbackHydroponic,
    storeInfo: fallbackStoreInfo,
    footerLinks: fallbackFooterLinks,
    naverStoreUrl: fallbackNaverStoreUrl,
    privacyPolicyUrl: fallbackPrivacyPolicyUrl,
    source: 'fallback',
  }
}
