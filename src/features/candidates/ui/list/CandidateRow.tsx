import { Star, Phone, Mail, Copy, Share2, Linkedin, Globe, Network } from 'lucide-react'
import type { Candidate } from '../../../../types/candidate'
import styles from './CandidateRow.module.scss'

interface CandidateRowProps {
  candidate: Candidate
}

function StarRating({ value }: { value: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i + 1 <= value) return <Star key={i} size={11} className={styles.starFilled} />
        if (i < value) return (
          <span key={i} className={styles.starHalfWrap}>
            <Star size={11} className={styles.starEmpty} />
            <Star size={11} className={styles.starHalf} />
          </span>
        )
        return <Star key={i} size={11} className={styles.starEmpty} />
      })}
    </div>
  )
}

// Country flag emoji derived from city — mock data doesn't include country code
const CITY_FLAG: Record<string, string> = {
  Copenhagen: '🇩🇰', Monaco: '🇲🇨', Amsterdam: '🇳🇱', Ottawa: '🇨🇦',
  Ottowa: '🇨🇦', London: '🇬🇧', Oxfordshire: '🇬🇧', Dubai: '🇦🇪',
  Jeddah: '🇸🇦', Perth: '🇦🇺', Paris: '🇫🇷',
}

// Cycles through source platforms since mock data has no source field
const SOURCES = ['LinkedIn', 'Careersite', 'Facebook', 'Elevportalen']

const SOURCE_STYLE: Record<string, string> = {
  LinkedIn:     styles.sourceLi,
  Careersite:   styles.sourceCs,
  Facebook:     styles.sourceFb,
  Elevportalen: styles.sourceEl,
}

export function CandidateRow({ candidate }: CandidateRowProps) {
  const { fullName, profilePictureId, rating, applicationCount, stars, city, lastActivity, status } = candidate
  const initials = fullName.charAt(0)
  const flag     = CITY_FLAG[city] ?? '🌍'
  const source   = SOURCES[(candidate.id - 1) % SOURCES.length]

  return (
    <tr className={styles.row}>
      {/* Checkbox */}
      <td className={styles.checkCell}>
        <input type="checkbox" className={styles.checkbox} />
      </td>

      {/* Candidate */}
      <td className={styles.candidateCell}>
        <div className={styles.candidateInfo}>
          <div className={styles.avatar}>
            {profilePictureId
              ? <img src={profilePictureId} alt={fullName} className={styles.avatarImg} />
              : <span className={styles.avatarInitial}>{initials}</span>
            }
          </div>
          <div>
            <p className={styles.name}>
              {fullName} <span className={styles.number}>#{candidate.number}</span>
            </p>
            <StarRating value={rating} />
          </div>
        </div>
      </td>

      {/* Profile type */}
      <td className={styles.cell}>
        <div className={styles.tags}>
          <span className={styles.tag}>{status}</span>
        </div>
      </td>

      {/* Location & area */}
      <td className={styles.cell}>
        <p className={styles.locationPrimary}>
          <span className={styles.flag}>{flag}</span>
          {city}
        </p>
        <p className={styles.cellSecondary}>
          <Network size={11} className={styles.areaIcon} />
          Text
        </p>
      </td>

      {/* Job & Talent pool */}
      <td className={styles.cell}>
        <div className={styles.poolCounts}>
          <div className={styles.poolItem}>
            <span className={styles.poolBadgeFilled}>{applicationCount}</span>
          </div>
          <div className={styles.poolItem}>
            <span className={styles.poolBadgeOutline}>{stars}</span>
          </div>
        </div>
      </td>

      {/* Sourced by */}
      <td className={styles.cell}>
        <span className={`${styles.sourceBadge} ${SOURCE_STYLE[source]}`}>
          {source === 'LinkedIn' ? <Linkedin size={11} /> : <Globe size={11} />}
          {source}
        </span>
      </td>

      {/* Last activity */}
      <td className={styles.cell}>
        <span className={styles.activity}>{lastActivity}</span>
      </td>

      {/* Actions */}
      <td className={styles.actionsCell}>
        <div className={styles.actions}>
          <button className={styles.actionBtn} type="button" aria-label="Call"><Phone size={13} /></button>
          <button className={styles.actionBtn} type="button" aria-label="Email"><Mail size={13} /></button>
          <button className={styles.actionBtn} type="button" aria-label="Copy"><Copy size={13} /></button>
          <button className={styles.actionBtn} type="button" aria-label="Share"><Share2 size={13} /></button>
        </div>
      </td>
    </tr>
  )
}
