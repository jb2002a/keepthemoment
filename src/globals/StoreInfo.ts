import type { GlobalConfig } from 'payload'
import { objectPositionFields } from '../fields/objectPosition'

export const StoreInfo: GlobalConfig = {
  slug: 'store-info',
  label: '방문/매장 정보',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Visit',
      label: '작은 제목',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Haenggung Store.',
      label: '큰 제목',
    },
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
      label: '영업시간 / 주차',
      admin: {
        description: '예: EVERYDAY / 12:00 – 20:00, PARKING / 장안동공영주차장',
      },
      fields: [
        { name: 'day', type: 'text', required: true, label: '항목' },
        { name: 'time', type: 'text', required: true, label: '내용' },
      ],
    },
    {
      name: 'mapButtonLabel',
      type: 'text',
      defaultValue: 'Map',
      label: '지도 버튼 문구',
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
      admin: {
        description: '모바일 홈 Visit 섹션과 Visit 페이지에 공통으로 표시됩니다.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: '이미지 설명',
    },
    ...objectPositionFields,
  ],
}
