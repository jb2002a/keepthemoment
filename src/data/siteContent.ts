import type {
  Collection,
  NavItem,
  PlantItem,
  SocialLink,
  StoryBlock,
} from './siteData'
import {
  brand as fallbackBrand,
  collections as fallbackCollections,
  footerLinks as fallbackFooterLinks,
  hero as fallbackHero,
  hydroponic as fallbackHydroponic,
  navItems as fallbackNavItems,
  naverStoreUrl as fallbackNaverStoreUrl,
  plantItems as fallbackPlantItems,
  privacyPolicyUrl as fallbackPrivacyPolicyUrl,
  rarePlantItems as fallbackRarePlantItems,
  storeInfo as fallbackStoreInfo,
  storyBlocks as fallbackStoryBlocks,
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
      alt: string
    }[]
  }
  collections: Collection[]
  rarePlantItems: PlantItem[]
  plantItems: PlantItem[]
  storyBlocks: StoryBlock[]
  hydroponic: {
    title: string
    description: string
    image: string
    alt: string
  }
  storeInfo: {
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
  source: 'sanity' | 'fallback'
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
    hydroponic: fallbackHydroponic,
    storeInfo: fallbackStoreInfo,
    footerLinks: fallbackFooterLinks,
    naverStoreUrl: fallbackNaverStoreUrl,
    privacyPolicyUrl: fallbackPrivacyPolicyUrl,
    source: 'fallback',
  }
}
