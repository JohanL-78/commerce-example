import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') ||
                         req.nextUrl.pathname.startsWith('/api/admin')

    // Si c'est une route admin, vérifier le rôle ADMIN
    if (isAdminRoute && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
)

export const config = {
  matcher: [
    // Pages admin
    '/admin/:path*',
    // Pages compte utilisateur
    '/account/:path*',
    // API routes protégées
    '/api/admin/:path*',
    '/api/checkout_sessions/:path*',
    '/api/orders/:path*'
  ]
}
