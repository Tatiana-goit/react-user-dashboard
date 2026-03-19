import { Star } from 'lucide-react'
import styles from './StarRating.module.scss'

interface StarRatingProps {
  value: number
  size?: number
}

export function StarRating({ value, size = 14 }: StarRatingProps) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} className={i < Math.round(value) ? styles.starFilled : styles.starEmpty} />
      ))}
    </div>
  )
}
