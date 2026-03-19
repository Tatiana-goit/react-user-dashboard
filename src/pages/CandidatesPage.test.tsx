import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CandidatesPage } from './CandidatesPage'
import { candidatesReducer } from '../features/candidates/store'
import { MOCK_CANDIDATES } from '../test/mocks'

const mockFetch = jest.fn()

jest.mock('../features/candidates/store/candidatesApi', () => ({
  fetchCandidatesFromApi: () => mockFetch(),
}))

function renderWithStore() {
  const store = configureStore({ reducer: { candidates: candidatesReducer } })
  return render(
    <Provider store={store}>
      <CandidatesPage />
    </Provider>
  )
}

describe('CandidatesPage', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue(MOCK_CANDIDATES)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // The fetch is async — before it resolves, the page must show a loading indicator
  test('shows loading state initially', () => {
    renderWithStore()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  // Grid view shows 9 items per page — verifies both the fetch and the pagination slice
  test('renders 9 candidates in grid view after fetch', async () => {
    renderWithStore()
    await waitFor(() => {
      expect(screen.getAllByText(/Candidate \d+/).length).toBe(9)
    })
  })

  // List view has a different items-per-page value (10) — switching must recalculate the slice
  test('renders 10 candidates in list view after fetch', async () => {
    renderWithStore()
    await waitFor(() => screen.getAllByText(/Candidate \d+/))

    await userEvent.click(screen.getByRole('button', { name: 'List view' }))

    expect(screen.getAllByText(/Candidate \d+/).length).toBe(10)
  })

  // Switching views resets currentPage to 1 — without this, the user could land on a
  // page that doesn't exist in the new view (e.g. grid page 3 has no equivalent in list)
  test('resets to page 1 when switching views', async () => {
    renderWithStore()
    await waitFor(() => screen.getAllByText(/Candidate \d+/))

    await userEvent.click(screen.getByRole('button', { name: '2' }))
    expect(screen.getByText('Candidate 10')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'List view' }))
    expect(screen.getByText('Candidate 1')).toBeInTheDocument()
  })

  // Pagination must show the correct slice and hide the previous one
  test('shows next page candidates on pagination click', async () => {
    renderWithStore()
    await waitFor(() => screen.getAllByText(/Candidate \d+/))

    await userEvent.click(screen.getByRole('button', { name: '2' }))

    expect(screen.getByText('Candidate 10')).toBeInTheDocument()
    expect(screen.queryByText('Candidate 1')).not.toBeInTheDocument()
  })

  // An empty API response is a valid state — the UI must not crash or show stale content
  test('shows empty state when no candidates', async () => {
    mockFetch.mockResolvedValue([])
    renderWithStore()

    await waitFor(() => {
      expect(screen.getByText('No candidates found.')).toBeInTheDocument()
    })
  })
})
