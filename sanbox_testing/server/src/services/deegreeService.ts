import * as degreeRepository from '../repository/degreeRepository'

export function getAllDeegrees() {
  return degreeRepository.getAllDeegrees()
}

export function getDeegreeById(id: number) {
  return degreeRepository.getDeegreeById(id)
}