import { defineStore } from 'pinia'
import type { User } from '@/types'
import apiClient from '@/services/AxiosClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),
  getters: {
    currentUserName(): string {
      return this.user?.username || ''
    },
    isAdmin(): boolean {
      return this.user?.UserRole?.role_name.includes('Admin') || false
    },
    isAdvisor(): boolean {
      return this.user?.UserRole?.role_name.includes('Advisor') || false
    },
    isStudent(): boolean {
      return this.user?.UserRole?.role_name.includes('Student') || false
    },
  },

  actions: {
    async login(username: string, password: string) {
      const response = await apiClient.post('/auth/authenticate', {
        username: username,
        password: password,
      })

      // Safely access response.data
      this.token = response.data?.access_token || null
      if (this.token) {
        localStorage.setItem('token', this.token)
      }

      const meResponse = await apiClient.get('/auth/me')

      // Safely access meResponse.data
      this.user = meResponse.data?.user || null
      if (this.user) {
        localStorage.setItem('user', JSON.stringify(this.user))
      }

      return response
    },
    logout() {
      console.log('logout')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },
    reload(token: string, user: User) {
      this.token = token
      this.user = user
    },
  },
})
