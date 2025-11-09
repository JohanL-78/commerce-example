export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export interface PriceValidationResult extends ValidationResult {
  value?: number
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []

  // Longueur minimale
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères')
  }

  // Au moins une lettre majuscule
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre majuscule')
  }

  // Au moins une lettre minuscule
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre minuscule')
  }

  // Au moins un chiffre
  if (!/\d/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre')
  }

  // Au moins un caractère spécial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []

  // Format email basique
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.push('Format d\'email invalide')
  }

  // Longueur maximale
  if (email.length > 255) {
    errors.push('L\'email est trop long')
  }

  // Vérification de domaines suspects (optionnel, à adapter selon vos besoins)
  const suspiciousDomains = ['tempmail.com', 'throwaway.email', 'guerrillamail.com']
  const domain = email.split('@')[1]?.toLowerCase()
  if (domain && suspiciousDomains.includes(domain)) {
    errors.push('Domaine email non autorisé')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

interface PriceValidationOptions {
  min?: number
  max?: number
  decimals?: number
}

export function validatePrice(input: unknown, options?: PriceValidationOptions): PriceValidationResult {
  const errors: string[] = []
  const { min = 0, max = 100000, decimals = 2 } = options ?? {}

  if (input === null || input === undefined || input === '') {
    errors.push('Le prix est requis')
    return { valid: false, errors }
  }

  let parsedValue: number | null = null

  if (typeof input === 'number') {
    parsedValue = input
  } else if (typeof input === 'string') {
    const normalized = input.trim().replace(',', '.')
    if (normalized.length === 0) {
      errors.push('Le prix est requis')
      return { valid: false, errors }
    }
    parsedValue = Number(normalized)
  } else {
    errors.push('Le prix doit être un nombre')
  }

  if (parsedValue === null || Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)) {
    errors.push('Le prix doit être un nombre valide')
    return { valid: false, errors }
  }

  if (parsedValue < min) {
    errors.push(`Le prix doit être supérieur ou égal à ${min}€`)
  }

  if (parsedValue > max) {
    errors.push(`Le prix doit être inférieur ou égal à ${max}€`)
  }

  const factor = Math.pow(10, decimals)
  const scaled = parsedValue * factor
  if (Math.abs(scaled - Math.round(scaled)) > 1e-8) {
    errors.push(`Le prix ne peut pas contenir plus de ${decimals} décimales`)
  }

  const valid = errors.length === 0

  return {
    valid,
    errors,
    value: valid ? Number((Math.round(scaled) / factor).toFixed(decimals)) : undefined
  }
}
