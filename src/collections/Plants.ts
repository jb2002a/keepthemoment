import type { CollectionConfig } from 'payload'

export const Plants: CollectionConfig = {
  slug: 'plants',
  labels: {
    singular: '식물 카드',
    plural: '식물',
  },
  admin: {
    useAsTitle: 'koreanName',
    defaultColumns: ['koreanName', 'name', 'category', 'order'],
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
      name: 'name',
      type: 'text',
      required: true,
      label: '영문명',
    },
    {
      name: 'koreanName',
      type: 'text',
      required: true,
      label: '한글명',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'everyday',
      label: '카테고리',
      options: [
        { label: '희귀 관엽 (Rare)', value: 'rare' },
        { label: '일상 식물 (Everyday)', value: 'everyday' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: '식물 이미지',
    },
    {
      name: 'alt',
      type: 'text',
      label: '이미지 설명',
    },
    {
      name: 'tagline',
      type: 'textarea',
      required: true,
      label: '한 줄 설명',
    },
    {
      name: 'features',
      type: 'array',
      label: '특징',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: '특징',
        },
      ],
    },
    {
      name: 'care',
      type: 'group',
      label: '관리법',
      fields: [
        { name: 'light', type: 'text', label: '빛' },
        { name: 'water', type: 'text', label: '물' },
        { name: 'temperature', type: 'text', label: '온도' },
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
