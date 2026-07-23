import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Collections } from './collections/Collections'
import { Media } from './collections/Media'
import { Plants } from './collections/Plants'
import { StoryBlocks } from './collections/StoryBlocks'
import { Users } from './collections/Users'
import { Brand } from './globals/Brand'
import { FragrancePage } from './globals/FragrancePage'
import { GiftPage } from './globals/GiftPage'
import { Hero } from './globals/Hero'
import { Hydroponic } from './globals/Hydroponic'
import { SiteSettings } from './globals/SiteSettings'
import { StoreInfo } from './globals/StoreInfo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — KEEP THE MOMENT',
    },
  },
  collections: [Users, Media, Collections, Plants, StoryBlocks],
  globals: [Brand, Hero, FragrancePage, GiftPage, Hydroponic, StoreInfo, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      // Without a token the plugin disables itself and uses local media storage.
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})