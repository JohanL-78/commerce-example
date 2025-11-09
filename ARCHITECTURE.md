# Architecture de l'Application - Guide Pédagogique

## 📚 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Structure du projet](#structure-du-projet)
3. [Flux de données](#flux-de-données)
4. [Authentification](#authentification)
5. [Gestion des produits](#gestion-des-produits)
6. [Système de panier](#système-de-panier)
7. [Système de paiement](#système-de-paiement)

---

## Vue d'ensemble

### Technologies utilisées

**Framework principal :**
- **Next.js 15** (App Router) - Framework React avec rendu côté serveur et routing

**Base de données :**
- **PostgreSQL** (via Supabase) - Base de données relationnelle
- **Prisma** - ORM (Object-Relational Mapping) pour communiquer avec la DB

**Authentification :**
- **NextAuth.js** - Gestion complète de l'authentification

**État global :**
- **Zustand** - Gestion d'état légère pour le panier

**Paiement :**
- **Stripe** - Plateforme de paiement

**Stockage d'images :**
- **Cloudinary** - CDN et gestion d'images

---

## Structure du projet

```
mvpsupercommerce/
├── app/                    # Pages et API routes (Next.js App Router)
│   ├── api/               # Routes API backend
│   ├── admin/             # Pages d'administration
│   ├── auth/              # Pages d'authentification
│   ├── products/          # Pages produits
│   ├── cart/              # Page panier
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React réutilisables
├── lib/                   # Utilitaires et configurations
├── prisma/                # Configuration base de données
├── scripts/               # Scripts d'administration
├── store/                 # État global (Zustand)
├── types/                 # Définitions TypeScript
└── middleware.ts          # Middleware Next.js (protection routes)
```

---

## Flux de données

### 1. Architecture en couches

```
┌─────────────────────────────────────────┐
│         FRONTEND (React)                │
│  - Pages (app/)                         │
│  - Composants (components/)             │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│         ÉTAT GLOBAL                     │
│  - Zustand (store/cartStore.ts)         │
│  - Session NextAuth                     │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│         API ROUTES (app/api/)           │
│  - Handlers HTTP                        │
│  - Validation                           │
│  - Logique métier                       │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│         PRISMA (ORM)                    │
│  - Requêtes DB typées                   │
│  - Migrations                           │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│    POSTGRESQL (Base de données)         │
│  - Users, Products, Orders              │
└─────────────────────────────────────────┘
```

---

## Authentification

### Fichiers impliqués

#### `lib/auth.ts` - Configuration centrale NextAuth
**Rôle :** Configuration unique partagée par toute l'application

**Contenu principal :**
```typescript
export const authOptions: AuthOptions = {
  providers: [CredentialsProvider], // Login email/password
  callbacks: {
    jwt: ...,      // Ajoute le rôle au token JWT
    session: ...   // Ajoute le rôle à la session
  }
}
```

**Pourquoi un fichier séparé ?**
- Réutilisable partout (API routes, middleware, pages)
- Configuration unique = pas de désynchronisation

#### `app/api/auth/[...nextauth]/route.ts` - Point d'entrée NextAuth
**Rôle :** Expose NextAuth comme API route

**Fonction :**
```typescript
const handler = NextAuth(authOptions) // Utilise la config centrale
export { handler as GET, handler as POST }
```

**Endpoints créés automatiquement :**
- `GET /api/auth/session` - Récupère la session actuelle
- `POST /api/auth/callback/credentials` - Login
- `GET /api/auth/signout` - Déconnexion
- etc.

#### `app/api/auth/signup/route.ts` - Inscription
**Rôle :** Créer un nouveau compte utilisateur

**Flux :**
```
1. Reçoit { email, password, name }
2. Valide l'email (lib/validation.ts)
3. Valide le mot de passe (longueur, complexité)
4. Vérifie rate limiting (3 inscriptions/heure)
5. Hash le mot de passe avec bcrypt
6. Crée l'utilisateur en DB (Prisma)
7. Retourne succès ou erreur
```

#### `middleware.ts` - Protection des routes
**Rôle :** Intercepte TOUTES les requêtes avant qu'elles n'atteignent les pages

**Flux :**
```
Requête → Middleware → Vérification → Page/API

Si route protégée (/admin, /api/admin):
  1. Vérifie si utilisateur connecté
  2. Vérifie le rôle (ADMIN pour /admin)
  3. Si OK → Continue
  4. Sinon → Redirige vers /auth/signin
```

**Pourquoi c'est puissant :**
- **Une seule ligne de code** protège toutes les routes admin
- Impossible d'oublier de protéger une route
- Vérifie AVANT que le code de la page ne s'exécute

#### `lib/auth-admin.ts` - Helpers administrateurs
**Rôle :** Fonctions utilitaires pour vérifier les droits admin

**Fonctions :**
```typescript
// Vérifie si l'utilisateur est admin
isAdmin(): Promise<boolean>

// Lance une erreur si pas admin (pour les API)
requireAdmin(): Promise<void>
```

**Utilisation typique :**
```typescript
// Dans une API route admin
export async function POST(req: Request) {
  await requireAdmin() // ← Bloque si pas admin
  // ... reste du code
}
```

### Flux complet d'authentification

#### Login :
```
1. User saisit email/password (app/auth/signin/page.tsx)
2. Frontend appelle signIn('credentials', {...})
3. NextAuth appelle authorize() (lib/auth.ts)
4. authorize() vérifie le mot de passe en DB
5. Si OK : Crée un JWT token avec { id, email, role }
6. Token stocké dans un cookie HTTP-only
7. Middleware lit le cookie sur chaque requête
8. Session disponible partout via getServerSession()
```

#### Vérification sur route protégée :
```
User visite /admin
    ↓
Middleware s'exécute
    ↓
Lit le cookie NextAuth
    ↓
Décode le JWT → récupère { role: 'ADMIN' }
    ↓
Vérifie : token.role === 'ADMIN' ?
    ↓
OUI → Affiche la page
NON → Redirige vers /auth/signin
```

---

## Gestion des produits

### Fichiers impliqués

#### `prisma/schema.prisma` - Modèle de données
**Rôle :** Définit la structure de la base de données

```prisma
model Product {
  id          String   // ID unique
  name        String   // Nom du produit
  description String?  // Description (optionnelle)
  price       Decimal  // Prix
  imageId     String?  // ID Cloudinary
  category    String?  // Catégorie
  stock       Int      // Stock disponible
  featured    Boolean  // Mis en avant ?
  createdAt   DateTime // Date de création
}
```

**Prisma génère automatiquement :**
```typescript
prisma.product.findMany()  // SELECT * FROM products
prisma.product.create()    // INSERT INTO products
prisma.product.update()    // UPDATE products
prisma.product.delete()    // DELETE FROM products
```

#### `app/api/products/route.ts` - API publique produits
**Rôle :** Récupérer la liste des produits (accessible à tous)

**Fonction :**
```typescript
export async function GET(request: Request) {
  // 1. Parse les query params (?category=tech&featured=true)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')

  // 2. Construit le filtre
  const where = {
    category: category || undefined,
    featured: featured === 'true' || undefined
  }

  // 3. Requête DB via Prisma
  const products = await prisma.product.findMany({ where })

  // 4. Retourne JSON
  return Response.json(products)
}
```

**Utilisé par :**
- Page d'accueil (produits mis en avant)
- Page `/products` (tous les produits)
- Filtres par catégorie

#### `app/api/admin/products/route.ts` - API admin création
**Rôle :** Créer un nouveau produit (admin uniquement)

**Protection :**
```typescript
export async function POST(req: Request) {
  await requireAdmin() // ← Bloque si pas admin

  const { name, price, imageId, ... } = await req.json()

  const product = await prisma.product.create({
    data: { name, price, imageId, ... }
  })

  return Response.json(product)
}
```

#### `app/api/admin/products/[id]/route.ts` - Modifier/Supprimer
**Rôle :** Update ou delete d'un produit spécifique

**Routes dynamiques Next.js :**
- `PUT /api/admin/products/abc123` → Modifier le produit abc123
- `DELETE /api/admin/products/abc123` → Supprimer le produit abc123

**Récupération de l'ID :**
```typescript
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params // ← id extrait de l'URL

  await prisma.product.update({
    where: { id },
    data: { ... }
  })
}
```

#### `app/api/admin/upload/route.ts` - Upload d'images
**Rôle :** Envoyer une image vers Cloudinary

**Flux :**
```
1. Frontend envoie un FormData avec le fichier
2. API convertit le File en Buffer
3. Upload vers Cloudinary via leur SDK
4. Cloudinary applique transformations (resize, quality)
5. Cloudinary retourne un public_id et une URL
6. API retourne public_id au frontend
7. Frontend stocke public_id dans le formulaire
8. Lors de la création produit, public_id est sauvé en DB
```

**Pourquoi stocker public_id et pas l'URL ?**
- public_id permet de générer des URLs avec transformations
- `https://cloudinary.com/.../w_200,h_200/public_id.jpg` (200x200)
- `https://cloudinary.com/.../w_800,h_800/public_id.jpg` (800x800)
- Une seule image source, multiples tailles

### Flux complet : Création d'un produit

```
Admin Dashboard
    ↓
Remplit le formulaire (nom, prix, etc.)
    ↓
Sélectionne une image
    ↓
Frontend : Upload image → POST /api/admin/upload
    ↓
Cloudinary stocke l'image et retourne public_id
    ↓
Frontend : Soumet le formulaire → POST /api/admin/products
    ↓
API vérifie que l'user est admin (requireAdmin)
    ↓
API crée le produit en DB avec prisma.product.create()
    ↓
DB stocke : { name, price, imageId: public_id, ... }
    ↓
Frontend rafraîchit la liste des produits
```

---

## Système de panier

### Fichiers impliqués

#### `store/cartStore.ts` - État global du panier (Zustand)
**Rôle :** Stocker le panier côté client (navigateur uniquement)

**Structure :**
```typescript
{
  items: [
    {
      product: { id, name, price, imageId },
      quantity: 2
    }
  ],
  addItem: (product) => ...,
  removeItem: (productId) => ...,
  updateQuantity: (productId, quantity) => ...,
  clearCart: () => ...
}
```

**Pourquoi Zustand et pas React Context ?**
- Plus simple (moins de boilerplate)
- Meilleures performances
- Pas de re-render inutiles

**Persistance :**
```typescript
persist(
  (set, get) => ({ ... }),
  { name: 'cart-storage' } // ← Sauvegarde dans localStorage
)
```
→ Le panier survit au rafraîchissement de page

#### `components/ClientCartPage.tsx` - Affichage du panier
**Rôle :** Interface utilisateur du panier

**Utilisation du store :**
```typescript
const { items, removeItem, updateQuantity } = useCartStore()
```

**Calcul du total :**
```typescript
const total = items.reduce((sum, item) =>
  sum + (item.product.price * item.quantity), 0
)
```

#### `components/CheckoutButton.tsx` - Bouton paiement
**Rôle :** Initier le processus de paiement Stripe

**Flux :**
```typescript
1. User clique sur "Payer"
2. Vérifie si connecté (useSession)
3. Si non connecté → Redirige vers /auth/signin
4. Envoie les items → POST /api/checkout_sessions
5. API crée une session Stripe
6. Redirige vers Stripe Checkout
```

---

## Système de paiement

### Fichiers impliqués

#### `app/api/checkout_sessions/route.ts` - Création session Stripe
**Rôle :** Créer une session de paiement Stripe

**Protection :**
```typescript
const session = await getServerSession(authOptions)
if (!session) return Response.json({ error: 'Non authentifié' }, { status: 401 })
```

**Flux :**
```
1. Reçoit les items du panier
2. Vérifie que l'utilisateur est connecté
3. Crée une session Stripe avec :
   - line_items (produits + quantités)
   - success_url (où rediriger après paiement)
   - cancel_url (si l'user annule)
   - metadata (email de l'utilisateur)
4. Retourne le session.id
5. Frontend redirige vers Stripe avec ce session.id
```

#### `lib/stripe-server.ts` - Configuration Stripe backend
**Rôle :** Initialiser le SDK Stripe côté serveur

```typescript
import Stripe from 'stripe'

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia'
  })
}
```

**Pourquoi côté serveur uniquement ?**
- `STRIPE_SECRET_KEY` ne doit JAMAIS être exposée au frontend
- Seules les API routes peuvent l'utiliser

#### `lib/stripe.ts` - Configuration Stripe frontend
**Rôle :** Charger Stripe.js côté client

```typescript
import { loadStripe } from '@stripe/stripe-js'

export const getStripePromise = () =>
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
```

**Clé publique vs secrète :**
- `NEXT_PUBLIC_*` → Exposée au frontend (safe)
- `STRIPE_SECRET_KEY` → Jamais exposée (backend only)

#### `app/api/orders/create/route.ts` - Création commande
**Rôle :** Enregistrer une commande en base de données

**Flux (appelé après paiement) :**
```
1. Vérifie que l'user est connecté
2. Reçoit les items du panier
3. Calcule le total
4. Crée une Order en DB :
   - userId
   - total
   - status: 'PENDING'
5. Crée les OrderItems (lignes de commande)
6. Retourne la commande créée
```

**Relations Prisma :**
```
Order (une commande)
  └── OrderItems[] (plusieurs lignes)
       └── Product (référence au produit)
```

### Flux complet de paiement

```
1. User a des produits dans son panier (Zustand)
2. Clique sur "Payer" (CheckoutButton)
3. Frontend → POST /api/checkout_sessions avec items
4. Backend crée session Stripe
5. Frontend redirige vers Stripe Checkout
6. User paie sur Stripe
7. Stripe redirige vers /success?session_id=xxx
8. Page /success appelle POST /api/orders/create
9. API crée la commande en DB
10. Affiche confirmation
11. Vide le panier (clearCart)
```

---

## Sécurité - Système en profondeur

### Couches de protection

#### Couche 1 : Middleware (middleware.ts)
**Quand :** AVANT que la requête n'atteigne la page/API

```
Requête → Middleware → Vérifie token JWT → Continue ou Redirige
```

**Protège :**
- Routes pages : `/admin`, `/account`
- Routes API : `/api/admin/*`, `/api/checkout_sessions`, `/api/orders`

#### Couche 2 : Vérification dans l'API (requireAdmin)
**Quand :** DANS le code de l'API route

```typescript
export async function POST(req: Request) {
  await requireAdmin() // ← Double vérification
  // ...
}
```

**Pourquoi double vérification ?**
- Middleware peut être bypassé (erreur config)
- Defense in depth (défense en profondeur)

#### Couche 3 : Validation des données (lib/validation.ts)
**Quand :** AVANT d'enregistrer en DB

```typescript
const passwordValidation = validatePassword(password)
if (!passwordValidation.valid) {
  return Response.json({ error: passwordValidation.errors })
}
```

**Vérifie :**
- Format email
- Force du mot de passe
- Domaines email suspects

#### Couche 4 : Rate Limiting (lib/rate-limit.ts)
**Quand :** À chaque requête d'authentification

```typescript
const result = authRateLimit.check(email)
if (!result.success) {
  throw new Error('Trop de tentatives')
}
```

**Empêche :**
- Attaques brute-force (deviner les mots de passe)
- Spam de création de comptes

### Fichiers de sécurité

#### `lib/validation.ts` - Règles de validation
**Fonctions :**
- `validatePassword()` : 8 car., maj, min, chiffre, spécial
- `validateEmail()` : Format valide, pas de domaines suspects

#### `lib/rate-limit.ts` - Limitation de requêtes
**Principe :**
```typescript
// Map en mémoire : { 'user@example.com': { count: 3, resetTime: ... }}
const requests = new Map()

check(identifier) {
  Si trop de requêtes → { success: false }
  Sinon → { success: true, remaining: 2 }
}
```

**Limites configurées :**
- Login : 5 tentatives / minute / email
- Signup : 3 inscriptions / heure / IP

**⚠️ Limitation :** En mémoire (redémarrage = reset)
→ En production : utiliser Redis/Upstash

#### `types/next-auth.d.ts` - Typage TypeScript
**Rôle :** Ajouter le champ `role` aux types NextAuth

```typescript
declare module 'next-auth' {
  interface Session {
    user: {
      role?: string // ← TypeScript sait maintenant que role existe
    } & DefaultSession['user']
  }
}
```

**Sans ça :**
```typescript
session.user.role // ❌ Erreur TypeScript : Property 'role' does not exist
```

**Avec ça :**
```typescript
session.user.role // ✅ OK, TypeScript reconnaît le champ
```

---

## Scripts d'administration

### `scripts/make-admin.ts`
**Rôle :** Promouvoir un utilisateur en admin

**Utilisation :**
```bash
npm run make-admin email@example.com
```

**Code simplifié :**
```typescript
const email = process.argv[2] // ← Récupère l'argument CLI

const user = await prisma.user.findUnique({ where: { email }})

await prisma.user.update({
  where: { email },
  data: { role: 'ADMIN' }
})
```

### `scripts/demote-admin.ts`
**Rôle :** Rétrograder un admin en user standard

**Utilisation :**
```bash
npm run demote-admin email@example.com
```

---

## Prisma - ORM en détail

### Rôle de Prisma

**Sans Prisma (SQL brut) :**
```typescript
const result = await db.query(
  'SELECT * FROM products WHERE category = $1',
  [category]
)
// Pas de typage, risque d'injection SQL
```

**Avec Prisma :**
```typescript
const products = await prisma.product.findMany({
  where: { category }
})
// Typé, sécurisé, autocomplete IDE
```

### Fichiers Prisma

#### `prisma/schema.prisma`
**Contient :**
- Modèles (tables)
- Relations
- Configuration DB

**Exemple de relation :**
```prisma
model Order {
  id     String
  userId String
  user   User   @relation(fields: [userId], references: [id])
}

model User {
  id     String
  orders Order[]
}
```

**Requête avec relation :**
```typescript
const order = await prisma.order.findUnique({
  where: { id: 'xxx' },
  include: { user: true } // ← JOIN automatique
})

console.log(order.user.email) // ✅ Typé et récupéré
```

#### `lib/prisma.ts`
**Rôle :** Instance Prisma unique (singleton pattern)

**Problème sans singleton :**
```
HMR (Hot Module Replacement) → Recharge le code
→ Crée une nouvelle connexion DB
→ Répété 10 fois = 10 connexions ouvertes
→ DB refuse les connexions (limite atteinte)
```

**Solution :**
```typescript
const globalForPrisma = global as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma // ← Réutilise la même instance
}
```

### Commandes Prisma

```bash
# Générer le client Prisma (après modification schema)
npx prisma generate

# Pousser le schema vers la DB (dev)
npx prisma db push

# Créer une migration (production)
npx prisma migrate dev --name add_user_role

# Ouvrir l'interface visuelle
npx prisma studio
```

---

## Récapitulatif des flux principaux

### Flux 1 : Afficher les produits
```
Page /products (app/products/page.tsx)
    ↓
useEffect → fetch('/api/products')
    ↓
API /api/products (app/api/products/route.ts)
    ↓
prisma.product.findMany()
    ↓
PostgreSQL retourne les produits
    ↓
API retourne JSON
    ↓
Frontend affiche la liste
```

### Flux 2 : Ajouter au panier
```
User clique "Ajouter au panier"
    ↓
cartStore.addItem(product)
    ↓
Zustand met à jour items[]
    ↓
Persist middleware sauvegarde dans localStorage
    ↓
Tous les composants utilisant cartStore se mettent à jour
```

### Flux 3 : Créer un produit (Admin)
```
Admin Dashboard
    ↓
Upload image → POST /api/admin/upload
    ↓
Cloudinary stocke et retourne public_id
    ↓
Soumet formulaire → POST /api/admin/products
    ↓
Middleware vérifie : user connecté + token.role === 'ADMIN'
    ↓
API requireAdmin() vérifie à nouveau
    ↓
prisma.product.create({ data: {..., imageId: public_id }})
    ↓
PostgreSQL crée le produit
    ↓
API retourne le produit créé
    ↓
Frontend rafraîchit la liste
```

### Flux 4 : Login
```
User saisit email/password
    ↓
signIn('credentials', { email, password })
    ↓
NextAuth appelle authorize() (lib/auth.ts)
    ↓
Vérifie rate limiting (5 tentatives/min)
    ↓
prisma.user.findUnique({ where: { email }})
    ↓
bcrypt.compare(password, user.password)
    ↓
Si OK : Retourne { id, email, role }
    ↓
Callback jwt() ajoute role au token
    ↓
Token JWT signé et stocké dans cookie HTTP-only
    ↓
Callback session() ajoute role à session
    ↓
Redirige vers page demandée (callbackUrl)
```

### Flux 5 : Accès route protégée
```
User visite /admin
    ↓
Middleware intercepte la requête
    ↓
Lit cookie next-auth.session-token
    ↓
Décode JWT → extrait { id, email, role }
    ↓
Vérifie : token.role === 'ADMIN' ?
    ↓
OUI → NextResponse.next() (continue)
    ↓
Page /admin s'affiche
    ↓
Page appelle getServerSession(authOptions)
    ↓
Récupère session.user.role
    ↓
Peut faire des vérifications supplémentaires
```

---

## Concepts avancés

### Server Components vs Client Components

**Server Components (par défaut) :**
```typescript
// app/products/page.tsx
export default async function ProductsPage() {
  const products = await prisma.product.findMany() // ← Direct DB access
  return <div>{products.map(...)}</div>
}
```
- Exécuté côté serveur uniquement
- Peut accéder directement à la DB
- Pas de JavaScript envoyé au client
- Meilleure performance

**Client Components ('use client') :**
```typescript
'use client'
// components/ClientCartPage.tsx
export default function ClientCartPage() {
  const { items } = useCartStore() // ← Hooks React
  return <div>{items.map(...)}</div>
}
```
- Exécuté dans le navigateur
- Peut utiliser hooks React (useState, useEffect)
- Peut interagir avec le DOM
- JavaScript envoyé au client

**Règle :**
- Server par défaut
- Client seulement si besoin de :
  - Hooks React
  - Événements navigateur
  - État local
  - APIs navigateur (localStorage, etc.)

### App Router vs Pages Router

**App Router (utilisé dans ce projet) :**
```
app/
├── page.tsx               → /
├── products/
│   ├── page.tsx          → /products
│   └── [id]/
│       └── page.tsx      → /products/:id
└── api/
    └── products/
        └── route.ts      → /api/products
```

**Avantages :**
- Server Components par défaut
- Layouts partagés
- Loading states intégrés
- Streaming

### Route Handlers (API Routes)

**Conventions :**
```typescript
// app/api/products/route.ts
export async function GET(request: Request) { ... }
export async function POST(request: Request) { ... }
export async function PUT(request: Request) { ... }
export async function DELETE(request: Request) { ... }
```

**Dynamic Routes :**
```typescript
// app/api/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  // ...
}
```

### Middleware - Exécution

**Ordre d'exécution :**
```
1. Requête arrive
2. Middleware s'exécute (middleware.ts)
3. Si NextResponse.next() → Continue
4. Si NextResponse.redirect() → Redirige (skip étape 5)
5. Page/API s'exécute
6. Réponse retournée
```

**Matcher :**
```typescript
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
```
- `:path*` = tous les sous-chemins
- Middleware s'exécute UNIQUEMENT sur ces routes
- Autres routes = pas de middleware (performance)

---

## Points clés à retenir

### Séparation des responsabilités

**Frontend (components/) :**
- Affichage
- Interactions utilisateur
- État local

**Backend (app/api/) :**
- Logique métier
- Accès base de données
- Validations
- Authentification

**Middleware (middleware.ts) :**
- Sécurité
- Redirections
- Vérifications globales

### Sécurité en couches

1. **Middleware** - Première barrière
2. **API guards** (requireAdmin) - Double vérification
3. **Validation** - Données propres
4. **Rate limiting** - Anti-abus
5. **Prisma** - Requêtes typées et sécurisées

### État de l'application

**État global (Zustand) :**
- Panier
- Persist dans localStorage

**État serveur (NextAuth) :**
- Session utilisateur
- Stocké dans cookie HTTP-only
- Vérifié à chaque requête

**État base de données (Prisma) :**
- Produits
- Commandes
- Utilisateurs
- Source de vérité

### Flux de données unidirectionnel

```
DB (source de vérité)
    ↓
API (transforme, valide)
    ↓
Frontend (affiche)
    ↓
User (interagit)
    ↓
API (modifie)
    ↓
DB (mise à jour)
```

---

## Pour aller plus loin

### Améliorations possibles

1. **Cache Redis** pour rate limiting
2. **Webhooks Stripe** pour confirmer paiements
3. **Email** de confirmation de commande
4. **Tests** (Jest, Playwright)
5. **Monitoring** (Sentry)
6. **Analytics** (Google Analytics, Plausible)
7. **SEO** (metadata, sitemap)
8. **PWA** (offline support)

### Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Stripe Documentation](https://stripe.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
