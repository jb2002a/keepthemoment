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
    {
      name: 'intro',
      type: 'array',
      label: '소개 문구',
      labels: {
        singular: '문구',
        plural: '문구',
      },
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: '텍스트',
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: '가이드 섹션',
      labels: {
        singular: '섹션',
        plural: '섹션',
      },
      fields: [
        {
          name: 'sectionId',
          type: 'text',
          label: '관리용 ID',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: '섹션 제목',
        },
        {
          name: 'blocks',
          type: 'array',
          label: '본문 블록',
          labels: {
            singular: '블록',
            plural: '블록',
          },
          fields: [
            {
              name: 'blockType',
              type: 'select',
              required: true,
              defaultValue: 'paragraph',
              label: '블록 유형',
              options: [
                { label: '문단', value: 'paragraph' },
                { label: '인용', value: 'quote' },
                { label: '목록', value: 'list' },
              ],
            },
            {
              name: 'text',
              type: 'textarea',
              label: '텍스트',
              admin: {
                condition: (_, siblingData) => siblingData?.blockType !== 'list',
              },
            },
            {
              name: 'items',
              type: 'array',
              label: '목록 항목',
              labels: {
                singular: '항목',
                plural: '항목',
              },
              admin: {
                condition: (_, siblingData) => siblingData?.blockType === 'list',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: '항목 제목',
                },
                {
                  name: 'body',
                  type: 'textarea',
                  required: true,
                  label: '항목 설명',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
