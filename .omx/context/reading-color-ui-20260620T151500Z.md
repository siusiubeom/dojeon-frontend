# Context Snapshot: Reading Color UI

Task statement: Reading 화면 색상 수정을 위한 deep-interview.
Desired outcome: 첨부된 Reading Figma 이미지에 맞게 현재 Reading 화면의 색상 범위를 명확히 한다.
Stated solution: 색상 수정.
Probable intent hypothesis: 기존 Grammar/Practice 화면처럼 Reading 화면도 Figma 상태별 컬러에 맞추려는 목적.
Known facts/evidence:
- Reading UI is implemented in `src/pages/GrammarPracticePage.tsx` under `practiceStep === 'reading'`.
- Reading styles are in `src/pages/GrammarPracticePage.css` using `grammar-practice-reading-*` selectors.
- Project rule in `AGENTS.md`: web UI colors should use `--dojeon-color-*` variables from `src/index.css`, not hard-coded colors.
- The attached image shows base, selected, wrong, correct, blank-entry/keyboard, and completed-next states.
Constraints:
- Current user request mentions color modification; behavior changes are not confirmed.
- Need avoid changing unrelated grammar/listening UI unless shared selectors force it.
Unknowns/open questions:
- Whether this pass should cover only colors or also spacing/layout differences visible in the screenshot.
- Whether correct/wrong feedback overlays and character images are in scope.
Decision-boundary unknowns:
- Whether implementation may add missing state classes/logic when needed to show color states.
Likely codebase touchpoints:
- `src/pages/GrammarPracticePage.tsx`
- `src/pages/GrammarPracticePage.css`
- possibly `src/index.css` if a token is missing.
Relevant repo docs/rules/context inspected:
- `AGENTS.md` design system rule.
Terminology/doc conflicts: none found.
Prompt-safe initial-context summary status: not_needed.
