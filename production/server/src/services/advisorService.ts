import * as advisorRepository from '../repository/advisorRepository'

export function getAllAdvisors() {
  return advisorRepository.getAllAdvisors()
}

export function getAdvisorById(id: number) {
  return advisorRepository.getAdvisorById(id)
}
