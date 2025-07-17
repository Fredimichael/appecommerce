// app/admin/login/page.tsx
'use client'; // Necesitamos que sea un componente de cliente para usar el hook

import { useActionState } from 'react';
import { login } from './actions';

export default function LoginPage() {
    const [state, formAction] = useActionState(login, null);

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-black">
            <h1 className="text-2xl font-bold text-center">Admin Login</h1>
            
            <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium">
                Usuario
                </label>
                <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full mt-1 rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
                </label>
                <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full mt-1 rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                />
            </div>

            {/* Muestra el mensaje de error si existe */}
            {state?.message && (
                <p className="text-sm text-red-500">{state.message}</p>
            )}

            <button
                type="submit"
                className="w-full rounded-full bg-blue-600 px-4 py-2 text-white font-medium hover:opacity-90"
            >
                Ingresar
            </button>
            </form>
        </div>
        </div>
    );
}