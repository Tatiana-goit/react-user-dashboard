import { Star } from 'lucide-react'
import styles from './StarRating.module.scss'

// Shared between CandidateCard and CandidateRow — extracted to avoid duplicating star rendering logic
interface StarRatingProps {
  value: number
  size?: number
}

export function StarRating({ value, size = 14 }: StarRatingProps) {
  return (
    <div className={styles.stars}>
      {/* Math.round — rating can be a float (e.g. 3.5), rounded to nearest whole star */}
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} className={i < Math.round(value) ? styles.starFilled : styles.starEmpty} />
      ))}
    </div>
  )
}
