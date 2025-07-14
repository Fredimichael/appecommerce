// lib/nest-api/index.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL; // Lo configurarás en .env.local

export async function getProduct(handle: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_URL}/products/${handle}`);
    if (!res.ok) {
      return undefined;
    }
    const product = await res.json();
    // No necesitas "reshapeProduct" si tu API ya devuelve el formato correcto.
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}