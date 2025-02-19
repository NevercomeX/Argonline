// src/utils/gameUtils/shopApi.ts
import axios from "axios";

/**
 * Obtiene la lista de ítems en venta en la tienda.
 * Se asume que la API de shop expone un endpoint GET en /api/shop/items.
 */
export const getShopItems = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_CHAR_URL}/shop/items`);
};
