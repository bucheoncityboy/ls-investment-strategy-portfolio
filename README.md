# 김재원 투자전략 리서치 포트폴리오

LS증권 투자전략 RA 지원용 GitHub Pages입니다. `markets-investment-portfolio`의 디자인을 바탕으로 글로벌 시장 브리핑, 해외 IB 리서치, 국고채 이벤트 분석과 리서치 자동화 경험을 소개합니다.

- [공개 사이트](https://bucheoncityboy.github.io/ls-investment-strategy-portfolio/)
- [전체 프로젝트 인덱스](https://github.com/bucheoncityboy/portfolio-index)
- [AI 활용 리서치 샘플 — 2026.10.07](https://bucheoncityboy.github.io/ls-investment-strategy-portfolio/samples/2026-10-07.html): K-Skill 실제 실행과 공개 원천 대조로 구성한 예시.

## 로컬 확인

```sh
npm ci
npm run check
npm run typecheck
npm run preview
```

미리보기 주소: `http://127.0.0.1:4173`

직접 검증 명령: `npx tsx src/harness.ts`

## 구성

- `index.html`: 소개, 대표 경험, 작업 방식, 학력·활동, 자격, 연락처
- `samples/2026-10-07.html`: AI 활용 모닝 브리핑 샘플과 생성·검토 범위
- `styles.css`: PC·모바일 화면과 인쇄 스타일
- `assets/favicon.svg`: JK 아이콘
- `src/harness.ts`: 링크·정적 파일·문서 비공개 조건·배포 구성 확인
- `src/serve.ts`: 공개 파일만 제공하는 로컬 미리보기 서버
- `docs/source-notes.md`: 공개 근거와 표현의 범위

첨부받은 비공개 문서는 저장소에 포함하지 않습니다. Pages 배포 파일은 홈페이지·샘플 HTML, CSS, favicon, `.nojekyll`로 제한합니다. 새 클라이언트 스크립트나 외부 데이터 수집 코드는 없습니다.

## 배포

GitHub Pages의 소스는 GitHub Actions입니다. `main` 변경 시 검증 후 사이트를 배포합니다.

## 업데이트

공개 콘텐츠는 `index.html`에서 수정합니다. 경험과 성과를 추가할 때에는 작성 범위, 수치의 산출 조건과 공개 근거를 함께 확인합니다.
