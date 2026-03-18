import { CandidateCard } from './CandidateCard'
import styles from './CandidatesGrid.module.scss'
import type { Candidate } from '../../types/candidate'

interface CandidatesGridProps {
  candidates: Candidate[]
}

export function CandidatesGrid({ candidates }: CandidatesGridProps) {
  return (
    <div className={styles.grid}>
      {candidates.map((candidate) => (
        // Using id as key; if mock data has duplicate ids this will warn — documented assumption
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  )
}
