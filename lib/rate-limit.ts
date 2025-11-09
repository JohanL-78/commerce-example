// Rate limiting persistant avec Prisma
// Stocke les compteurs dans la table RateLimitEntry pour résister aux redémarrages et au multi-instance

import { prisma } from '@/lib/prisma'

interface RateLimitConfig {
  interval: number // Fenêtre de temps en ms
  maxRequests: number // Nombre max de requêtes par fenêtre
  prefix?: string // Optionnel pour différencier les limites
}

interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number
}

interface RateLimiter {
  check: (identifier: string) => Promise<RateLimitResult>
}

const DEFAULT_GRACE_MS = 250 // Évite les effets bord si deux appels tombent sur la même ms

export function createPersistentRateLimiter(config: RateLimitConfig): RateLimiter {
  return {
    async check(identifier: string): Promise<RateLimitResult> {
      const now = new Date()
      const key = config.prefix ? `${config.prefix}:${identifier}` : identifier

      return prisma.$transaction(async (tx) => {
        const record = await tx.rateLimitEntry.findUnique({
          where: { identifier: key }
        })

        // Fenêtre expirée ou premier passage : on ré-initialise
        if (!record || record.resetAt <= now) {
          const resetAt = new Date(now.getTime() + config.interval + DEFAULT_GRACE_MS)
          await tx.rateLimitEntry.upsert({
            where: { identifier: key },
            update: { count: 1, resetAt },
            create: { identifier: key, count: 1, resetAt }
          })
          return {
            success: true,
            remaining: config.maxRequests - 1,
            reset: resetAt.getTime()
          }
        }

        if (record.count >= config.maxRequests) {
          return {
            success: false,
            remaining: 0,
            reset: record.resetAt.getTime()
          }
        }

        const updated = await tx.rateLimitEntry.update({
          where: { identifier: key },
          data: { count: { increment: 1 } }
        })

        return {
          success: true,
          remaining: Math.max(config.maxRequests - updated.count, 0),
          reset: updated.resetAt.getTime()
        }
      })
    }
  }
}

// Limiteur pour les routes d'authentification : 5 tentatives par minute
export const authRateLimit = createPersistentRateLimiter({
  interval: 60 * 1000, // 1 minute
  maxRequests: 5,
  prefix: 'auth'
})

// Limiteur pour la création de compte : 3 comptes par heure par IP
export const signupRateLimit = createPersistentRateLimiter({
  interval: 60 * 60 * 1000, // 1 heure
  maxRequests: 3,
  prefix: 'signup'
})
