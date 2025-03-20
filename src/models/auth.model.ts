export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export interface IRegisterStudentRequest {
  student_id_card: string;
  first_name: string;
  last_name: string;
  picture?: string;  // Optional field as in schema
  department_id?: number;  // Optional as it's nullable in schema
  degree_id?: number;  // Optional as it's nullable in schema
  advisor_id?: number; // Optional as it's nullable in schema
  password: string;
}

export interface IRegisterAdvisorRequest {
  first_name: string;
  last_name: string;
  picture?: string;  // Optional field as in schema
  academic_position_id?: number;  // Optional as it's nullable in schema
  department_id?: number;  // Optional as it's nullable in schema
  password: string;
}