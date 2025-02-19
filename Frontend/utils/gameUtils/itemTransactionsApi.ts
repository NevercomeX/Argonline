// src/utils/gameUtils/itemTransactionsApi.ts
import axios from "axios";

/**
 * Realiza la compra de un ítem.
 * Se espera recibir en el body: { characterId, itemId, quantity }
 */
export const purchaseItem = async ({
  characterId,
  itemId,
  quantity = 1,
}: {
  characterId: number;
  itemId: number;
  quantity?: number;
}) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_CHAR_URL}/shop/purchase`, { characterId, itemId, quantity });
};

/**
 * Realiza la venta de un ítem.
 * Se espera recibir en el body: { characterId, inventoryItemId, quantity }
 */
export const sellItem = async ({
  characterId,
  inventoryItemId,
  quantity = 1,
}: {
  characterId: number;
  inventoryItemId: number;
  quantity?: number;
}) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_CHAR_URL}/shop/sell`, { characterId, inventoryItemId, quantity });
};
