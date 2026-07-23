import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: '공통 설정',
  type: 'document',
  fields: [
    defineField({
      name: 'navItems',
      title: '상단 메뉴',
      description: '모든 페이지 상단에 보이는 메뉴입니다. 보통 항목 추가보다 라벨 수정에 사용합니다.',
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
      description: '사이트 하단에 보이는 링크입니다.',
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
      description: '온라인 스토어 버튼이나 링크에 연결할 주소입니다.',
      type: 'url',
    }),
    defineField({
      name: 'privacyPolicyUrl',
      title: '개인정보처리방침 URL',
      description: '개인정보처리방침 페이지나 앵커 주소입니다.',
      type: 'string',
    }),
  ],
})
