import { Cart, Collection, Menu, Page, Product } from 'lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchFromApi(endpoint: string, options: RequestInit = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: { ...defaultOptions.headers, ...options.headers },
    });
    if (!res.ok) {
      console.error(`API call to ${endpoint} failed:`, await res.text());
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return null;
  }
}

// --- Productos, Colecciones, Páginas y Menú (sin cambios) ---

export async function getProducts(options?: { query?: string; reverse?: boolean; sortKey?: string; }): Promise<Product[]> {
    const products = await fetchFromApi('products');
    return products || [];
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const product = await fetchFromApi(`products/${handle}`);
  return product;
}

export async function getCollections(): Promise<Collection[]> {
  const collections = await fetchFromApi('collections');
  return collections || [];
}

export async function getCollectionProducts({ collection }: { collection: string }): Promise<Product[]> {
    const products = await fetchFromApi(`collections/${collection}/products`);
    return products || [];
}

export async function getPages(): Promise<Page[]> {
  const pages = await fetchFromApi('pages');
  return pages || [];
}

export async function getPage(handle: string): Promise<Page | undefined> {
  const page = await fetchFromApi(`pages/${handle}`);
  return page;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const menuItems = await fetchFromApi(`menu/${handle}`);
  return menuItems || [];
}


// --- FUNCIONES DEL CARRITO ---

export async function createCart(): Promise<Cart> {
  return fetchFromApi('cart', { method: 'POST' });
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  // ¡AQUÍ ESTÁ LA CORRECCIÓN CLAVE!
  // Si el cartId no es válido (es nulo o undefined),
  // no hacemos la llamada a la API y devolvemos undefined directamente.
  if (!cartId) {
    return undefined;
  }

  const cart = await fetchFromApi(`cart/${cartId}`);
  return cart || undefined;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const line = lines[0];
  if (!line) {
    throw new Error('No items provided to add to cart.');
  }

  return fetchFromApi(`cart/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({ productId: line.merchandiseId, quantity: line.quantity }),
  });
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const cartItemId = lineIds[0];
  if (!cartItemId) {
    throw new Error('No item ID provided to remove from cart.');
  }
  
  return fetchFromApi(`cart/${cartId}/items/${cartItemId}`, {
    method: 'DELETE',
  });
}

export async function updateCart(cartId: string, lines: { id: string; merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const line = lines[0];
  if (!line) {
    throw new Error('No items provided to update in cart.');
  }

  return fetchFromApi(`cart/${cartId}/items/${line.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity: line.quantity }),
  });
}