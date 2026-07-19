# KEEP THE MOMENT — Sanity CMS 운영 가이드

사장님이 코드 없이 이미지/문구를 수정하고, 사이트에 거의 바로 반영되도록 Sanity를 사용합니다.

## 1. Sanity 프로젝트 만들기 (최초 1회, 개발자)

1. [sanity.io/manage](https://www.sanity.io/manage)에서 로그인 후 새 프로젝트를 만듭니다.
2. Dataset는 `production`을 사용합니다.
3. API > Tokens에서 **Editor** 또는 **Admin** write token을 발급합니다.
4. API > CORS origins에 사이트 주소를 추가합니다.
   - 로컬: `http://localhost:5173`
   - 배포: `https://keepthemoment-one.vercel.app`
   - `Allow credentials`는 읽기 전용 공개 조회면 꺼도 됩니다.
5. 루트에 `.env` / `.env.local`을 만들고 [`.env.example`](../.env.example) 값을 채웁니다.
6. Studio에도 같은 project id를 넣습니다.

```bash
cp .env.example .env.local
# project id / token 입력 후

npm run seed:sanity:dry-run   # 이미지 경로/문서 구조 사전 검증
npm run seed:sanity           # 실제 Sanity로 업로드
npm run studio
```

7. Studio에서 문서가 보이면 프론트를 실행합니다.

```bash
npm run dev
```

## 2. 사장님 사용법

1. 개발자가 알려준 Studio 주소로 접속합니다. 로컬이면 `http://localhost:3333`.
2. 왼쪽 메뉴에서 수정할 항목을 고릅니다.
   - **히어로**: 메인 이미지
   - **식물**: 이름, 설명, 관리법, 이미지, 희귀/일상 구분
   - **컬렉션**: Plants / Fragrance / Gift
   - **매장 정보**: 주소, 영업시간, 지도 링크, 매장 사진
   - **브랜드 / 사이트 설정**: 브랜드명, 네비, 푸터 링크
3. 이미지 칸에 새 사진을 올리고 문구를 수정합니다.
4. 오른쪽 위 **Publish**를 누릅니다.
5. 사이트 페이지를 새로고침하면 반영됩니다.

## 3. 자동 반영 방식

- 사이트는 빌드 시점에 내용을 고정하지 않고, 방문 시 Sanity에서 최신 published 데이터를 읽습니다.
- 따라서 Studio에서 Publish 후 새로고침하면 바로 바뀝니다.
- Sanity가 없거나 조회가 실패하면 기존 [`src/data/siteData.ts`](../src/data/siteData.ts) 값으로 폴백합니다.

## 4. 유용한 명령어

```bash
npm run studio          # Sanity Studio 실행
npm run seed:sanity     # 현재 siteData + public 이미지를 Sanity로 업로드
npm run dev             # 사이트 실행
```
