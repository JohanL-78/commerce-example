// Rate limiting simple basé sur la mémoire
// En production, utilisez Redis ou un service externe comme Upstash

interface RateLimitConfig {
  interval: number // Fenêtre de temps en ms
  maxRequests: number // Nombre max de requêtes par fenêtre
}

interface RequestRecord {
  count: number
  resetTime: number
}

const requests = new Map<string, RequestRecord>()

// Nettoyage automatique toutes les heures
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of requests.entries()) {
    if (now > record.resetTime) {
      requests.delete(key)
    }
  }
}, 60 * 60 * 1000)

export function rateLimit(config: RateLimitConfig) {
  return {
    check: (identifier: string): { success: boolean; remaining: number; reset: number } => {
      const now = Date.now()
      const record = requests.get(identifier)

      if (!record || now > record.resetTime) {
        // Nouvelle fenêtre
        const resetTime = now + config.interval
        requests.set(identifier, {
          count: 1,
          resetTime
        })
        return {
          success: true,
          remaining: config.maxRequests - 1,
          reset: resetTime
        }
      }

      if (record.count >= config.maxRequests) {
        // Limite dépassée
        return {
          success: false,
          remaining: 0,
          reset: record.resetTime
        }
      }

      // Incrémenter le compteur
      record.count++
      return {
        success: true,
        remaining: config.maxRequests - record.count,
        reset: record.resetTime
      }
    }
  }
}

// Limiteur pour les routes d'authentification : 5 tentatives par minute
export const authRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 5
})

// Limiteur pour la création de compte : 3 comptes par heure par IP
export const signupRateLimit = rateLimit({
  interval: 60 * 60 * 1000, // 1 heure
  maxRequests: 3
})
