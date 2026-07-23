import type { GlobalConfig } from 'payload'

export const StoreInfo: GlobalConfig = {
  slug: 'store-info',
  label: '방문/매장 정보',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '매장명',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: '주소 (한글)',
    },
    {
      name: 'addressDetail',
      type: 'text',
      label: '주소 (영문)',
    },
    {
      name: 'hours',
      type: 'array',
      label: '영업시간',
      fields: [
        { name: 'day', type: 'text', required: true, label: '요일' },
        { name: 'time', type: 'text', required: true, label: '시간' },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      label: '전화번호',
    },
    {
      name: 'mapUrl',
      type: 'text',
      label: '지도 URL',
    },
    {
      name: 'placeUrl',
      type: 'text',
      label: '네이버 플레이스 URL',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: '인스타그램 URL',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: '매장 이미지',
    },
    {
      name: 'alt',
      type: 'text',
      label: '이미지 설명',
    },
  ],
}
