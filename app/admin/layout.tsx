import Link from 'next/link';
import { ReactNode } from 'react';

// Reutilizaremos el ícono del logo que ya tienes
import LogoSquare from 'components/logo-square';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { SITE_NAME } = process.env;

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-neutral-900">
      {/* Menú Lateral */}
      <aside className="w-64 flex-shrink-0 bg-white p-6 dark:bg-black">
        <div className="flex items-center gap-2 mb-8">
            <LogoSquare />
            <span className="font-semibold uppercase">{SITE_NAME} Admin</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Dashboard
          </Link>
          <Link href="/admin/products" className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
            Products
          </Link>
          {/* Aquí añadiremos "Órdenes", "Clientes", etc. en el futuro */}
        </nav>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}