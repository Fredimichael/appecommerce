import Prose from 'components/prose';
import { getPage } from 'lib/nest-api'; // Asegúrate que la ruta es correcta
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  const page = await getPage(params.page);

  // ¡AQUÍ ESTÁ LA CLAVE!
  // Si la página no existe, detenemos la ejecución.
  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  // ¡Y AQUÍ TAMBIÉN!
  // Comprobamos de nuevo por seguridad.
  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}