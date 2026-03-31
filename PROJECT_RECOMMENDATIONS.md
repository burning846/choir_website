# Project Recommendations

Last updated: 2026-03-30

This document only lists issues that still appear unresolved in the current codebase.

## Priority 1

### 1. Surface document load and validation failures in the page UI

Current issue:

- `DocProvider` now sets `error` for fetch failures and schema validation failures
- the page layer does not render any explicit loading or error state from that context

Why this matters:

- invalid or missing content currently degrades into a partially empty page shell
- users do not get a clear signal that the site content failed to load
- operational issues become harder to detect outside developer tooling

Recommended change:

- make `Home` or a higher-level layout consume `loading` and `error`
- render a clear loading state while content is being fetched
- render a clear failure state when `error` is set, instead of silently showing sparse sections

Expected result:

- content failures become visible and understandable
- the app fails predictably instead of degrading into an incomplete page

## Priority 2

### 2. Localize accessibility labels for language-aware UI

Current issue:

- social links in `Contact` use hardcoded English `aria-label` and `title`
- the theme toggle in `Header` still uses a hardcoded Chinese `aria-label`

Why this matters:

- screen-reader output becomes inconsistent with the selected language
- the UI is visually bilingual, but assistive text is not

Recommended change:

- move these accessibility labels into `uiTranslations`
- keep visible text and assistive text in the same localization path
- cover both English and Chinese variants

Expected result:

- assistive text matches the active language
- accessibility behavior is consistent with the rest of the localized UI

## Testing Recommendations

### 3. Add tests for the remaining weak spots

Missing or weak coverage:

- visible error-state rendering when `DocProvider` returns `error`
- loading-state rendering during content fetch
- localized accessibility labels for social links
- localized accessibility label for the theme toggle

Recommended change:

- add focused component tests for the page shell and accessibility labels
- keep tests language-aware so regressions are caught in both `en` and `zh`

Expected result:

- better confidence around failure handling and accessibility
- fewer localization regressions in non-visible UI text

## Suggested Implementation Order

1. Add loading and error rendering to the page shell
2. Move remaining accessibility labels into `uiTranslations`
3. Add tests covering both failure states and localized a11y text
