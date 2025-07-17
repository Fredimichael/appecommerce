// actions/auth.actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Acción para el login de cualquier usuario (admin o cliente).
 * Se comunica con el backend y, si tiene éxito, guarda el token JWT en una cookie.
 */
export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { message: error.message || 'Usuario o contraseña incorrectos.' };
    }

    const data = await res.json();
    const { access_token } = data;

    if (access_token) {
      (await cookies()).set('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 día
      });
    }
  } catch (error) {
    return { message: 'No se pudo conectar al servidor.' };
  }

  redirect('/admin'); // Redirige al dashboard del admin después del login
}

/**
 * Acción para el logout. Borra la cookie de autenticación.
 */
export async function logoutAction() {
  (await cookies()).set('access_token', '', { expires: new Date(0), path: '/' });
  redirect('/login');
}

/**
 * Acción para el registro de clientes.
 * Llama al endpoint público del backend para crear un nuevo usuario con rol 'CUSTOMER'.
 */
export async function registerAction(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { message: error.message || 'No se pudo registrar el usuario.' };
    }
  } catch (error) {
    return { message: 'Error de conexión.' };
  }

  redirect('/login'); // Redirige al login después de que el cliente se registre
}

/**
 * Acción para que un administrador cree otro administrador.
 * Llama a un endpoint protegido y envía el token JWT para la autorización.
 */
export async function registerAdminAction(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
        return { message: 'No estás autorizado para realizar esta acción.' };
    }

    try {
        const res = await fetch(`${API_URL}/auth/admin/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // El backend necesita este token para verificar que eres admin
            },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            return { message: error.message || 'No se pudo crear el administrador.' };
        }

        return { success: true, message: 'Administrador creado con éxito.' };

    } catch (error) {
        return { message: 'Error de conexión.' };
    }
}
