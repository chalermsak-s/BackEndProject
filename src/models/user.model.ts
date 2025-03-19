import { UserRole } from '@prisma/client';

export interface IUser {
  id?: number;
  username: string;
  password: string;
  role: UserRole;
}

export interface IAdmin {
  id?: number;
  userId: number;
}

export interface IStudent {
  id?: number;
  userId: number;
  studentIdCard: string;
  firstName: string;
  lastName: string;
  picture: string;
  departmentId: number;
  degreeId: number;
  advisorId?: number;
}

export interface IAdvisor {
  id?: number;
  userId: number;
  firstName: string;
  lastName: string;
  picture: string;
  academicPositionId: number;
  departmentId: number;
}

export interface IAcademicPosition {
  id?: number;
  academicPositionName: string;
}

export interface IDepartment {
  id?: number;
  initials: string;
  departmentName: string;
}

export interface IDegree {
  id?: number;
  degreeName: string;
}