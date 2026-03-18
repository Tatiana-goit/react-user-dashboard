import rawUsers from '../../../data/users.json'
import type { Candidate, CandidateStatus } from '../../../types/candidate'

const STATUS_MAP: Record<string, CandidateStatus> = {
  'status.hired':         'Contract',
  'status.attraction':    'Clicks',
  'status.qualification': 'Interview',
  'status.screening':     'Screening',
}

function formatActivity(days: number): string {
  if (days === 0)  return 'today'
  if (days === 1)  return '1 day ago'
  if (days < 30)   return `${days} days ago`
  if (days < 365)  return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

function mapUser(u: typeof rawUsers[number], index: number): Candidate {
  return {
    id:           index + 1,
    name:         u.fullName,
    status:       STATUS_MAP[u.status] ?? 'Applied',
    avatarUrl:    u.profilePictureId,
    label:        'Label',
    rating:       Math.min(5, Math.max(1, Math.round(u.rating))),
    applications: u.applicationCount,
    messages:     u.talentPoolCount,
    stars:        Math.round(u.humatch / 20),
    location:     u.city,
    lastActivity: formatActivity(u.latestActivity),
  }
}

// Simulates an async API call — replace with real fetch when backend is available
export function fetchCandidatesFromApi(): Promise<Candidate[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rawUsers.map(mapUser))
    }, 800)
  })
}
