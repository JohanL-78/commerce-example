# Sécurité - MVP Super Commerce

## ✅ Améliorations de sécurité implémentées

### 1. Middleware NextAuth
**Fichier**: `middleware.ts`

Protection automatique et centralisée des routes sensibles :
- `/admin/*` - Pages d'administration
- `/account/*` - Pages de compte utilisateur
- `/api/admin/*` - API d'administration
- `/api/checkout_sessions/*` - Paiements
- `/api/orders/*` - Commandes

**Avantage**: Impossible d'oublier de protéger une route, tout est géré en un seul endroit.

### 2. Système de rôles en base de données
**Fichiers**:
- `prisma/schema.prisma` - Modèle User avec champ `role`
- `lib/auth-admin.ts` - Vérification basée sur le rôle

Remplacement de la vérification par email (`email.includes('admin')`) par un système de rôles robuste :
- `USER` - Utilisateur standard
- `ADMIN` - Administrateur

### 3. Validation des mots de passe
**Fichier**: `lib/validation.ts`

Critères de sécurité :
- ✅ Minimum 8 caractères
- ✅ Au moins une majuscule
- ✅ Au moins une minuscule
- ✅ Au moins un chiffre
- ✅ Au moins un caractère spécial

### 4. Validation des emails
**Fichier**: `lib/validation.ts`

- ✅ Format email valide
- ✅ Longueur maximale (255 caractères)
- ✅ Blocage des domaines temporaires suspects

### 5. Rate Limiting
**Fichier**: `lib/rate-limit.ts`

Protection contre les attaques brute-force :
- **Login** : 5 tentatives par minute par email
- **Signup** : 3 inscriptions par heure par IP

### 6. Secret NextAuth sécurisé
**Fichier**: `.env.local`

Remplacement du secret de développement par un secret cryptographiquement sécurisé généré avec OpenSSL.

## 🔐 Configuration initiale

### Créer le premier administrateur

1. **Créez d'abord un compte utilisateur** via l'interface de signup

2. **Promouvez-le en admin** via le script :
```bash
npm run make-admin votre@email.com
```

### Générer un nouveau secret NextAuth (production)

```bash
openssl rand -base64 32
```

Copiez le résultat dans votre variable `NEXTAUTH_SECRET`.

## 📋 Checklist de déploiement en production

- [ ] Remplacer `NEXTAUTH_SECRET` par un secret unique en production
- [ ] Utiliser Redis pour le rate limiting (au lieu de la mémoire)
- [ ] Configurer `NEXTAUTH_URL` avec l'URL de production
- [ ] Activer HTTPS (obligatoire pour NextAuth)
- [ ] Configurer les headers de sécurité (CSP, HSTS, etc.)
- [ ] Activer la protection CSRF
- [ ] Mettre en place la surveillance des logs
- [ ] Configurer les webhooks Stripe avec `STRIPE_WEBHOOK_SECRET`

## 🚨 Vulnérabilités résolues

### Avant
- ❌ Pas de middleware - protection manuelle par route
- ❌ Admin = n'importe quel email avec "admin" dedans
- ❌ Pas de validation de mot de passe
- ❌ Pas de rate limiting
- ❌ Secret NextAuth faible

### Après
- ✅ Middleware centralisé
- ✅ Système de rôles en base de données
- ✅ Validation stricte des mots de passe
- ✅ Rate limiting sur auth
- ✅ Secret cryptographiquement sécurisé

## 📚 Ressources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Rate Limiting Best Practices](https://www.cloudflare.com/learning/bots/what-is-rate-limiting/)

## ⚠️ Limitations actuelles

1. **Rate limiting en mémoire** : En production, utilisez Redis/Upstash pour persister entre les redémarrages
2. **Pas de 2FA** : Considérez l'ajout de l'authentification à deux facteurs
3. **Pas de logs d'audit** : Ajoutez un système de logging des actions sensibles
4. **Pas de blocage de compte** : Après X tentatives échouées, bloquer temporairement le compte

## 🔄 Prochaines étapes recommandées

1. Implémenter 2FA avec TOTP
2. Ajouter un système de logs d'audit
3. Configurer Sentry ou similaire pour le monitoring d'erreurs
4. Ajouter une politique de session (timeout, refresh token)
5. Implémenter la vérification d'email à l'inscription
