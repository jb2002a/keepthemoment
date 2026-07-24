# KEEP THE MOMENT — Payload CMS 운영 가이드

사장님이 코드 없이 이미지/문구를 수정하고, 사이트에 거의 바로 반영되도록 Payload CMS를 사용합니다.

## 1. 최초 설정 (개발자, 1회)

1. Neon 또는 Supabase에서 PostgreSQL 데이터베이스를 만듭니다.
2. 루트에 `.env`를 만들고 [`.env.example`](../.env.example) 값을 채웁니다.
   - `DATABASE_URI` — Postgres 연결 문자열
   - `PAYLOAD_SECRET` — 긴 랜덤 문자열
   - `NEXT_PUBLIC_SITE_URL` — 로컬은 `http://localhost:3000`
   - `BLOB_READ_WRITE_TOKEN` — Vercel Blob (배포/Admin 이미지 업로드용, 필수에 가깝음)
3. 의존성 설치 후 시드와 개발 서버를 실행합니다.

```bash
cp .env.example .env
npm install
npm run seed:payload:dry-run
npm run seed:payload
npm run dev
```

4. [http://localhost:3000/admin](http://localhost:3000/admin) 에서 첫 관리자 계정을 만들거나, 시드가 만든 계정을 사용합니다.
   - 기본 시드 계정: `SEED_ADMIN_USERNAME` / `SEED_ADMIN_PASSWORD` (없으면 `keepthemoment` / `keepthemoment`)

## 2. 사장님 사용법

1. 개발자가 알려준 Admin 주소로 접속합니다. 로컬이면 `http://localhost:3000/admin`.
2. 왼쪽 메뉴에서 수정할 항목을 고릅니다.
   - **홈 첫 화면 큰 이미지 (Hero)**: 첫 화면 슬라이드 목록
   - **식물 (Plants)**: 이름, 설명, 관리법, 이미지, 희귀/일상 구분
   - **홈 카테고리 카드 (Collections)**: 홈 화면의 Plants / Fragrance / Gift 카드
     - 이 카드는 홈 화면에만 영향을 줍니다. `/fragrance`, `/gift` 페이지 내용은 아래 Fragrance/Gift 페이지 항목에서 따로 수정합니다.
   - **홈 페이지 문구**: `/` 인트로 제목·소개·링크, 하단 카드
   - **식물(Plants) 페이지 문구**: `/plants` 제목·소개·섹션 제목
   - **향기(Fragrance) 페이지**: `/fragrance` 제목, 소개, 입점 브랜드 로고 목록, 하단 안내
   - **선물(Gift) 페이지**: `/gift` 제목, 소개, 선물 옵션 카드, 하단 안내
   - **브랜드 스토리(Story) 페이지**: `/about` 제목, 소개 문구
   - **브랜드 스토리 이미지**: `/about` 갤러리 이미지 목록
   - **방문/매장 정보**: `/visit` 제목, 주소, 영업시간, 지도/인스타 링크, 매장 사진, 모바일 하단 이미지
   - **관리법 페이지 문구**: `/care` 수경식물 소개·섹션 문구
   - **브랜드 / 공통 설정**: 브랜드명, 상단 메뉴, 푸터 링크, 스토어 URL
3. 이미지 칸에 새 사진을 올리고 문구를 수정합니다.
4. 저장합니다.
5. 사이트 페이지를 새로고침하면 반영됩니다.

## 3. 히어로 모바일 / PC 이미지 다르게 넣기

1. Admin에서 **홈 첫 화면 큰 이미지**를 엽니다.
2. **슬라이드 목록**에서 항목을 추가하거나 순서를 바꿉니다.
3. 슬라이드마다:
   - **모바일에서만 보이기**: 켜면 PC에서는 숨기고 모바일용 이미지만 사용합니다.
   - **PC용 이미지**: 데스크톱에서 보이는 이미지 (공통 슬라이드에서 필수)
   - **모바일용 이미지**: 휴대폰 화면용 이미지 (모바일 전용 슬라이드에서는 필수)
   - **이미지 설명**: 검색/접근성용 문구 (필수)
   - **이미지 위치 조정**: 예 `center 40%` (모르면 비워두세요)
4. 저장 후 사이트를 새로고침합니다.

## 4. 자동 반영 방식

- 사이트는 방문 시 Payload(Postgres)에서 최신 데이터를 읽습니다.
- Admin에서 저장 후 새로고침하면 바로 바뀝니다.
- DB가 없거나 조회가 실패하면 [`src/data/siteData.ts`](../src/data/siteData.ts) 값으로 폴백합니다.

## 5. Vercel 배포 체크리스트

1. Vercel 프로젝트에 환경 변수를 등록합니다.
   - `DATABASE_URI`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
   - `BLOB_READ_WRITE_TOKEN` (권장)
2. Framework Preset은 Next.js입니다. 별도 SPA rewrite는 필요 없습니다.
3. 배포 후 `/admin` 접속 → 로그인 → 콘텐츠 확인.
4. 필요하면 로컬에서 프로덕션 DB를 가리키고 `npm run seed:payload`를 한 번 실행합니다.

## 6. 유용한 명령어

```bash
npm run dev                 # 사이트 + Admin
npm run seed:payload        # siteData + public 이미지를 Payload로 업로드
npm run seed:payload:dry-run
npm run verify:cms
npm run generate:types
npm run generate:importmap
```
