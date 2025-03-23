import { defineStore } from 'pinia';
import type { User } from '@/types';
import apiClient from '@/services/AxiosClient';

// Helper function to check user role
const checkUserRole = (roleName: string): boolean => {
  const userData = localStorage.getItem('user');
  if (!userData) return false;

  try {
    const parsedUser = JSON.parse(userData)
    return parsedUser.user_role.role_name === roleName;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return false;
  }
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),

  getters: {
    currentUserName(): string {
      return this.user?.username || '';
    },
    isAdmin(): boolean {
      return checkUserRole('Admin');
    },
    isAdvisor(): boolean {
      return checkUserRole('Advisor');
    },
    isStudent(): boolean {
      return checkUserRole('Student');
    },
  },

  actions: {
    async login(username: string, password: string) {
      try {
        const response = await apiClient.post('/auth/authenticate', {
          username,
          password,
        });

        this.token = response.data?.access_token || null;
        if (this.token) {
          localStorage.setItem('token', this.token);
        }

        const meResponse = await apiClient.get('/auth/me');
        this.user = meResponse.data?.user || null;
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user));
        }

        return response;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    reload(token: string, user: User) {
      this.token = token;
      this.user = user;
    },
  },
});