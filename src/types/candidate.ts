export type ViewMode = 'grid' | 'list'

// Display labels mapped from raw 'status.X' keys in users.json — see candidatesApi.ts STATUS_MAP
export type CandidateStatus =
  | 'Contract'
  | 'Interview'
  | 'Done'
  | 'Clicks'
  | 'Views'
  | 'Applied'
  | 'Screening'

export interface Candidate {
  id: string
  number: number
  fullName: string
  status: CandidateStatus
  profilePictureId: string // Empty string in mock data — UI falls back to first letter of fullName
  rating: number
  applicationCount: number
  talentPoolCount: number
  city: string
  lastActivity: string // Pre-formatted by formatActivity helper — stored as display string, not raw days
}
