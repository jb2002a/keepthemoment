import { createClient, type SanityClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

function readEnv(name: string): string | undefined {
  const metaEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
  if (metaEnv?.[name]) return metaEnv[name]

  const nodeProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process
  return nodeProcess?.env?.[name]
}

const projectId = readEnv('VITE_SANITY_PROJECT_ID') || readEnv('SANITY_PROJECT_ID')
const dataset =
  readEnv('VITE_SANITY_DATASET') ||
  readEnv('SANITY_DATASET') ||
  'production'
const apiVersion =
  readEnv('VITE_SANITY_API_VERSION') ||
  readEnv('SANITY_API_VERSION') ||
  '2025-01-01'

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id')

let client: SanityClient | null = null

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured || !projectId) return null

  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      // Prefer fresher publishes over long CDN cache for owner edits.
      useCdn: false,
      perspective: 'published',
    })
  }

  return client
}

export function urlFor(source: SanityImageSource) {
  const sanity = getSanityClient()
  if (!sanity) return null
  return createImageUrlBuilder(sanity).image(source)
}
