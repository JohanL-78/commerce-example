# CommerceExample

Une application e-commerce moderne construite avec **Next.js 15**, **Prisma**, **NextAuth.js** et **Stripe**.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748)
![Stripe](https://img.shields.io/badge/Stripe-API-635BFF)

## 🚀 Fonctionnalités

- **Authentification complète** avec NextAuth.js
- **Gestion des produits** avec images Cloudinary
- **Panier persistant** avec Zustand
- **Paiements sécurisés** avec Stripe
- **Interface responsive** avec Tailwind CSS
- **Base de données** PostgreSQL avec Prisma
- **Panel d'administration** pour la gestion des produits

## 📋 Prérequis

- Node.js 18+
- PostgreSQL
- Comptes Stripe, Cloudinary et Supabase

## ⚡ Installation rapide

```bash
# Cloner le projet
git clone [url-du-repo]
cd mvpsupercommerce

# Installer les dépendances
npm install

# Configurer la base de données
npx prisma migrate dev
npx prisma db seed

# Lancer l'application
npm run dev
```

## 🔧 Configuration

Créez un fichier `.env.local` avec vos variables d'environnement :

```env
# Base de données
DATABASE_URL="your_postgresql_url"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_here"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## 🏗️ Architecture technique

**Stack technologique:**
- **Frontend:** Next.js 15 avec App Router
- **Base de données:** PostgreSQL avec Prisma ORM
- **Authentification:** NextAuth.js avec credentials
- **Paiements:** Stripe Checkout
- **État global:** Zustand avec persistence
- **Styling:** Tailwind CSS
- **Upload d'images:** Cloudinary

## 📸 Captures d'écran

*[Ajouter des captures d'écran de l'application]*

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Déployer sur Vercel
vercel --prod

# Configurer les variables d'environnement dans Vercel Dashboard
# Settings > Environment Variables
```

**Variables d'environnement pour Vercel:**
- `DATABASE_URL`
- `NEXTAUTH_URL` (https://votre-app.vercel.app)
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcryptjs
- ✅ Sessions JWT sécurisées
- ✅ Variables d'environnement protégées
- ✅ Validation côté serveur
- ✅ Protection CSRF avec NextAuth

## 📝 Scripts disponibles

```bash
npm run dev          # Développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linting ESLint
npm run db:push      # Push schema vers DB
npm run db:seed      # Peupler la DB
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

**Développé par Johan Lorck** - *CommerceExample: Application e-commerce complète avec Next.js*