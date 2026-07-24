import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: '홈 페이지 문구',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'introTitle',
      type: 'textarea',
      required: true,
      label: '인트로 큰 제목',
      admin: {
        description: '줄바꿈은 Enter로 입력하세요. 사이트에서 줄바꿈으로 표시됩니다.',
      },
    },
    {
      name: 'introDescription',
      type: 'textarea',
      required: true,
      label: '인트로 소개 문구',
      admin: {
        description: '줄바꿈은 Enter로 입력하세요.',
      },
    },
    {
      name: 'introActions',
      type: 'array',
      label: '인트로 링크',
      labels: {
        singular: '링크',
        plural: '링크',
      },
      fields: [
        { name: 'label', type: 'text', required: true, label: '라벨' },
        { name: 'href', type: 'text', required: true, label: '링크' },
      ],
    },
    {
      name: 'linkCards',
      type: 'array',
      label: '하단 링크 카드',
      labels: {
        singular: '카드',
        plural: '카드',
      },
      fields: [
        { name: 'id', type: 'text', label: '관리용 ID' },
        { name: 'eyebrow', type: 'text', required: true, label: '작은 제목' },
        { name: 'title', type: 'text', required: true, label: '카드 제목' },
        { name: 'description', type: 'text', required: true, label: '한 줄 소개' },
        { name: 'href', type: 'text', required: true, label: '링크' },
      ],
    },
  ],
}
