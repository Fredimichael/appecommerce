import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/nest-api'; // Asegúrate que la ruta es correcta

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  // Comprobamos si la página existe antes de usarla.
  // Si no existe, usamos un título por defecto o vacío.
  const title = page?.seo?.title || page?.title;

  return await OpengraphImage({ title });
}