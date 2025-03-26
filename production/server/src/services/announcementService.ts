import * as announcementRepository from '../repository/announcementRepository'

export function getAllAnnouncements() {
  return announcementRepository.getAllAnnouncements()
}

export function getAnnouncementById(id: number) {
  return announcementRepository.getAnnouncementById(id)
}

export function getAnnouncementByStudentId(id: number) {
  return announcementRepository.getAnnouncementByStudentId(id)
}

export function getAnnouncementByAdvisorId(id: number) {
  return announcementRepository.getAnnouncementByAdvisorId(id)
}

export function addAnnouncementByAdvisorId(advisorId: number,topic: string,description: string,file?: string ) {
  return announcementRepository.addAnnouncementByAdvisorId(advisorId,topic,description,file)
}