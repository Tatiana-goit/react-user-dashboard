import { useState } from 'react'
import { Bell, MoreVertical, CheckCircle2, MessageSquare, Eye, MapPin, Zap, Star } from 'lucide-react'
import styles from './CandidateCard.module.scss'
import { ContextMenu } from './ContextMenu'
import type { Candidate } from '../../../../types/candidate'

interface CandidateCardProps {
  candidate: Candidate
}

const STATUS_ICON: Record<string, React.ElementType> = {
  Contract: CheckCircle2,
  Interview: MessageSquare,
  Done: CheckCircle2,
  Clicks: Eye,
  Views: Eye,
  Applied: CheckCircle2,
  Screening: CheckCircle2,
}

function StarRating({ value }: { value: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i + 1 <= value) return <Star key={i} size={14} className={styles.starFilled} />
        if (i < value) return (
          <span key={i} className={styles.starHalfWrap}>
            <Star size={14} className={styles.starEmpty} />
            <Star size={14} className={styles.starHalf} />
          </span>
        )
        return <Star key={i} size={14} className={styles.starEmpty} />
      })}
    </div>
  )
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const { fullName, status, profilePictureId, rating, applicationCount, talentPoolCount, stars, city, lastActivity } = candidate
  const [menuOpen, setMenuOpen] = useState(false)

  const StatusIcon = STATUS_ICON[status] ?? CheckCircle2

  // Fallback avatar: first letter of name when no image is provided
  const initials = fullName.charAt(0)

  return (
    <div className={styles.card}>
      {/* ── Top section: gradient background with avatar and label ── */}
      <div className={styles.cardTop}>
        <div className={styles.topRow}>
          <span className={styles.statusBadge}>
            <StatusIcon size={12} strokeWidth={2.5} />
            {status}
          </span>
          <div className={styles.topActions}>
            <button className={styles.actionBtn} type="button" aria-label="Notifications">
              <Bell size={14} strokeWidth={2} />
            </button>
            <div className={styles.menuWrap}>
              <button
                className={styles.actionBtn}
                type="button"
                aria-label="More options"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <MoreVertical size={14} strokeWidth={2} />
              </button>
              <ContextMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>

        <div className={styles.avatarWrap}>
          {profilePictureId ? (
            <img className={styles.avatar} src={profilePictureId} alt={fullName} />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
        </div>

        {/* Label badge — placeholder, not present in API data */}
        <span className={styles.labelBadge}>Label</span>
      </div>

      {/* ── Bottom section: candidate info ── */}
      <div className={styles.cardBody}>
        <p className={styles.name}>
          {fullName} <span className={styles.number}>#{candidate.number}</span>
        </p>

        <StarRating value={rating} />

        <div className={styles.stats}>
          <span className={styles.stat}>
            <Zap size={12} strokeWidth={2} /> {applicationCount}
          </span>
          <span className={styles.stat}>
            <MessageSquare size={12} strokeWidth={2} /> {talentPoolCount}
          </span>
          <span className={styles.stat}>
            <Star size={12} strokeWidth={2} /> {stars}
          </span>
          <span className={styles.stat}>
            <MapPin size={12} strokeWidth={2} /> {city}
          </span>
        </div>

        <p className={styles.activity}>↑ {lastActivity}</p>

        <button className={styles.viewBtn} type="button">
          View candidate
        </button>
      </div>
    </div>
  )
}
