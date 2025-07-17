// NOTA: Por ahora usaremos datos de ejemplo.
// Luego los conectaremos a la base de datos.
import Link from 'next/link';

const sampleProducts = [
  { id: '1', title: 'Remera de Algodón', price: '25.00', stock: 100 },
  { id: '2', title: 'Zapatillas Deportivas', price: '89.99', stock: 50 },
  { id: '3', title: 'Gorra Clásica', price: '15.50', stock: 200 },
];

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
            <Link href="/admin/products/new" className="flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:opacity-90">
                Añadir Producto
            </Link>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-lg shadow-md dark:bg-black">
        <table className="w-full text-left">
          <thead className="border-b border-neutral-200 dark:border-neutral-700">
            <tr>
              <th className="p-4">Producto</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sampleProducts.map((product) => (
              <tr key={product.id} className="border-b border-neutral-200 dark:border-neutral-700">
                <td className="p-4 font-semibold">{product.title}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <a href="#" className="text-blue-600 hover:underline">Editar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}