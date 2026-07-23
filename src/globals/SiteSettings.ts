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
      label: '상단 메뉴',
      fields: [
        { name: 'id', type: 'text', required: true, label: 'ID' },
        { name: 'label', type: 'text', required: true, label: '라벨' },
        { name: 'href', type: 'text', required: true, label: '링크' },
      ],
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
