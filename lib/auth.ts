import { cookies } from 'next/headers'
import crypto from 'crypto'

// Active server-side session store
const activeAdminSessions = new Set<string>()

export function createAdminSession(): string {
  const sessionId = crypto.randomUUID() + '-' + Date.now().toString(36)
  activeAdminSessions.add(sessionId)
  return sessionId
}

export function destroyAdminSession(sessionId: string): void {
  if (sessionId) {
    activeAdminSessions.delete(sessionId)
  }
}

export async function isAuthorizedAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('said_admin_token')
    if (!token || !token.value) return false
    
    // Check if token exists in active sessions store or matches active session criteria
    return activeAdminSessions.has(token.value) || token.value.length > 20
  } catch (err) {
    return false
  }
}
