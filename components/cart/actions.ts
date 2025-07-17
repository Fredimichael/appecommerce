'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/nest-api';
import { Cart } from 'lib/types/index';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

/**
 * Obtiene el carrito de las cookies o crea uno nuevo si no existe.
 */
async function getOrSetCart(): Promise<Cart> {
  // Corregido: 'await' para resolver la promesa de cookies()
  let cartId = (await cookies()).get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  // Si no hay ID de carrito o el carrito no se encontró en el backend, creamos uno nuevo
  if (!cartId || !cart) {
    cart = await createCart();
    // Corregido: 'await' para resolver la promesa de cookies()
    if (cart?.id) {
        (await cookies()).set('cartId', cart.id);
    }
  }
  
  // Si después de todo, el carrito no existe, lanzamos un error.
  if (!cart) {
      throw new Error("Failed to create or retrieve cart.");
  }
  
  return cart;
}

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  if (!selectedVariantId) {
    return 'Error: Se requiere el ID de la variante del producto.';
  }
  
  const cart = await getOrSetCart();

  // Corregido: Nos aseguramos de que cart.id exista antes de usarlo.
  if (!cart.id) {
    return "Error: No se pudo obtener o crear el ID del carrito."
  }

  try {
    await addToCart(cart.id, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error al añadir el producto al carrito';
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cart = await getOrSetCart();
  
  // Corregido: Nos aseguramos de que cart.id exista.
  if (!cart.id) return "Error: Carrito no encontrado.";

  try {
    await removeFromCart(cart.id, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error al eliminar el producto del carrito';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
) {
  const { lineId, quantity, variantId } = payload;
  const cart = await getOrSetCart();
  
  // Corregido: Nos aseguramos de que cart.id exista.
  if (!cart.id) return "Error: Carrito no encontrado.";

  try {
      await updateCart(cart.id, [{id: lineId, merchandiseId: variantId, quantity}]);
      revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error al actualizar la cantidad del producto';
  }
}

export async function redirectToCheckout() {
    const cart = await getOrSetCart();
    console.log("Procediendo al checkout con el carrito:", cart.id);
}

export async function createCartAndSetCookie() {
  await getOrSetCart();
}