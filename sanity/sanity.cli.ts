import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const studioHost = process.env.SANITY_STUDIO_HOSTNAME || 'keepthemoment'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost,
})
