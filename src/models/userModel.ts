import { user_role } from '@prisma/client';

export interface IUser {
  id: number;
  username: string;
  password: string;
  admin_id?: number;
  student_id?: number;
  advisor_id?: number;
  user_role_id?: number;
}

export interface IAdmin {
  id?: number;
  name: string;
}

export interface IStudent {
  id?: number;
  student_id_card: string;
  first_name: string;
  last_name: string;
  picture?: string;
  department_id?: number;
  degree_id?: number;
  advisor_id?: number;
}

export interface IStudentWithDetails extends IStudent {
  department?: IDepartment;
  degree?: IDegree;
  advisor?: IAdvisorBasic;
}

export interface IAdvisorBasic {
  id: number;
  first_name: string;
  last_name: string;
  academic_position?: string;
}

export interface IAdvisor {
  id?: number;
  first_name: string;
  last_name: string;
  picture?: string;
  academic_position_id?: number;
  department_id?: number;
  admin_id?: number;
}

export interface IAdvisorBasic {
  id: number;
  first_name: string;
  last_name: string;
  academic_position?: string;
}

export interface IUserRole {
  id: number;
  role_name: 'Admin' | 'Student' | 'Advisor';
}

export interface IUserResponse {
  id: number;
  username: string;
  role?: string;
}

export interface IAcademicPosition {
  id?: number;
  academic_position_name: string;
}

export interface IDepartment {
  id?: number;
  initials: string;
  department_name: string;
}

export interface IDegree {
  id?: number;
  degree_name: string;
}