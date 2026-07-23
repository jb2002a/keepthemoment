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
   - **히어로**: 첫 화면 슬라이드 목록 (아래 참고)
   - **식물**: 이름, 설명, 관리법, 이미지, 희귀/일상 구분
   - **컬렉션**: 홈 화면의 Plants / Fragrance / Gift **카드** (이미지, 제목, 한 줄 소개)
     - ⚠️ 이 카드는 홈 화면에만 영향을 줍니다. `/fragrance`, `/gift` 페이지 자체의 내용은 아래 **향기 페이지 내용**, **선물 페이지 내용** 항목에서 따로 수정합니다.
     - Plants 카드를 누르면 이동하는 식물 목록 페이지는 위 **식물** 항목으로 CMS 편집이 반영됩니다.
   - **향기 페이지 내용**: `/fragrance` 페이지의 제목, 소개 문구, 입점 브랜드 로고 목록(순서 포함), 하단 안내 문구
   - **선물 페이지 내용**: `/gift` 페이지의 제목, 소개 문구, 선물 옵션 카드 목록(순서 포함), 하단 안내 문구
   - **매장 정보**: 주소, 영업시간, 지도 링크, 매장 사진
   - **브랜드 / 사이트 설정**: 브랜드명, 네비, 푸터 링크
3. 이미지 칸에 새 사진을 올리고 문구를 수정합니다.
4. 오른쪽 위 **Publish**를 누릅니다.
5. 사이트 페이지를 새로고침하면 반영됩니다.

## 3. 히어로(첫 화면) 모바일 / PC 이미지 다르게 넣기

히어로는 여러 장의 슬라이드로 구성되고, 슬라이드마다 PC용/모바일용 이미지를 따로 넣을 수 있습니다.

1. Studio에서 **히어로** 문서를 엽니다.
2. **슬라이드 목록**에서 **Add item**을 눌러 슬라이드를 추가하거나, 카드를 드래그해서 순서를 바꿉니다.
3. 슬라이드 하나마다:
   - **PC용 이미지**: 넓은 화면(데스크톱)에서 보이는 이미지 (필수)
   - **모바일용 이미지 (선택)**: 휴대폰 화면에서 다르게 보여주고 싶을 때만 업로드합니다. 비워두면 PC용 이미지가 모바일에서도 그대로 사용됩니다.
   - **이미지 설명(대체 텍스트)**: 검색/접근성용 문구 (필수)
   - **모바일에서만 보이기**: 켜면 이 슬라이드는 PC에서는 안 보이고 휴대폰에서만 보입니다.
   - **이미지 위치 조정**: 사진이 잘리는 위치를 세밀하게 조정할 때만 사용하는 개발자용 옵션입니다. 모르면 비워두세요.
4. **Publish** 후 사이트를 새로고침하면 반영됩니다.

## 4. 자동 반영 방식

- 사이트는 빌드 시점에 내용을 고정하지 않고, 방문 시 Sanity에서 최신 published 데이터를 읽습니다.
- 따라서 Studio에서 Publish 후 새로고침하면 바로 바뀝니다.
- Sanity가 없거나 조회가 실패하면 기존 [`src/data/siteData.ts`](../src/data/siteData.ts) 값으로 폴백합니다.

## 5. 유용한 명령어

```bash
npm run studio          # Sanity Studio 실행
npm run seed:sanity     # 현재 siteData + public 이미지를 Sanity로 업로드
npm run dev             # 사이트 실행
```
