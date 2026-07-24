import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '공통 설정',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: '데스크톱 상단 메뉴',
      fields: [
        { name: 'id', type: 'text', required: true, label: 'ID' },
        { name: 'label', type: 'text', required: true, label: '라벨' },
        { name: 'href', type: 'text', required: true, label: '링크' },
      ],
    },
    {
      name: 'mobileNavItems',
      type: 'array',
      label: '모바일 메뉴',
      admin: {
        description: '햄버거 메뉴에 표시되는 목록입니다. 데스크톱 메뉴와 다르게 구성할 수 있습니다.',
      },
      fields: [
        { name: 'id', type: 'text', required: true, label: 'ID' },
        { name: 'label', type: 'text', required: true, label: '라벨' },
        { name: 'href', type: 'text', required: true, label: '링크' },
      ],
    },
    {
      name: 'mobileVisitCtaLabel',
      type: 'text',
      defaultValue: 'Visit Store',
      label: '모바일 Visit CTA 문구',
    },
    {
      name: 'mobileVisitCtaHref',
      type: 'text',
      defaultValue: '/#visit',
      label: '모바일 Visit CTA 링크',
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: '푸터 링크',
      fields: [
        { name: 'id', type: 'text', required: true, label: 'ID' },
        { name: 'label', type: 'text', required: true, label: '라벨' },
        { name: 'href', type: 'text', required: true, label: '링크' },
      ],
    },
    {
      name: 'naverStoreUrl',
      type: 'text',
      label: '네이버 스마트스토어 URL',
    },
    {
      name: 'privacyPolicyUrl',
      type: 'text',
      label: '개인정보처리방침 URL',
    },
  ],
}
