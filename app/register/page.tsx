// app/register/page.tsx
'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction } from '../actions/auth.actions'; // Apuntamos a la acción centralizada

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-black">
        <h1 className="text-2xl font-bold text-center">Crear una Cuenta</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full mt-1 rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full mt-1 rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </div>
          {state?.message && <p className="text-sm text-red-500">{state.message}</p>}
          <button type="submit" className="w-full rounded-full bg-blue-600 px-4 py-2 text-white font-medium hover:opacity-90">
            Registrarse
          </button>
        </form>
        <p className="text-center text-sm">
          ¿Ya tienes una cuenta? <Link href="/login" className="font-semibold text-blue-600 hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}