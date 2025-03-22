export interface Admin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalAdvisors: number;
  totalStudents: number;
  activeUsers: number;
  inactiveUsers: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  userId: string;
  userName: string;
  timestamp: Date;
  details?: Record<string, any>;
}

export enum ActivityType {
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  SYSTEM_CONFIG_UPDATED = 'SYSTEM_CONFIG_UPDATED',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export interface AdminFilters {
  search?: string;
  role?: AdminRole;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}

export interface AdminResponse {
  success: boolean;
  data: Admin | Admin[];
  message?: string;
  error?: string;
} 