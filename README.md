# KEEP THE MOMENT — Premium Houseplant Brand Site

오프라인 관엽식물 매장을 소개하는 반응형 브랜드 프론트엔드입니다.  
장바구니·결제 없이 네이버 스마트스토어로 구매를 연결합니다.

## 기술 스택

- Vite + React + TypeScript
- Sanity CMS (이미지/문구 관리, 자동 반영)
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

## 콘텐츠 수정 (비개발자)

사장님은 Sanity Studio에서 이미지와 글을 수정합니다.

1. `npm run studio` 로 관리자 화면을 엽니다.
2. 히어로 / 식물 / 매장 정보 등을 수정합니다.
3. **Publish** 후 사이트 새로고침하면 반영됩니다.

자세한 설정과 운영 방법은 [`docs/CMS.md`](docs/CMS.md)를 참고하세요.

Sanity가 아직 연결되지 않은 경우에는 로컬 폴백 데이터인 [`src/data/siteData.ts`](src/data/siteData.ts)가 사용됩니다.

## CMS 개발 명령어

```bash
cp .env.example .env.local
npm run seed:sanity   # siteData + public 이미지를 Sanity로 초기 등록
npm run studio        # Sanity Studio
npm run verify:cms    # CMS 로딩/폴백 검증
```

## 구조

```
src/
  components/   # Header, Hero, Collections, BrandStory, PlantCare, PlantItems, Store, Footer
  context/      # SiteContentProvider (Sanity 또는 폴백 데이터)
  data/         # siteData 폴백 + cmsData 로더
  lib/          # Sanity client / GROQ
sanity/
  schemaTypes/  # CMS 스키마
scripts/
  seed-sanity.ts
  verify-cms.ts
```
