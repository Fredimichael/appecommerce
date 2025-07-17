// app/admin/login/actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
        return { message: 'Usuario o contraseña incorrectos.' };
        }

        const data = await res.json();
        const { access_token } = data;

        if (access_token) {
        // Guardamos el token en una cookie segura
        (await
                // Guardamos el token en una cookie segura
                cookies()).set('access_token', access_token, { // The 'set' property does not exist on type 'Promise<ReadonlyRequestCookies>'.
            httpOnly: true, // El navegador no puede acceder a esta cookie con JavaScript
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
            path: '/',
            maxAge: 60 * 60 * 24, // 1 día de duración
        });
        }
    } catch (error) {
        return { message: 'No se pudo conectar al servidor. Inténtalo de nuevo.' };
    }

    // Si todo salió bien, redirigimos al dashboard del admin
    redirect('/admin');
}