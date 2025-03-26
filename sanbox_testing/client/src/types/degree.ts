export interface Degree {
  id: string;
  name: string;
  code: string;
  department: string;
  totalCredits: number;
  duration: number; // in years
  description: string;
  requirements: DegreeRequirement[];
  courses: Course[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DegreeRequirement {
  id: string;
  type: RequirementType;
  description: string;
  credits: number;
  courses: string[]; // Course IDs
}

export enum RequirementType {
  CORE = 'CORE',
  ELECTIVE = 'ELECTIVE',
  GENERAL = 'GENERAL',
  MINOR = 'MINOR',
  THESIS = 'THESIS'
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  description: string;
  prerequisites: string[]; // Course IDs
  semester: Semester;
  department: string;
  instructor?: string;
}

export enum Semester {
  FALL = 'FALL',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER'
}

export interface DegreeFilters {
  search?: string;
  department?: string;
  duration?: number;
  page?: number;
  limit?: number;
}

export interface DegreeResponse {
  success: boolean;
  data: Degree | Degree[];
  message?: string;
  error?: string;
}

export interface DegreeStats {
  totalPrograms: number;
  totalStudents: number;
  averageDuration: number;
  completionRate: number;
  popularMajors: {
    name: string;
    studentCount: number;
  }[];
} 