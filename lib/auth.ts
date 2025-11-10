interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
}

const STORAGE_KEY = "jobfolio_auth"

export const authUtils = {
  // Initialize auth from localStorage
  getAuth(): AuthState {
    if (typeof window === "undefined") return { user: null, token: null }
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { user: null, token: null }
  },

  // Sign up new user
  signUp(email: string, password: string, name: string): User {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
    }
    const token = Math.random().toString(36).substr(2)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
    return user
  },

  // Sign in existing user
  signIn(email: string, password: string): User | null {
    const auth = this.getAuth()
    // Demo: accept any email/password combination
    if (email && password) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        createdAt: new Date().toISOString(),
      }
      const token = Math.random().toString(36).substr(2)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
      return user
    }
    return null
  },

  // Sign out
  signOut(): void {
    localStorage.removeItem(STORAGE_KEY)
  },

  // Get current user
  getCurrentUser(): User | null {
    return this.getAuth().user
  },

  // Check if authenticated
  isAuthenticated(): boolean {
    return this.getAuth().user !== null
  },
}
