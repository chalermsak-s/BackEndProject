import * as academicPositionRepository from '../repository/academicPositionRepository'

export function getAllAcademicPositions() {
  return academicPositionRepository.getAllAcademicPositions()
}

export function getAcademicPositionById(id: number) {
  return academicPositionRepository.getAcademicPositionById(id)
}

