# KEEP THE MOMENT — Premium Houseplant Brand Site

오프라인 관엽식물 매장을 소개하는 반응형 브랜드 사이트입니다.  
장바구니·결제 없이 네이버 스마트스토어로 구매를 연결합니다.

## 기술 스택

- Next.js + React + TypeScript
- Payload CMS 3 (PostgreSQL, Admin UI `/admin`)
- CSS (디자인 토큰 / 반응형 / `prefers-reduced-motion`)
- 폰트: Cormorant Garamond, Pretendard
- 배포: Vercel + Neon/Supabase Postgres (+ 선택적 Vercel Blob)

## 시작하기

1. [`.env.example`](.env.example)을 복사해 `.env`를 만듭니다.
2. `DATABASE_URI`, `PAYLOAD_SECRET`을 채웁니다.
3. 의존성 설치 후 개발 서버를 실행합니다.

```bash
cp .env.example .env
npm install
npm run dev
```

- 사이트: [http://localhost:3000](http://localhost:3000)
- CMS Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

```bash
npm run build
npm run start
npm run lint
```

## 콘텐츠 수정 (비개발자)

사장님은 Payload Admin에서 이미지와 글을 수정합니다.

1. `/admin` 으로 관리자 화면을 엽니다.
2. Globals / Collections에서 히어로, 식물, 매장 정보 등을 수정합니다.
3. 저장 후 사이트 새로고침하면 반영됩니다.

자세한 설정과 운영 방법은 [`docs/CMS.md`](docs/CMS.md)를 참고하세요.

DB가 아직 연결되지 않았거나 조회가 실패하면 [`src/data/siteData.ts`](src/data/siteData.ts) 폴백 데이터가 사용됩니다.

## CMS 개발 명령어

```bash
cp .env.example .env
npm run seed:payload:dry-run   # 이미지 경로/구조 사전 검증
npm run seed:payload           # siteData + public 이미지를 Payload로 초기 등록
npm run verify:cms             # CMS 로딩/폴백 검증
npm run generate:types         # Payload 타입 생성
npm run generate:importmap     # Admin import map 생성
```

## Vercel 배포

1. Neon 또는 Supabase에서 Postgres를 만들고 `DATABASE_URI`를 발급합니다.
2. Vercel 프로젝트 Environment Variables에 다음을 넣습니다.
   - `DATABASE_URI`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (예: `https://www.keepthemoment.kr`)
   - (권장) `BLOB_READ_WRITE_TOKEN` — Vercel Blob로 미디어 영구 저장
3. 배포 후 `/admin`에서 관리자 계정을 만들고, 필요하면 `npm run seed:payload`를 로컬/CI에서 한 번 실행합니다.

## 구조

```
src/
  app/
    (frontend)/   # 공개 사이트 라우트
    (payload)/    # Payload Admin + REST/GraphQL API
  collections/    # Payload collections
  globals/        # Payload globals
  components/     # Header, Hero, Collections, ...
  context/        # SiteContentProvider
  data/           # siteData 폴백 + cmsData 로더
scripts/
  seed-payload.ts
  verify-cms.ts
```
