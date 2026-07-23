import { getFallbackSiteContent } from '../src/data/siteContent'
import { loadSiteContent, mapPayloadContent } from '../src/data/cmsData'

async function main() {
  const fallback = getFallbackSiteContent()
  console.log(`[verify] fallback source=${fallback.source} brand=${fallback.brand.name}`)
  console.log(
    `[verify] fallback counts plants=${fallback.plantItems.length} rare=${fallback.rarePlantItems.length} collections=${fallback.collections.length}`,
  )

  const mappedEmpty = mapPayloadContent({
    brand: null,
    hero: null,
    fragrancePage: null,
    giftPage: null,
    hydroponic: null,
    storeInfo: null,
    siteSettings: null,
    collections: [],
    plants: [],
    storyBlocks: [],
  })
  console.log(`[verify] empty map source=${mappedEmpty.source}`)

  const live = await loadSiteContent()
  console.log(`[verify] live source=${live.source} brand=${live.brand.name}`)
  console.log(
    `[verify] live counts plants=${live.plantItems.length} rare=${live.rarePlantItems.length} collections=${live.collections.length}`,
  )
  console.log(
    `[verify] store hours=${live.storeInfo.hours.length} footerLinks=${live.footerLinks.length}`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
