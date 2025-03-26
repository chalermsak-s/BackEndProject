import * as advisorRepository from '../repository/advisorRepository'
import bcrypt from 'bcryptjs'
import type { InAdvisor } from '../models/advisor'

export function getAllAdvisors() {
  return advisorRepository.getAllAdvisors()
}

export function getAdvisorById(id: number) {
  return advisorRepository.getAdvisorById(id)
}

export function getStudentByAdvisorById(id: number) {
  return advisorRepository.getStudentByAdvisorById(id)
}

export function getAdvisorIdByUserId(id: number) {
  return advisorRepository.getAdvisorIdByUserId(id)
}

export function addAdvisor(newAdvisor: InAdvisor) {
  const dataAdvisor = {
    username: newAdvisor.username,
    password: bcrypt.hashSync(newAdvisor.password),
    first_name: newAdvisor.first_name,
    last_name: newAdvisor.last_name,
    picture: newAdvisor.picture,
    academic_position_id: newAdvisor.academic_position_id,
    department_id: newAdvisor.department_id
  };
  return advisorRepository.addAdvisor(dataAdvisor)
}
