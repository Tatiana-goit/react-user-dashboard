import { Bell, MoreVertical, CheckCircle2, MessageSquare, Eye, MapPin, Zap, Star } from 'lucide-react'
import styles from './CandidateCard.module.scss'
import type { Candidate } from '../../types/candidate'

interface CandidateCardProps {
  candidate: Candidate
}

// Maps status values to display color tokens — keeps card markup clean
const STATUS_COLOR: Record<string, string> = {
  Contract: '#2d8f5f',
  Interview: '#f59e0b',
  Done: '#10b981',
  Clicks: '#8b5cf6',
  Views: '#6366f1',
  Applied: '#3b82f6',
  Screening: '#ec4899',
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
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < value ? styles.starFilled : styles.starEmpty}
        />
      ))}
    </div>
  )
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const { name, status, avatarUrl, label, rating, applications, messages, stars, location, lastActivity } = candidate

  const color = STATUS_COLOR[status] ?? '#6b7280'
  const StatusIcon = STATUS_ICON[status] ?? CheckCircle2

  // Fallback avatar: first letter of name when no image is provided
  const initials = name.charAt(0)

  return (
    <div className={styles.card}>
      {/* ── Top section: gradient background with avatar ── */}
      <div className={styles.cardTop}>
        <div className={styles.topRow}>
          <span className={styles.statusBadge} style={{ color, borderColor: `${color}40`, backgroundColor: `${color}18` }}>
            <StatusIcon size={12} strokeWidth={2.5} />
            {status}
          </span>
          <div className={styles.topActions}>
            <button className={styles.actionBtn} type="button" aria-label="Notifications">
              <Bell size={14} strokeWidth={2} />
            </button>
            <button className={styles.actionBtn} type="button" aria-label="More options">
              <MoreVertical size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className={styles.avatarWrap}>
          {avatarUrl ? (
            <img className={styles.avatar} src={avatarUrl} alt={name} />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
        </div>

        <span className={styles.labelBadge}>{label}</span>
      </div>

      {/* ── Bottom section: candidate info ── */}
      <div className={styles.cardBody}>
        <p className={styles.name}>
          {name} <span className={styles.number}>#{candidate.id}</span>
        </p>

        <StarRating value={rating} />

        <div className={styles.stats}>
          <span className={styles.stat}>
            <Zap size={12} strokeWidth={2} /> {applications}
          </span>
          <span className={styles.stat}>
            <MessageSquare size={12} strokeWidth={2} /> {messages}
          </span>
          <span className={styles.stat}>
            <Star size={12} strokeWidth={2} /> {stars}
          </span>
          <span className={styles.stat}>
            <MapPin size={12} strokeWidth={2} /> {location}
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
