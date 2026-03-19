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
  id: string
  number: number
  fullName: string
  status: CandidateStatus
  profilePictureId: string
  rating: number
  applicationCount: number
  talentPoolCount: number
  city: string
  lastActivity: string
}
