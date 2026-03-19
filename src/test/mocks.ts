import type { Candidate } from '../types/candidate'

// 20 items — enough to cover 2 pages in both grid (9/page) and list (10/page) views
export const MOCK_CANDIDATES: Candidate[] = Array.from({ length: 20 }, (_, i) => ({
  id: `id-${i + 1}`,
  number: i + 1,
  fullName: `Candidate ${i + 1}`,
  status: 'Interview',
  profilePictureId: '',
  rating: 3,
  applicationCount: 1,
  talentPoolCount: 1,
  city: 'London',
  lastActivity: '1 day ago',
}))
