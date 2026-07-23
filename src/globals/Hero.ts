import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: '홈 첫 화면 큰 이미지',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      label: '슬라이드 목록',
      labels: {
        singular: '슬라이드',
        plural: '슬라이드',
      },
      fields: [
        {
          name: 'desktopImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'PC용 이미지',
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
          label: '모바일용 이미지 (선택)',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: '이미지 설명(대체 텍스트)',
        },
        {
          name: 'mobileOnly',
          type: 'checkbox',
          defaultValue: false,
          label: '모바일에서만 보이기',
        },
        {
          name: 'objectPosition',
          type: 'text',
          label: '이미지 위치 조정 (선택)',
        },
      ],
    },
  ],
}
