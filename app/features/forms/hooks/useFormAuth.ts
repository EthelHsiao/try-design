import { useState } from "react"
import { api } from "~/lib/api"

export function useFormAuth(userId?: string) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = async () => {
    const uid = userId || "f68cfdbc-68be-4a76-ad22-3c6958cf3fb2"
    try {
      await api<any>(
        "/api/auth/login/internal",
        {
          method: "POST",
          body: { uid }
        }
      )
      setIsLoggedIn(true)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  return { isLoggedIn, login }
} 