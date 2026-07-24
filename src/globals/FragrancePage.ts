import type { GlobalConfig } from 'payload'
import { objectPositionFields } from '../fields/objectPosition'

export const FragrancePage: GlobalConfig = {
  slug: 'fragrance-page',
  label: '향기(Fragrance) 페이지',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Fragrance',
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
      label: '소개 문구',
    },
    {
      name: 'brands',
      type: 'array',
      required: true,
      minRows: 1,
      label: '입점 프래그런스 브랜드 목록',
      labels: {
        singular: '브랜드',
        plural: '브랜드',
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          label: '관리용 ID',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: '브랜드명',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: '로고 이미지',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: '이미지 설명',
        },
        ...objectPositionFields,
        {
          name: 'href',
          type: 'text',
          required: true,
          label: '연결 링크',
        },
        {
          name: 'logoWidth',
          type: 'text',
          label: '로고 너비 (개발자용)',
        },
        {
          name: 'darkLogo',
          type: 'checkbox',
          defaultValue: false,
          label: '어두운 배경용 로고',
        },
      ],
    },
    {
      name: 'note',
      type: 'textarea',
      label: '하단 안내 문구',
    },
  ],
}
