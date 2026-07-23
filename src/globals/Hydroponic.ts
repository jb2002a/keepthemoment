import type { GlobalConfig } from 'payload'

export const Hydroponic: GlobalConfig = {
  slug: 'hydroponic',
  label: '관리법 페이지 문구',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '제목',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: '설명',
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
      label: '이미지 설명',
    },
  ],
}
