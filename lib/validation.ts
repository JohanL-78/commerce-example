export interface ValidationResult {
  valid: boolean
  errors: string[]
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
