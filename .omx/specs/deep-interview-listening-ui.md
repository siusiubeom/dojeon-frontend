# Deep Interview Spec: Listening 화면 UI 정렬

## Metadata

- Profile: standard
- Context type: brownfield
- Final ambiguity: 0.14
- Threshold: 0.20
- Context snapshot: `.omx/context/listening-ui-20260620T171906Z.md`
- Transcript: `.omx/interviews/listening-ui-20260620T171906Z.md`

## Intent

Listening 화면을 첨부된 Figma 이미지처럼 보이도록 UI를 정리한다. Reading 화면 정리와 같은 수준으로 색상, 배치, 상태 표현을 맞추되 기존 Listening 동작 로직은 유지한다.

## Desired Outcome

`practiceStep === 'listening'` 화면에서 세 상태가 첨부 이미지와 유사하게 보인다.

- 기본 상태: 오디오 바, 질문 카드, 비활성 Next
- Show text 버튼이 보이는 상태
- 지문 카드가 펼쳐지고 답 선택 후 Next가 활성화된 상태

## In Scope

- `src/pages/GrammarPracticePage.tsx`의 Listening 분기 class 구조 정리
- `src/pages/GrammarPracticePage.css`의 `grammar-practice-listening-*` 스타일 수정
- Listening 화면의 오디오 바, Show text 버튼, 지문 카드, 질문 카드, 선택 버튼, dots, Next 버튼 색상/배치 조정
- Listening 전용 class를 추가해 Reading 화면 변경사항과 스타일 영향 분리
- 기존 350px 모바일 카드 구조 안에서 첨부 이미지와 유사하게 spacing/size 조정

## Out of Scope / Non-goals

- 기존 Listening 동작 로직 변경 금지
- Show text 표시 타이밍 변경 금지
- Next 활성 조건 변경 금지
- 정답/오답 피드백 화면 추가 금지
- Reading 화면 UI 회귀 금지
- 새 라이브러리 추가 금지
- 전역 디자인 토큰 의미 변경 금지

## Decision Boundaries

구현자는 다음을 확인 없이 결정할 수 있다.

- 정확한 Figma 수치가 없는 색상은 기존 `--dojeon-color-*` CSS 변수 중 가장 가까운 값으로 선택
- 정확한 spacing/size는 현재 모바일 350px 카드 구조 기준으로 근사
- Listening 전용 class/wrapper 추가
- Reading 공용 class 재사용이 회귀를 만들 수 있으면 Listening 전용 class로 분리

구현자는 다음을 임의로 변경하면 안 된다.

- API, 서비스, 데이터 모델
- 정답 판정 또는 진행 조건
- Show text 활성화 조건
- Reading 화면의 기존 UI/동작
- 전역 CSS 토큰의 의미

## Constraints

- Web UI 색상은 `AGENTS.md`와 `docs/design-system.md` 규칙에 따라 `src/index.css`의 `--dojeon-color-*` CSS 변수를 우선 사용한다.
- 하드코딩 색상은 피한다.
- 변경 범위는 Listening UI에 제한한다.
- 로컬 검증은 최소 `npm run lint`, `npm run build`를 수행한다.

## Acceptance Criteria

- Listening 기본 상태에서 오디오 바, 질문 카드, dots, 비활성 Next가 첨부 이미지와 유사한 색상/배치로 표시된다.
- Show text 버튼 상태에서 버튼이 첨부 이미지처럼 가운데 영역에 표시된다.
- Show text를 누른 상태에서 지문 카드가 첨부 이미지처럼 보라 계열 카드로 표시된다.
- 답 선택 후 선택 버튼이 보라색 상태로 표시되고 Next 버튼이 보라색 활성 상태로 표시된다.
- Listening UI 스타일은 Listening 전용 class로 충분히 분리되어 Reading 화면에 영향을 주지 않는다.
- 정답/오답 피드백은 추가하지 않는다.
- 기존 Show text/Next/선택 로직은 유지된다.
- `npm run lint`가 통과한다.
- `npm run build`가 통과한다.

## Brownfield Evidence

- Listening 화면 구현 위치: `src/pages/GrammarPracticePage.tsx`, `practiceStep === 'listening'`
- Listening 스타일 위치: `src/pages/GrammarPracticePage.css`, `grammar-practice-listening-*`
- 현재 Listening은 toggle, question card, answer button, dots, Next button에서 일부 `grammar-practice-reading-*` class를 재사용한다.
- 관련 repo 규칙: `AGENTS.md`와 `docs/design-system.md`는 web 색상을 `--dojeon-color-*` CSS 변수로 사용하라고 명시한다.

## Pressure-pass Findings

처음 요청은 “Listening 화면 UI 수정”이었지만, 첨부 이미지에는 기본 상태, Show text 버튼 상태, 지문 펼침/Next 활성 상태가 함께 포함되어 있었다. 확인 결과 이번 범위는 색상/배치와 상태별 시각 표현까지이며, 동작 로직 변경과 정답/오답 피드백 추가는 제외로 확정되었다.

## Recommended Next Step

`$ultragoal` 또는 직접 실행으로 구현한다. 실행 시 이 문서를 요구사항 기준으로 사용한다.
