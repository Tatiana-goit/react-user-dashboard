import rawUsers from '../../../data/users.json'
import type { Candidate, CandidateStatus } from '../../../types/candidate'

// Maps internal status keys from mock data to display labels — keys follow 'status.X' convention from the JSON
const STATUS_MAP: Record<string, CandidateStatus> = {
  'status.hired': 'Contract',
  'status.attraction': 'Clicks',
  'status.qualification': 'Interview',
  'status.screening': 'Screening',
}

// Kept local to this file — only used during data mapping, not a shared utility
function formatActivity(days: number): string {
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

function mapUser(u: typeof rawUsers[number]): Candidate {
  return {
    ...u,
    status: STATUS_MAP[u.status] ?? 'Applied', // 'Applied' as fallback for unmapped statuses — not present in current data
    lastActivity: formatActivity(u.latestActivity),
  }
}

// Simulates an async API call — replace with real fetch when backend is available
export function fetchCandidatesFromApi(): Promise<Candidate[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(rawUsers.map(mapUser))
      } catch {
        reject(new Error('Failed to load candidates'))
      }
    }, 800) // 800ms simulates network latency — makes loading state visible during development
  })
}
