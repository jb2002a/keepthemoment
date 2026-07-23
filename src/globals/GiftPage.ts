import type { GlobalConfig } from 'payload'

export const GiftPage: GlobalConfig = {
  slug: 'gift-page',
  label: '선물(Gift) 페이지',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Gift',
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
      name: 'options',
      type: 'array',
      required: true,
      minRows: 1,
      label: '선물 옵션 카드 목록',
      labels: {
        singular: '옵션 카드',
        plural: '옵션 카드',
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          label: '관리용 ID',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: '카드 제목',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: '이미지',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: '이미지 설명',
        },
        {
          name: 'copy',
          type: 'textarea',
          required: true,
          label: '설명 문구',
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
