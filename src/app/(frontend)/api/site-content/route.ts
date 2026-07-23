import { NextResponse } from 'next/server'
import { loadSiteContent } from '@/data/cmsData'

export const dynamic = 'force-dynamic'

export async function GET() {
  const content = await loadSiteContent()
  return NextResponse.json(content)
}
