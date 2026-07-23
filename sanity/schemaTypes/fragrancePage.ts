import { defineArrayMember, defineField, defineType } from 'sanity'

export const fragrancePage = defineType({
  name: 'fragrancePage',
  title: '향기(Fragrance) 페이지',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: '작은 제목',
      type: 'string',
      initialValue: 'Fragrance',
    }),
    defineField({
      name: 'title',
      title: '큰 제목',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lead',
      title: '소개 문구',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brands',
      title: '입점 프래그런스 브랜드 목록',
      description: '카드를 드래그해서 순서를 바꿀 수 있습니다.',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'fragranceBrand',
          title: '브랜드',
          fields: [
            defineField({
              name: 'name',
              title: '브랜드명',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: '로고 이미지',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: '이미지 설명(대체 텍스트)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: '연결 링크',
              description: '브랜드 카드를 눌렀을 때 이동하는 공식 사이트 주소입니다.',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logoWidth',
              title: '로고 너비 (개발자용)',
              description: '로고 글자 크기를 맞추기 위한 값입니다. 예: "9rem". 잘 모르면 비워두세요.',
              type: 'string',
            }),
            defineField({
              name: 'darkLogo',
              title: '어두운 배경용 로고',
              description: '로고가 밝은 색이라 카드 배경을 어둡게 해야 할 때 켜주세요.',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'note',
      title: '하단 안내 문구',
      type: 'text',
      rows: 2,
    }),
  ],
})
