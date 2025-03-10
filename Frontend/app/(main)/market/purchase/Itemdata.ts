"use server";
import { Item } from "@/types";
import { getItems } from "@/utils/gameUtils/itemsApi";

export const ItemData = await getItems();
export const Items = ItemData as Item[];