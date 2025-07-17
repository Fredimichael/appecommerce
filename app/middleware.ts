// middleware.ts
import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Define el tipo del payload del JWT para que TypeScript nos ayude
interface JwtPayload {
  sub: number;
  username: string;
  role: 'ADMIN' | 'CUSTOMER';
  iat: number;
  exp: number;
}

// La clave secreta debe estar en una variable de entorno
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'TU_SECRETO_SUPER_SECRETO');

async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JwtPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Si el usuario intenta acceder a cualquier ruta de /admin (que no sea la de login)
  // y no tiene un token, lo redirigimos a la página de login.
  if (!token) {
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // Si hay un token, lo verificamos
  const decodedPayload = await verifyToken(token);

  // Si el token es inválido o expiró, borramos la cookie y redirigimos al login
  if (!decodedPayload) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.set('access_token', '', { expires: new Date(0), path: '/' });
    return response;
  }
  
  // Si el token es válido pero el usuario no es ADMIN y trata de acceder a /admin
  if (decodedPayload.role !== 'ADMIN' && pathname.startsWith('/admin')) {
      // Puedes redirigirlo a una página de "acceso denegado" o a la home
      return NextResponse.redirect(new URL('/', request.url)); 
  }

  // Si el usuario está logueado y va a la página de login, lo redirigimos al dashboard.
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Especifica qué rutas deben pasar por este middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
