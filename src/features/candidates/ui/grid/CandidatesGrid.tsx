import { CandidateCard } from './CandidateCard'
import styles from './CandidatesGrid.module.scss'
import type { Candidate } from '../../../../types/candidate'

// Renders whatever candidates it receives — page size is decided upstream
interface CandidatesGridProps {
  candidates: Candidate[]
}

export function CandidatesGrid({ candidates }: CandidatesGridProps) {
  return (
    <div className={styles.grid}>
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  )
}
