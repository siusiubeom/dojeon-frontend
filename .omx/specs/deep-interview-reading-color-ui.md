# Deep Interview Spec: Reading 화면 UI 정렬

## Metadata

- Profile: standard
- Context type: brownfield
- Final ambiguity: 0.16
- Threshold: 0.20
- Context snapshot: `.omx/context/reading-color-ui-20260620T151500Z.md`
- Transcript: `.omx/interviews/reading-color-ui-20260620T151500Z.md`

## Intent

Reading 화면을 첨부된 Figma 이미지처럼 색상과 배치가 맞는 상태로 정리한다. 기존 Grammar Practice 계열 화면과 시각적 일관성을 맞추되, Reading 화면만 대상으로 한다.

## Desired Outcome

`practiceStep === 'reading'` 화면이 첨부 이미지의 Reading 시안과 유사하게 보인다. 기본 상태, 선택 상태, 정답/오답 상태, 빈칸 입력 상태, 완료 상태가 모두 시각적으로 구분된다.

## In Scope

- `src/pages/GrammarPracticePage.tsx`의 Reading 분기 UI 상태 class 보강
- `src/pages/GrammarPracticePage.css`의 `grammar-practice-reading-*` 스타일 수정
- Reading 화면의 카드 배경, 선택 버튼, 정답/오답 색상, 입력 박스, dots, Next 버튼 색상/배치 조정
- 정답/오답 캐릭터 이미지 표시가 필요한 경우 Reading 전용 상태 표시 추가
- 필요한 경우 Reading 전용 class/state 추가

## Out of Scope / Non-goals

- Listening 화면 수정 금지
- 기존 정답 판정 로직 변경 금지
- 기존 진행 흐름 변경 금지
- 새 라이브러리 추가 금지
- Reading 외 화면의 전역 UI 리디자인 금지

## Decision Boundaries

구현자는 다음을 확인 없이 결정할 수 있다.

- 정확한 Figma 수치가 없는 색상은 기존 `--dojeon-color-*` CSS 변수 중 가장 가까운 값으로 선택
- 정확한 Figma 수치가 없는 spacing/size는 첨부 이미지와 현재 화면 구조 기준으로 근사
- Reading 전용 class 추가
- Reading 전용 상태 표시를 위한 최소 JSX 조건부 class 추가

구현자는 다음을 임의로 변경하면 안 된다.

- Listening 화면 UI
- 정답/오답 판정 규칙
- Question 진행 조건
- API, 서비스, 데이터 모델
- 공통 컴포넌트 또는 전역 토큰의 의미

## Constraints

- Web UI 색상은 `AGENTS.md` 규칙에 따라 `src/index.css`의 `--dojeon-color-*` CSS 변수를 우선 사용한다.
- 하드코딩 색상은 피한다.
- 변경 범위는 Reading UI에 제한한다.
- 로컬 검증은 최소 `npm run lint`, `npm run build`를 수행한다.

## Acceptance Criteria

- 기본 Reading 화면에서 지문 카드와 Question 1 카드가 첨부 이미지와 유사한 색상/배치로 표시된다.
- 답안을 선택하면 선택 버튼이 보라색 계열 상태로 표시된다.
- 오답 상태에서 오답 선택지가 빨간색 계열로 표시되고, 시안과 유사한 피드백 이미지가 표시된다.
- 정답 상태에서 정답 선택지가 초록색 계열로 표시되고, 시안과 유사한 피드백 이미지가 표시된다.
- Question 2 빈칸 입력 상태에서 입력 박스의 색상과 배치가 첨부 이미지와 유사하다.
- Reading 완료 상태에서 Next 버튼이 보라색 활성 상태로 표시된다.
- Listening 화면은 시각적으로 영향받지 않는다.
- 기존 정답/진행 로직은 유지된다.
- `npm run lint`가 통과한다.
- `npm run build`가 통과한다.

## Brownfield Evidence

- Reading 화면 구현 위치: `src/pages/GrammarPracticePage.tsx`, `practiceStep === 'reading'`
- Reading 스타일 위치: `src/pages/GrammarPracticePage.css`, `grammar-practice-reading-*`
- 관련 repo 규칙: `AGENTS.md`는 web 색상을 `--dojeon-color-*` CSS 변수로 사용하라고 명시한다.

## Pressure-pass Findings

처음 요청은 “색상 수정”이었지만, 첨부 이미지에는 선택/정답/오답/빈칸/완료 상태와 배치 차이가 함께 포함되어 있었다. 확인 결과 이번 범위는 단순 색상 수정이 아니라 Reading 화면의 색상, 상태 표현, 배치를 모두 맞추는 작업으로 확정되었다.

## Recommended Next Step

`$ultragoal` 또는 직접 실행으로 구현한다. 실행 시 이 문서를 요구사항 기준으로 사용한다.
