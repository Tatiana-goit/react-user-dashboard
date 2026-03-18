export type ViewMode = 'grid' | 'list'

export type CandidateStatus =
  | 'Contract'
  | 'Interview'
  | 'Done'
  | 'Clicks'
  | 'Views'
  | 'Applied'
  | 'Screening'

export interface Candidate {
  id: number
  name: string
  status: CandidateStatus
  // avatarUrl intentionally left empty in mock data — real API would provide this
  avatarUrl: string
  label: string
  rating: number        // 1–5
  applications: number
  messages: number
  stars: number
  location: string
  lastActivity: string  // pre-formatted display string, e.g. "2 days ago"
}
