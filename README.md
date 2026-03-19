# React User Dashboard

A candidate overview page with grid and list views, pagination, and Redux state management.

## Setup

```bash
npm install
npm run dev
```

To run tests:

```bash
npm test
```

## Stack

React · TypeScript · Redux Toolkit · SCSS Modules · Jest · React Testing Library

## Assumptions

The Figma was used as the primary design reference throughout. Some aspects of the data and design required interpretation — the following decisions were made where the requirements left room for it:

- Mock data is based on the provided `users.json`. 10 additional candidates were added to reach 20 total, which is enough to demonstrate pagination in both views (grid: 9/page → 3 pages, list: 10/page → 2 pages).
- Status values in `users.json` are internal keys (e.g. `status.qualification`) mapped to display labels in `candidatesApi.ts`. Unmapped statuses fall back to `Applied`.
- `lastActivity` is a number of days in the raw data, formatted into a human-readable string (e.g. `3 days ago`).
- Candidate avatars fall back to the first letter of the name when no profile image is provided.

## Trade-offs

- Data is fetched once on mount via a simulated async Redux flow. No polling or refetch on focus — out of scope.
- Switching views resets pagination to page 1, since grid and list have different items-per-page values and the current page may not exist in the new view.
- Grid and list are separate presentational components rather than one combined component — keeps each layout focused and easy to change independently.
- Derived values (paginated slice, total pages, items per page) are computed in selectors rather than stored in Redux — keeps the store minimal and the logic independently testable.

## Omissions

- **Sidebar** — navigation is outside the scope of this exercise; icons rendered for layout only.
- **Add candidate / Footer actions** — require backend integration; rendered for layout only.
- **Archived filter** — no archived candidates in the mock data; tab rendered for layout only.
- **Sorting** — not implemented; column headers render the sort icon for layout purposes only. Would be a straightforward selector addition.
- **Search** — not implemented; prioritised core layout and state management first. Can be added as a selector filter without Redux changes.

## Tests

27 tests across 4 files, 87% line coverage. Covers the main flows:

- `CandidatesPage.test.tsx` — loading state, grid/list render, pagination, view switch, empty state
- `selectors.test.ts` — items per page, total pages, paginated slice
- `candidatesSlice.test.ts` — reducers, async thunk pending/fulfilled/rejected
- `Pagination.test.tsx` — visibility, disabled states, navigation clicks, item counter
