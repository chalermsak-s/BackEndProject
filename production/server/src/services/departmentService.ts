import * as departmentRepository from '../repository/departmentRepository'
import { Department } from '../models/department'

export function getAllDepartments() {
  return departmentRepository.getAllDepartments()
}

export function getDepartmentByName(departmentName: string) {
  return departmentRepository.getDepartmentByName(departmentName)
}

export function getDepartmentById(id: number) {
  return departmentRepository.getDepartmentById(id)
}

export function addDepartment(newDepartment: Department) {
  return departmentRepository.addDepartment(newDepartment)
}

export async function updateDepartment(
  departmentId: number,
  updatedData: Partial<Department>
) {
  return departmentRepository.updateDepartment(departmentId, updatedData)
}

