export enum AnnouncementType {
  GENERAL = 'GENERAL',
  ACADEMIC = 'ACADEMIC',
  EVENT = 'EVENT',
  EMERGENCY = 'EMERGENCY',
  DEADLINE = 'DEADLINE'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface Author {
  id: string
  name: string
  role: string
  department: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: AnnouncementType
  priority: Priority
  author: Author
  startDate: Date
  endDate?: Date
  targetAudience: string[]
  attachments?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface AnnouncementStats {
  totalAnnouncements: number
  activeAnnouncements: number
  upcomingAnnouncements: number
  announcementsByType: Record<AnnouncementType, number>
  announcementsByPriority: Record<Priority, number>
}

export interface AnnouncementFilters {
  type?: AnnouncementType
  priority?: Priority
  startDate?: Date
  endDate?: Date
  authorId?: string
  targetAudience?: string[]
  search?: string
}

export interface AnnouncementResponse {
  data: Announcement[]
  total: number
  page: number
  limit: number
  filters: AnnouncementFilters
} 