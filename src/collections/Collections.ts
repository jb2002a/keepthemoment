import type { CollectionConfig } from 'payload'
import { objectPositionFields } from '../fields/objectPosition'

export const Collections: CollectionConfig = {
  slug: 'collections',
  labels: {
    singular: '홈 카테고리 카드',
    plural: '홈 카테고리 카드',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
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
      admin: {
        description: '개발자가 구분할 때 쓰는 값입니다. 보통 수정하지 않아도 됩니다.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '카드 제목',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: '한 줄 소개 (PC)',
    },
    {
      name: 'mobileTagline',
      type: 'text',
      label: '한 줄 소개 (모바일)',
      admin: {
        description: '비워두면 PC용 한 줄 소개를 그대로 사용합니다.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: '카드 이미지',
    },
    {
      name: 'alt',
      type: 'text',
      label: '이미지 설명',
    },
    ...objectPositionFields,
    {
      name: 'aspectRatio',
      type: 'text',
      defaultValue: '3 / 4',
      label: '비율',
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      label: '링크',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: '표시 순서',
      admin: {
        description: '숫자가 작을수록 먼저 보입니다.',
      },
    },
  ],
}
