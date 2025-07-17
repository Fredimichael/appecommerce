// app/admin/products/new/page.tsx
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Añadir Nuevo Producto</h1>

      <form className="space-y-6 bg-white p-8 rounded-lg shadow-md dark:bg-black">
        {/* Nombre del Producto */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Ej: Remera de Algodón"
            className="w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe el producto..."
            className="w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Precio */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Ej: 29.99"
              className="w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium mb-1">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Ej: 150"
              className="w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </div>
        </div>
        
        {/* Aquí irían más campos como categoría, imágenes, etc. */}

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <Link
            href="/admin/products"
            className="rounded-full bg-neutral-200 px-4 py-2 text-black text-sm font-medium hover:bg-neutral-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:opacity-90"
          >
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
}