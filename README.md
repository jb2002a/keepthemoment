# FOLIA — Premium Houseplant Brand Site

오프라인 관엽식물 매장을 소개하는 반응형 브랜드 프론트엔드입니다.  
장바구니·결제 없이 네이버 스마트스토어로 구매를 연결합니다.

## 기술 스택

- Vite + React + TypeScript
- CSS (디자인 토큰 / 반응형 / `prefers-reduced-motion`)
- 폰트: Cormorant Garamond, Pretendard

## 시작하기

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm run lint
```

## 콘텐츠 수정

상품·카테고리·매장·외부 링크는 모두 아래 파일에서 수정합니다.

- [`src/data/siteData.ts`](src/data/siteData.ts)

이미지 플레이스홀더는 각 섹션의 `placeholderLabel`을 참고해 교체하세요.  
`ImagePlaceholder` 컴포넌트에 `aspect-ratio`가 잡혀 있어 레이아웃 시프트를 줄입니다.

## 구조

```
src/
  components/   # Header, Hero, Collections, NewArrivals, BrandStory, PlantCare, Store, Footer
  data/         # 편집 가능한 사이트 데이터
  styles/       # tokens.css, main.css
  App.tsx
```
