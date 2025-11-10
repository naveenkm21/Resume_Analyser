"use client"

import { useState, useEffect, useCallback } from "react"
import { authUtils } from "@/lib/auth"

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth on mount
  useEffect(() => {
    const currentUser = authUtils.getCurrentUser()
    setUser(currentUser)
    setIsAuthenticated(authUtils.isAuthenticated())
    setIsLoading(false)
  }, [])

  const signUp = useCallback((email: string, password: string, name: string) => {
    const newUser = authUtils.signUp(email, password, name)
    setUser(newUser)
    setIsAuthenticated(true)
    return newUser
  }, [])

  const signIn = useCallback((email: string, password: string) => {
    const authenticatedUser = authUtils.signIn(email, password)
    if (authenticatedUser) {
      setUser(authenticatedUser)
      setIsAuthenticated(true)
      return authenticatedUser
    }
    return null
  }, [])

  const signOut = useCallback(() => {
    authUtils.signOut()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
  }
}
