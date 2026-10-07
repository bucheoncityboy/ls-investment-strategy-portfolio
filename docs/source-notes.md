# 콘텐츠 근거와 표현 범위

작성 기준일: 2026-10-07.

이 사이트는 지원자가 제공한 경험 설명과 다음 공개 저장소를 바탕으로 구성했습니다. 과거 금융 데이터 파이프라인 전체를 재실행한 검증 보고서는 아닙니다.

## 학력과 활동

- [포트폴리오 인덱스](https://github.com/bucheoncityboy/portfolio-index): 학력, 학회·연구실 활동, 자격·수료 이력.
- 정기 브리핑과 해외 IB 자료 분석·발표는 지원자가 제공한 경험 설명을 따릅니다. 사이트에 소개한 Rates·FX·Credit 주제는 최근 리서치 내용입니다.
- 브리핑과 해외 리서치의 설명은 수행한 작업과 검토 주제에 한정합니다. 비공개 자료의 원문, 이미지, 파일과 개인 로컬 경로는 포함하지 않습니다.

## 국고채 연구

- [연구 개요](https://github.com/bucheoncityboy/krw-rates-integrated-research): 공통 관측일 1,084개, 정책결정 36회, D+1 확대 19회·축소 17회.
- D+1과 D+5는 다음 및 다섯째 관측일입니다. 정책결정 전일을 비교 기준으로 사용합니다.
- 사건 전후 반응을 비교한 연구이며 인과효과를 식별하거나 각 변수의 영향도를 분리한 결과가 아닙니다.
- DV01 중립 가상 포지션은 가정 액면금액과 듀레이션에 따른 예시입니다. 실제 체결 성과가 아닙니다.

## 브리핑 자동화

- [스킬 저장소](https://github.com/bucheoncityboy/multi-asset-morning-briefing): 공개 데이터 원천, 거래일·관측일 확인, 단위·출처 기록, 원천별 오류 처리.
- [PR #675](https://github.com/NomaDamas/k-skill/pull/675): 기여 병합과 ECOS 조회 방식 수정 기록.
- [PR #677](https://github.com/NomaDamas/k-skill/pull/677): main 배포 반영.
- 40분에서 10분 이내라는 시간 변화는 지원자가 제공한 학회원 피드백입니다. 독립적으로 측정한 벤치마크로 표현하지 않습니다.
- 공개 실행 예시는 AI 스킬의 출력입니다. 지원자가 직접 작성한 학회 브리핑으로 표시하지 않습니다.

### 2026.10.07 AI 활용 리서치 샘플

- [공개 샘플](https://bucheoncityboy.github.io/ls-investment-strategy-portfolio/samples/2026-10-07.html)은 스킬을 실제 실행한 뒤 공개 자료를 대조하여 구성했습니다. 기존 학회 브리핑과 구분합니다.
- K-Skill main을 `9fade13b1066bc58fd820fe659145a9a21974138`로 고정해 설치했습니다. [고정 원본](https://github.com/NomaDamas/k-skill/tree/9fade13b1066bc58fd820fe659145a9a21974138/multi-asset-morning-briefing)
- 공식 CLI `instruct`와 `exec ... snapshot --briefing-date 2026-10-07`을 실제 실행했습니다. 설치한 main과 CLI helper의 SHA-256은 모두 `30f2df565561616eab7d634cd96e1ba1b6c2c701e7e18e120e3294f182ae99fb`였습니다.
- [실제 최종 snapshot](snapshot-2026-10-07.json): 생성 2026-10-07 19:15:54 KST, 미국·한국 세션 각각 2026-10-06, 10개 item, warnings/failures 없음. 최초 ECB 인증서 조회 실패 뒤 신뢰 CA 번들 경로를 지정해 재실행했으며 TLS 검증을 끄지 않았습니다.
- 07:00 KST는 뉴스·시장 세션의 기준시각입니다. 샘플은 같은 날 저녁에 과거 완료장을 재구성한 것으로, 실제 아침 7시 취합 결과나 당시 작성 기록으로 표시하지 않습니다. 공식 일별 가격 기록은 저녁에 재조회했습니다.
- 국내 직전 관측일은 별도 snapshot에서 2026-10-02로 확인했습니다. ECOS의 KOSPI 7,003.74→6,941.39 및 KOSDAQ 893.29→919.92로부터 각각 -0.89%, +2.98%를 계산했습니다.
- Treasury 값은 일별 Par Yield, ECB 값은 reference rate, USD/KRW는 서울시장 15:30 주간 종가입니다. 국내 3Y·10Y는 [연합인포맥스](https://news.einfomax.co.kr/news/articleView.html?idxno=4437978)가 인용한 금융투자협회 최종호가수익률이며 이번 샘플에서는 단일 보도 근거입니다.
- Nasdaq Composite는 초기 보도 27,599.79와 [공식 지수](https://indexes.nasdaqomx.com/Index/History/COMP) 27,599.89 사이 0.10pt 차이가 있어 공식 값을 사용했습니다. EWY 가격 수익률 -2.64%와 NAV 수익률 -2.04%를 구분했습니다.
- CME 자료는 조회 당시 2026-10-06 Daily Bulletin #192, PRELIMINARY의 계약별 정산표입니다. `current` URL은 이후 갱신될 수 있습니다. WTI CL NOV26, NYMEX Brent Oil Last Day BZ DEC26, 금 GC DEC26, 구리 HG DEC26으로 계약을 명시했습니다.
- 10/7·8·12·13·14일을 한국 5거래일로 사용했고 10/9 휴장을 제외했습니다. 미국 EDT는 UTC-4로 변환했습니다. ECB 주간 일정의 CET 표기는 같은 페이지의 현지시각 대응을 근거로 유럽 서머타임(UTC+2)으로 환산했습니다.
- 관측시각이 불명확한 DXY와 검증되지 않은 목표 오버나이트 NDF·KOSPI200 야간선물은 숫자에서 제외했습니다. 기사 수정시각이 cutoff를 넘은 자료와 미확인 예상치도 사용하지 않았습니다.

## 팩터 연구와 추가 프로젝트

- [Fama-French 통합 연구](https://github.com/bucheoncityboy/fama-french-integrated-research): 미국·한국 비교, 한국 1,054종목, FF3 모형과 GRS 검정.
- [환헤지 연구](https://github.com/bucheoncityboy/Dynamic-Shield-K-ICS-AI): 시장 국면과 자산 상관관계를 고려한 연구 설명만 사용합니다.
- [하방위험 연구](https://github.com/bucheoncityboy/deep-quant-risk-haqr): 분위수 회귀와 불확실성을 반영한 포지션 규모 연구를 설명합니다.
- HAQR 연결 README와 인덱스는 원보고서의 합성 AR(3) 데이터·N=100 비교로 통일했습니다. Pinball Loss는 0.003501→0.003242로 약 7.4% 감소하며, 91.48%는 90% 예측구간 커버리지(PICP)입니다. 거래 승률로 표시하지 않습니다.
- 환헤지 원문 Table 1의 SCR 열과 절감률 열은 산술상 불일치합니다. 연결 README에 원문과 표시 SCR 재계산을 나눠 설명했고, 최대 10.38%를 확정 성과로 사용하지 않습니다. 원본 PDF는 보존했습니다.
- 실제 활동 관계가 확인되기 전까지 연결 README와 인덱스는 HY-FIN 재무금융학회 환헤지 연구로 표기했습니다. 참고문헌의 회사명으로 협업이나 공모전 출품 이력을 추정하지 않습니다.

## 문서 비공개

지원자의 요청에 따라 첨부 PDF는 공개하지 않습니다. PDF 파일, 변환 이미지, PDF 임베드와 해당 문서의 파일명을 배포물에 넣지 않습니다. 공개 저장소에 있는 다른 문서도 이 저장소로 복제하지 않습니다.
