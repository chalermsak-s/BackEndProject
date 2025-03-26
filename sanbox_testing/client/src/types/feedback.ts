export enum FeedbackType {
  APPOINTMENT = 'APPOINTMENT',
  COURSE = 'COURSE',
  ADVISOR = 'ADVISOR',
  SYSTEM = 'SYSTEM',
  OTHER = 'OTHER'
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum FeedbackPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface Feedback {
  id: string
  userId: string
  type: FeedbackType
  status: FeedbackStatus
  priority: FeedbackPriority
  title: string
  description: string
  rating?: number
  category?: string
  attachments?: string[]
  response?: string
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
}

export interface FeedbackStats {
  totalFeedback: number
  feedbackByType: Record<FeedbackType, number>
  feedbackByStatus: Record<FeedbackStatus, number>
  feedbackByPriority: Record<FeedbackPriority, number>
  averageRating: number
  responseRate: number
  resolutionTime: number
}

export interface FeedbackFilters {
  type?: FeedbackType
  status?: FeedbackStatus
  priority?: FeedbackPriority
  startDate?: Date
  endDate?: Date
  search?: string
}

export interface FeedbackResponse {
  data: Feedback[]
  total: number
  page: number
  limit: number
  filters: FeedbackFilters
} 