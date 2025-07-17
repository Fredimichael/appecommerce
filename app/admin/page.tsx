export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de ejemplo */}
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-black">
          <h2 className="text-xl font-semibold">Ventas Totales</h2>
          <p className="text-3xl mt-2">$0</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-black">
          <h2 className="text-xl font-semibold">Nuevas Órdenes</h2>
          <p className="text-3xl mt-2">0</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-black">
          <h2 className="text-xl font-semibold">Total de Productos</h2>
          <p className="text-3xl mt-2">0</p>
        </div>
      </div>
    </div>
  );
}