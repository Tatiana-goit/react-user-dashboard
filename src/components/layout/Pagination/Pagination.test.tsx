import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

const DEFAULT_PROPS = {
  currentPage: 1,
  totalPages: 3,
  totalItems: 20,
  itemsPerPage: 9,
  onPageChange: jest.fn(),
}

describe('Pagination', () => {
  // No point showing pagination when all items fit on one page
  test('renders nothing when totalPages is 1', () => {
    const { container } = render(<Pagination {...DEFAULT_PROPS} totalPages={1} />)
    expect(container.firstChild).toBeNull()
  })

  // Previous must be disabled on page 1 — there is no previous page to go to
  test('disables Previous button on first page', () => {
    render(<Pagination {...DEFAULT_PROPS} currentPage={1} />)
    expect(screen.getByText('Previous').closest('button')).toBeDisabled()
  })

  // Next must be disabled on the last page — there is no next page to go to
  test('disables Next button on last page', () => {
    render(<Pagination {...DEFAULT_PROPS} currentPage={3} totalPages={3} />)
    expect(screen.getByText('Next').closest('button')).toBeDisabled()
  })

  // Clicking a page button must call onPageChange with the correct page number
  test('calls onPageChange with correct page on page button click', async () => {
    const onPageChange = jest.fn()
    render(<Pagination {...DEFAULT_PROPS} onPageChange={onPageChange} />)

    await userEvent.click(screen.getByRole('button', { name: '2' }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  // Clicking Previous navigates to the previous page
  test('calls onPageChange with previous page on Previous click', async () => {
    const onPageChange = jest.fn()
    render(<Pagination {...DEFAULT_PROPS} currentPage={2} onPageChange={onPageChange} />)

    await userEvent.click(screen.getByText('Previous').closest('button')!)

    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  // Clicking Next navigates to the next page
  test('calls onPageChange with next page on Next click', async () => {
    const onPageChange = jest.fn()
    render(<Pagination {...DEFAULT_PROPS} currentPage={2} onPageChange={onPageChange} />)

    await userEvent.click(screen.getByText('Next').closest('button')!)

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  // Counter shows which items are currently visible — e.g. "Showing 1–9 of 20"
  test('shows correct item range in counter', () => {
    render(<Pagination {...DEFAULT_PROPS} currentPage={2} />)
    expect(screen.getByText('Showing 10–18 of 20')).toBeInTheDocument()
  })
})
