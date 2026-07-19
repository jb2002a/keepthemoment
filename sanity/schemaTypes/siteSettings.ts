import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '사이트 설정',
  type: 'document',
  fields: [
    defineField({
      name: 'navItems',
      title: '네비게이션',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'ID', type: 'string' }),
            defineField({ name: 'label', title: '라벨', type: 'string' }),
            defineField({ name: 'href', title: '링크', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: '푸터 링크',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'ID', type: 'string' }),
            defineField({ name: 'label', title: '라벨', type: 'string' }),
            defineField({ name: 'href', title: '링크', type: 'url' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'naverStoreUrl',
      title: '네이버 스마트스토어 URL',
      type: 'url',
    }),
    defineField({
      name: 'privacyPolicyUrl',
      title: '개인정보처리방침 URL',
      type: 'string',
    }),
  ],
})
