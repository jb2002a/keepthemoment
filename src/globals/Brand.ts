import type { GlobalConfig } from 'payload'

export const Brand: GlobalConfig = {
  slug: 'brand',
  label: '브랜드 기본 문구',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '브랜드명',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: '태그라인',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: '짧은 소개',
    },
  ],
}
