import { ArrowUpDown } from 'lucide-react'
import { CandidateRow } from './CandidateRow'
import type { Candidate } from '../../../../types/candidate'
import styles from './CandidatesList.module.scss'

// Renders whatever candidates it receives — page size (10 per page) is decided upstream
interface CandidatesListProps {
  candidates: Candidate[]
}

// Sorting is out of scope — sortable flag renders the icon only
const COLUMNS = [
  { label: 'Candidate', sortable: false },
  { label: 'Profile type', sortable: true },
  { label: 'Location & area', sortable: true },
  { label: 'Job & Talent pool', sortable: true },
  { label: 'Sourced by', sortable: true },
  { label: 'Last activity', sortable: true },
  { label: 'Actions', sortable: false },
]

export function CandidatesList({ candidates }: CandidatesListProps) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.checkTh}>
              <input type="checkbox" className={styles.checkbox} /> {/* Select-all — decorative, bulk selection not implemented */}
            </th>
            {COLUMNS.map(({ label, sortable }) => (
              <th key={label} className={styles.th}>
                <span className={styles.thInner}>
                  {label}
                  {sortable && <ArrowUpDown size={12} className={styles.sortIcon} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <CandidateRow key={candidate.id} candidate={candidate} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
