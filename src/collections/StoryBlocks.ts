import type { CollectionConfig } from 'payload'

export const StoryBlocks: CollectionConfig = {
  slug: 'story-blocks',
  labels: {
    singular: '브랜드 스토리 이미지',
    plural: '브랜드 스토리 이미지',
  },
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'size', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: '관리용 ID',
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
    {
      name: 'size',
      type: 'select',
      required: true,
      defaultValue: 'wide',
      label: '레이아웃 크기',
      options: [
        { label: '와이드', value: 'wide' },
        { label: '세로', value: 'portrait' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: '표시 순서',
    },
  ],
}
