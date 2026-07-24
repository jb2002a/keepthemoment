import type { GlobalConfig } from 'payload'

export const PlantsPage: GlobalConfig = {
  slug: 'plants-page',
  label: '식물(Plants) 페이지 문구',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Plants',
      label: '작은 제목',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '큰 제목',
    },
    {
      name: 'lead',
      type: 'textarea',
      required: true,
      label: '소개 문구 (PC)',
    },
    {
      name: 'leadMobile',
      type: 'textarea',
      required: true,
      label: '소개 문구 (모바일)',
    },
    {
      name: 'rareEyebrow',
      type: 'text',
      label: '희귀 섹션 작은 제목',
    },
    {
      name: 'rareTitle',
      type: 'text',
      required: true,
      label: '희귀 섹션 제목',
    },
    {
      name: 'rareCopy',
      type: 'textarea',
      label: '희귀 섹션 설명',
    },
    {
      name: 'everydayEyebrow',
      type: 'text',
      label: '일상 섹션 작은 제목',
    },
    {
      name: 'everydayTitle',
      type: 'text',
      required: true,
      label: '일상 섹션 제목',
    },
  ],
}
