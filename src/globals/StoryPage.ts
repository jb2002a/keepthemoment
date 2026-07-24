import type { GlobalConfig } from 'payload'

export const StoryPage: GlobalConfig = {
  slug: 'story-page',
  label: '브랜드 스토리(Story) 페이지',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our Story',
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
  ],
}
