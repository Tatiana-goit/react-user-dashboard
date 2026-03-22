import { useState } from 'react'
import { Bell, MoreVertical, CheckCircle2, MessageSquare, Eye, MapPin, Zap, Star } from 'lucide-react'
import styles from './CandidateCard.module.scss'
import { ContextMenu } from './ContextMenu'
import { StarRating } from '../shared/StarRating'
import type { Candidate } from '../../../../types/candidate'

interface CandidateCardProps {
  candidate: Candidate
}

// Fallback icons per status label — no icon spec in mock data, mapped by label string
const STATUS_ICON: Record<string, React.ElementType> = {
  Contract: CheckCircle2,
  Interview: MessageSquare,
  Done: CheckCircle2,
  Clicks: Eye,
  Views: Eye,
  Applied: CheckCircle2,
  Screening: CheckCircle2,
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const { fullName, status, profilePictureId, rating, applicationCount, talentPoolCount, city, lastActivity } = candidate
  const [menuOpen, setMenuOpen] = useState(false) // Local UI state — ephemeral open/close, no reason to put in Redux

  const StatusIcon = STATUS_ICON[status] ?? CheckCircle2 // CheckCircle2 as fallback — status values outside the map should still render safely


  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.topRow}>
          <span className={styles.statusBadge}>
            <StatusIcon size={12} strokeWidth={2.5} />
            {status}
          </span>
          <div className={styles.topActions}>
            {/* Bell — decorative, notification system would require backend integration */}
            <button className={styles.actionBtn} type="button" aria-label="Notifications">
              <Bell size={14} strokeWidth={2} />
            </button>
            <div className={styles.menuWrap}>
              <button
                className={styles.actionBtn}
                type="button"
                aria-label="More options"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MoreVertical size={14} strokeWidth={2} />
              </button>
              <ContextMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>

        {/* profilePictureId is empty in mock data — first letter of fullName used as fallback avatar */}
        <div className={styles.avatarWrap}>
          {profilePictureId ? (
            <img className={styles.avatar} src={profilePictureId} alt={fullName} />
          ) : (
            <div className={styles.avatarFallback}>{fullName.charAt(0)}</div>
          )}
        </div>

      </div>

      <div className={styles.cardBody}>
        {/* Label badge — placeholder, not present in API data */}
        <span className={styles.labelBadge}>Label</span>

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
            <Star size={12} strokeWidth={2} /> {rating}
          </span>
          <span className={styles.stat}>
            <MapPin size={12} strokeWidth={2} /> {city}
          </span>
        </div>

        {/* ↑ is decorative (Figma) — lastActivity is already a formatted string from formatActivity helper */}
        <p className={styles.activity}>↑ {lastActivity}</p>

        {/* View candidate — would require routing to a candidate detail page, out of scope */}
        <button className={styles.viewBtn} type="button">
          View candidate
        </button>
      </div>
    </div>
  )
}
